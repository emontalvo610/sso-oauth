import type {
  IForgotPasswordPayload,
  IForgotPasswordRequestPayload
} from '@lib/types/user';
import axios from 'axios';

export const usePostForgotPasswordRequestByEmail = () => {
  return (body: IForgotPasswordRequestPayload) => {
    return axios.post('/api/proxy/v1/pub/request_forgot_password', {
      payload: body
    });
  };
};

export const usePostForgotPasswordSMSRequestBySMS = () => {
  return () => {};
};

export const usePostForgotPassword = () => {
  return (body: IForgotPasswordPayload) => {
    return axios.post('/api/proxy/v1/pub/forgot_password', { payload: body });
  };
};
