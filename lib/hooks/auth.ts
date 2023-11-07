import { login } from '@lib/server/api';
import type {
  IResendValidationEmailPayload,
  IUserLoginPayload,
  IUserRegisterPayload
} from '@lib/types/user';
import axios from 'axios';

export const usePostLogin = () => {
  return (body: IUserLoginPayload) => {
    return login(body);
  };
};

export const usePostRegister = () => {
  return (body: IUserRegisterPayload) => {
    return axios.post('/api/proxy/v1/pub/register_users', { payload: body });
  };
};

export const usePostResendValidationEmail = () => {
  return (body: IResendValidationEmailPayload) => {
    return axios.post('/api/proxy/v1/pub/resend_validation_email', {
      payload: body
    });
  };
};
