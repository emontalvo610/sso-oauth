export interface IUser {
  email: string;
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
