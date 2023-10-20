export interface IUser {
  email: string;
  uuid: string;
  token: string;
  expiration: string;
  isCompleted: boolean;
  isSuperAdmin: boolean;
  oltToken: string;
}
