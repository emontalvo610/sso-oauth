import apiClient from './axios';
import { Environment } from './environment';

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
    const { status } = await apiClient.get(
      `${Environment.API_URL}/v1/pub/validate_email/${secret}`
    );
    if (status === 200) return true;
  } catch (error) {
    console.error(`Error: ValidateEmail by ${secret}`, error);
  }
  return false;
};
