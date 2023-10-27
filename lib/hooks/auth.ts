import type { IUserLoginPayload, IUserRegisterPayload } from '@lib/types/user';
import axios from 'axios';

export const usePostLogin = () => {
  return (body: IUserLoginPayload) => {
    return axios.post('/api/proxy/v1/sso/login', { payload: body });
  };
};

export const usePostRegister = () => {
  return (body: IUserRegisterPayload) => {
    return axios.post('/api/proxy/v1/pub/register_users', { payload: body });
  };
};
