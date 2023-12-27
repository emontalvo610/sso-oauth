export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  countryId: string;
  stateId: string;
  zipCode: string;
  password: string;
  password2: string;
  phoneCountryId: string;
  phoneNumber: string;
  textAlertEnabled: number;
  gender: 'M' | 'F';
  uuid: string;
  token: string;
  expiration: string;
  isCompleted: boolean;
  isSuperAdmin: boolean;
  oltToken: string;
  pbUuid: string;
}

export interface IUserRegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  phoneCountryId: number;
  gender: 'M' | 'F';
  stateId: number;
  countryId: number;
  zip: string;
  custom_url?: string;
}

export interface IUserLoginPayload {
  email: string;
  password: string;
  redirect?: string;
}

export interface IResendValidationEmailPayload {
  email: string;
  custom_url?: string;
}

export interface IForgotPasswordRequestPayload {
  email: string;
  custom_url?: string;
  request_type: 'email' | 'sms';
}

export interface IForgotPasswordPayload {
  url: string;
  password: string;
}
