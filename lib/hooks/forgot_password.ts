import type {
  IForgotPasswordPayload,
  IForgotPasswordRequestPayload
} from '@lib/types/user';
import axios from 'axios';

export const usePostForgotPasswordRequest = () => {
  return (body: IForgotPasswordRequestPayload) => {
    return axios.post('/api/proxy/v1/pub/request_forgot_password', {
      payload: body
    });
  };
};

export const usePostForgotPassword = () => {
  return (body: IForgotPasswordPayload) => {
    return axios.post('/api/proxy/v1/pub/forgot_password', { payload: body });
  };
};

export const useGetValidateSecret = () => {
  return (secret: string) => {
    return axios.get(`/api/proxy/v1/sso/validate_url/${secret}`);
  };
};
