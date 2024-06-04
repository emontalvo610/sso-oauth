import type {
  IForgotPasswordPayload,
  IForgotPasswordRequestPayload
} from '@lib/types/user';
import axios from 'axios';

export const usePostForgotPasswordRequest = () => {
  return (body: IForgotPasswordRequestPayload) => {
    return axios.post('/api/request-password-reset', {
      payload: body
    });
  };
};

export const usePostForgotPassword = () => {
  return (body: IForgotPasswordPayload) => {
    return axios.post('/api/forgot-password', {
      payload: body,
      userAgent: window.navigator.userAgent
    });
  };
};

export const useGetValidateSecret = () => {
  return (secret: string, email: string) => {
    return axios.get(`/api/proxy/v1/sso/validate_url/${secret}?email=${email}`);
  };
};
