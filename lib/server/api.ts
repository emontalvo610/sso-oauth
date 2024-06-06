/* eslint-disable no-console */

'use server';

import { LookupEmail, Validity } from '@lib/constants';
import type { IUser, IUserLoginPayload } from '@lib/types/user';
import { getBrowserInfo, getDeviceOS, getDeviceType } from '@lib/utils/browser';
import { extractIP } from '@lib/utils/location';
import { AxiosError } from 'axios';
import type { IronSessionData } from 'iron-session';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import os from 'os';

import apiClient from './axios';
import { cacheStorage } from './cache';
import { encryptUserSession } from './encrypt';
import { Environment } from './environment';
import { getServerActionSession } from './session/session';

export const lookupEmail = async (email: string) => {
  try {
    const { status, data } = await apiClient.get(
      `${Environment.API_URL}/v1/data/user-email-lookup/${email}`
    );
    if (status === 200) {
      if (data.email_status === 'EMAIL_NOT_CLAIMED')
        return {
          status: LookupEmail.NOT_CLAIMED,
          smsEnabled: data.phone_country_id_sms_enabled
        };
      if (data.email_status === 'EMAIL_CLAIMED')
        return {
          status: LookupEmail.VERIFIED,
          smsEnabled: data.phone_country_id_sms_enabled
        };
    }
  } catch (error) {
    console.error(`Error: LookupEmail by ${email}`, error);
  }
  return {
    status: LookupEmail.NOT_FOUND,
    smsEnabled: false
  };
};

export const validateEmailSecret = async (secret: string) => {
  try {
    if (cacheStorage.validateEmailSecret[secret]) {
      return cacheStorage.validateEmailSecret[secret];
    }
    const { status, data } = await apiClient.get(
      `${Environment.API_URL}/v1/pub/validate_email/${secret}`
    );
    if (status === 200) {
      cacheStorage.validateEmailSecret[secret] = data;
      return data ?? {};
    }
  } catch (error) {
    console.error(`Error: ValidateEmail by ${secret}`, error);
  }
  return null;
};

export const validateSession = async (session: string) => {
  try {
    const { status, data } = await apiClient.post(
      `${Environment.API_URL}/v1/pb_data/decrypt`,
      session
    );
    if (status === 200) {
      return data ?? {};
    }
  } catch (error) {
    console.error(`Error: ValidateEmail by ${session}`, error);
  }
  return null;
};

export const encryptUser = async (id: string, email: string) => {
  try {
    const { data } = await apiClient.post(
      `${Environment.API_URL}/v1/pb_data/encrypt`,
      JSON.stringify({
        USER_ID: id,
        EMAIL: email
      })
    );
    console.log(data);
    return data ?? {};
  } catch (error) {
    console.error(`Error: ValidateEmail by ${id}`, error);
  }
  return null;
};

export const validateSecret = async (secret: string) => {
  try {
    const { status } = await apiClient.get(
      `${Environment.API_URL}/v1/sso/validate_url/${secret}`
    );
    if (status === 200) return Validity.VALID;
    if (status === 410) return Validity.EXPIRED;
  } catch (error) {
    console.error(`Error: ValidateSecret by ${secret}`, error);
  }
  return Validity.INVALID;
};

export const validateToken = async (token: string) => {
  try {
    const { status } = await apiClient.get(
      `${Environment.API_URL}/v1/sso/validate_token`,
      {
        headers: {
          'PB-USER-TOKEN': token
        }
      }
    );
    if (status === 200) return true;
  } catch (error) {
    console.error(`Error: ValidateToken by ${token}`, error);
  }
  return false;
};

