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
  phoneAreaCode: string;
  phoneNumber: string;
  textAlertEnabled: number;
  uuid: string;
  token: string;
  expiration: string;
  isCompleted: boolean;
  isSuperAdmin: boolean;
  oltToken: string;
}

export interface IUserRegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  phoneCountryId: number;
  phoneAreaCode: string;
}

export interface IUserLoginPayload {
  email: string;
  password: string;
}

export interface IResendValidationEmailPayload {
  email: string;
}

export interface IForgotPasswordRequestPayload {
  email: string;
}

export interface IForgotPasswordPayload {
  url: string;
  password: string;
}
