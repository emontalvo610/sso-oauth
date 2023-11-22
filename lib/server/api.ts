'use server';

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
    cacheStorage.validateEmailSecret[secret] = data;
    if (status === 200) return data ?? {};
  } catch (error) {
    console.error(`Error: ValidateEmail by ${secret}`, error);
  }
  return null;
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
    session.user = {
      email: user.email,
      expiration: user.expiration,
      isCompleted: user.isCompleted,
      isSuperAdmin: user.isSuperAdmin,
      token: user.token,
      oltToken: user.oltToken,
      uuid: user.uuid
    };
    await session.save();

    const encryption = await apiClient.post(
      `${process.env.API_URL}/v1/pb_data/encrypt`,
      {
        ID: user.uuid,
        TIMESTAMP: Math.floor(Date.now() / 1000),
        URL: redirect
      }
    );
    const olt = encryption.data;
    return {
      user,
      olt
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
