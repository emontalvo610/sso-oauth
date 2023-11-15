'use client';

import BackButton from '@components/Buttons/BackButton';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import { usePostForgotPassword } from '@lib/hooks/forgot_password';
import type { IUser } from '@lib/types/user';
import { getSearchParamQuery } from '@lib/utils/url';
import {
  password2ValidatorOptionsFn,
  passwordValidatorOptions
} from '@lib/validators/user';
import { Button, InputField } from '@pickleballinc/react-ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Background from '../Extra/Background';
import Spinner from '../Loadings/Spinner';
import ErrorWrapper from '../Wrappers/ErrorWrapper';

interface IFormProps {
  secret: string;
}

export default function ResetPasswordSubmitForm(props: IFormProps) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>();
  const postForgotPassword = usePostForgotPassword();

  const onSubmit = async (data: IUser) => {
    try {
      setLoading(true);
      const { password } = data;
      await postForgotPassword({ url: props.secret, password });
      router.push('/success/reset-password');
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getBackUrl = () => {
    return `/${getSearchParamQuery()}`;
  };

  return (
    <>
      <Background />
      <BackButtonLayout>
        <BackButton targetUrl={getBackUrl()} />
      </BackButtonLayout>
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[24px]">
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center">
            <img src="/icons/icon-key.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Set new password
          </div>
          <div className="mt-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-left">
                <InputField
                  label="Password"
                  placeholder="Create a password"
                  className="input-basic"
                  type="password"
                  {...register('password', passwordValidatorOptions)}
                />
                <ErrorWrapper>{errors.password?.message}</ErrorWrapper>
                {!errors.password && (
                  <div className="mt-1 text-sm font-normal text-gray-500">
                    Must be at least 8 characters
                  </div>
                )}
              </div>
              <div className="mt-5 text-left">
                <InputField
                  label="Repeat Password"
                  placeholder="Repeat the password"
                  className="input-basic"
                  type="password"
                  {...register('password2', password2ValidatorOptionsFn(watch))}
                />
                <ErrorWrapper>{errors.password2?.message}</ErrorWrapper>
              </div>
              <Button
                variant="primary"
                className="btn-submit mt-8"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
