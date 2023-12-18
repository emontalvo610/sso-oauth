/* eslint-disable no-console */

'use server';

import { Validity } from '@lib/constants';
import type { IUser, IUserLoginPayload } from '@lib/types/user';
import { AxiosError } from 'axios';
import type { IronSessionData } from 'iron-session';
import { redirect } from 'next/navigation';

import apiClient from './axios';
import { cacheStorage } from './cache';
import { Environment } from './environment';
import { getServerActionSession } from './session/session';

export const lookupEmail = async (email: string) => {
  try {
    const { status } = await apiClient.get(
      `${Environment.API_URL}/v1/data/user-email-lookup/${email}`
    );
    if (status === 200) return true;
  } catch (error) {
    console.error(`Error: LookupEmail by ${email}`, error);
  }
  return false;
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

export const login = async (body: IUserLoginPayload) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { email, password, redirect } = body;

  console.log(email, password);
  try {
    const response = await apiClient.post<IUser>(
      `${process.env.API_URL}/v1/sso/login`,
      {
        payload: {
          email,
          password
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
      uuid: user.uuid
    };
    session.user = userObject;
    await session.save();

    let redirectOLT;
    let redirectURI = `${process.env.NEXT_PUBLIC_PBRACKETS_SSO_URI}`;

    const encryption = await apiClient.post(
      `${process.env.API_URL}/v1/pb_data/encrypt`,
      {
        ID: user.uuid,
        TIMESTAMP: Math.floor(Date.now() / 1000),
        URL: redirect
      }
    );
    const OLT = encryption.data;
    redirectOLT = OLT;

    // we check if pickleballtournaments service is up and healthy
    const healthZ = await apiClient.get(
      `${process.env.NEXT_PUBLIC_PICKLEBALL_TOURNAMENTS}/health`
    );

    if (healthZ.status === 200) {
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
        uuid: user.uuid
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