export const login = async (body: IUserLoginPayload, userAgent: string) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { email, password, redirect } = body;
  const browser = getBrowserInfo(userAgent);

  try {
    const header = headers();
    const forwardAddr = (header.get('x-forwarded-for') ?? '127.0.0.1').split(
      ','
    )[0]; // ::ffff:127.0.0.1
    const userIp = extractIP(forwardAddr);
    const response = await apiClient.post<IUser>(
      `${process.env.API_URL}/v1/sso/login`,
      {
        payload: {
          email,
          password
        }
      },
      {
        headers: {
          browser: browser?.getBrowserName() || 'Unknown',
          'browser-version': browser?.getBrowserVersion() || 'Unknown',
          'server-machine-name': os.hostname(),
          'user-agent': userAgent,
          'pb-user-ip': userIp,
          'pb-device': getDeviceType(userAgent),
          'pb-device-os': getDeviceOS(userAgent)
        }
      }
    );

    const user = response.data;
    const session = await getServerActionSession();
    const userObject = {
      email: user.email,
      expiration: user.expiration,
      isCompleted: user.isCompleted,
      isSuperAdmin: user.isSuperAdmin,
      token: user.token,
      oltToken: user.oltToken,
      uuid: user.uuid,
      pbUuid: user.pbUuid
    };
    session.user = userObject;
    await session.save();

    let redirectOLT;
    let redirectURI = `${process.env.NEXT_PUBLIC_PBRACKETS_SSO_URI}`;

    let redirectPBRACKETS = redirect;
    if (body.session) {
      const userSessionQuery = await encryptUserSession(
        body.session,
        user.uuid,
        user.email
      );
      redirectPBRACKETS = `${userSessionQuery?.redirect}?session=${userSessionQuery?.encryption}`;
    }

    const encryption = await apiClient.post(
      `${process.env.API_URL}/v1/pb_data/encrypt`,
      {
        ID: user.uuid,
        TIMESTAMP: Math.floor(Date.now() / 1000),
        URL: redirectPBRACKETS,
        LOGOUT: 0
      }
    );
    const OLT = encryption.data;
    redirectOLT = OLT;

    const domain = process.env.NEXT_PUBLIC_PICKLEBALL_TOURNAMENTS;

    if (domain) {
      // we check if pickleballtournaments service is up and healthy
      const healthZ = await apiClient.get(`${domain}/health`);
      console.log(`Response of PTOURNAMENTS healthz is ${healthZ.status}`);

      if (healthZ.status === 201) {
        const sessionObject = {
          SESSION: userObject,
          PBRACKETS: {
            URL: process.env.NEXT_PUBLIC_PBRACKETS_SSO_URI,
            OLT
          }
        };
        const encryptPBTournaments = await apiClient.post(
          `${process.env.API_URL}/v1/pb_data/encrypt`,
          sessionObject
        );
        redirectOLT = encryptPBTournaments.data;
        redirectURI = `${process.env.NEXT_PUBLIC_PICKLEBALL_TOURNAMENTS}/session`;
      }
    }

    return {
      user,
      redirectURI,
      olt: redirectOLT
    };
  } catch (err) {
    console.error('Something went wrong: ', err);
    if (err instanceof AxiosError) {
      throw Error(err.response?.data.Message);
    } else {
      throw Error('Something went wrong');
    }
  }
};

export const loginWithCookie = async (body: IronSessionData) => {
  const { user } = body;
  try {
    if (user) {
      const session = await getServerActionSession();
      session.user = {
        email: user.email,
        expiration: user.expiration,
        isCompleted: true,
        isSuperAdmin: user.isSuperAdmin,
        token: user.token,
        oltToken: user.oltToken,
        uuid: user.uuid,
        pbUuid: user.pbUuid
      };
      await session.save();
    }
  } catch (err) {
    console.error('Something went wrong: ', err);
    if (err instanceof AxiosError) {
      throw Error(err.response?.data.Message);
    } else {
      throw Error('Something went wrong');
    }
  }
};

export const logout = async () => {
  const session = await getServerActionSession();
  session.destroy();
  redirect('/');
};

export const getMaskedPhoneNumberByEmail = async (email: string) => {
  try {
    const { status, data } = await apiClient.get(
      `${Environment.API_URL}/v1/data/user-email-lookup/${email}`
    );
    if (status === 200) {
      const { valid, masked_phone_number: maskedPhoneNumber } = data;
      if (valid) return maskedPhoneNumber;
    }
  } catch (err) {
    console.error(`Error: LookupUserByEmail by ${email}`, err);
  }
  return null;
};
