import type { IUser } from '@lib/types/user';
import type { RegisterOptions, UseFormWatch } from 'react-hook-form';

export const emailValidatorOptions: RegisterOptions<IUser, 'email'> = {
  required: {
    value: true,
    message: 'Email is required'
  },
  pattern: {
    value: /^\S+@\S+$/i,
    message: 'Please enter a valid email address'
  }
};

export const firstNameValidatorOptions: RegisterOptions<IUser, 'firstName'> = {
  required: {
    value: true,
    message: 'First name is required'
  }
};

export const lastNameValidatorOptions: RegisterOptions<IUser, 'lastName'> = {
  required: {
    value: true,
    message: 'Last name is required'
  }
};

export const zipCodeValidatorOptions: RegisterOptions<IUser, 'zipCode'> = {
  required: {
    value: true,
    message: 'Code is required'
  }
};

export const phoneAreaCodeValidatorOptions: RegisterOptions<
  IUser,
  'phoneAreaCode'
> = {
  required: {
    value: true,
    message: 'Code is required'
  },
  pattern: {
    value: /\d+/i,
    message: 'Code should contain only numeric digits'
  }
};

export const phoneNumberValidatorOptions: RegisterOptions<
  IUser,
  'phoneNumber'
> = {
  required: {
    value: true,
    message: 'Phone number is required'
  },
  pattern: {
    value: /^\d+$/i,
    message: 'Only digits are allowed'
  }
};

export const passwordValidatorOptions: RegisterOptions<IUser, 'password'> = {
  required: {
    value: true,
    message: 'Password is required'
  },
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters'
  }
};

export const password2ValidatorOptionsFn = (
  watch: UseFormWatch<IUser>
): RegisterOptions<IUser, 'password2'> => {
  return {
    required: {
      value: true,
      message: 'Confirm password is required'
    },
    minLength: {
      value: 8,
      message: 'Confirm password must be at least 8 characters'
    },
    validate: (pwd2: string) => {
      if (watch('password') !== pwd2) {
        return 'Your passwords do not match';
      }
      return undefined;
    }
  };
};
