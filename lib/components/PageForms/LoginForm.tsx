'use client';

import BackButton from '@components/Buttons/BackButton';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import LinkButton from '@lib/components/Buttons/LinkButton';
import TermsAndPolicy from '@lib/components/Footers/TermsAndPolicy';
import StaticInputField from '@lib/components/Forms/StaticInputField';
import { usePostLogin } from '@lib/hooks/auth';
import type { IUser } from '@lib/types/user';
import { getSearchParamQuery } from '@lib/utils/url';
import { passwordValidatorOptions } from '@lib/validators/user';
import { Button, InputField } from '@pickleballinc/react-ui';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import LogoButton from '../Buttons/LogoButton';
import Background from '../Extra/Background';
import Spinner from '../Loadings/Spinner';
import ErrorWrapper from '../Wrappers/ErrorWrapper';

interface IFormProps {
  email: string;
}

export default function LoginForm(props: IFormProps) {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState(props.email);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IUser>();
  const postLogin = usePostLogin();
  const params = useSearchParams();
  const redirect = params?.get('redirect');

  const onSubmit = async (data: IUser) => {
    try {
      setLoading(true);
      const { olt } = await postLogin({
        email,
        password: data.password,
        redirect: redirect ?? `${process.env.NEXT_PUBLIC_PB_URI}`
      });

      window.location.href = `${process.env.NEXT_PUBLIC_PBRACKETS_SSO_URI}?olt=${olt}`;
    } catch (err: any) {
      console.error(`Error: login failed`, err);
      // setError('root.server', { message: err.message }); # In production, it displays "An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error."
      setError('root.server', { message: 'Incorrect username or password' });
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
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[60px]">
        <div className="pb-4">
          <LogoButton />
        </div>
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center gap-8">
            <img src="/icons/logo-pt.svg" width={48} height={48} />
            <img src="/icons/logo-p.svg" width={48} height={48} />
            <img src="/icons/logo-pb.svg" width={48} height={48} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Enter your password
          </div>
          <div className="mt-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="text-left">
                <StaticInputField
                  placeholder="Enter your email"
                  className="input-basic"
                  value={email}
                  onValueChange={setEmail}
                  redirect="/"
                />
                <ErrorWrapper>{errors.email?.message}</ErrorWrapper>
              </div>
              <div className="mt-5 text-left">
                <InputField
                  label="Password"
                  placeholder="Input your password"
                  className="input-basic"
                  type="password"
                  autoFocus
                  {...register('password', passwordValidatorOptions)}
                />
                <ErrorWrapper>{errors.password?.message}</ErrorWrapper>
              </div>
              <div className="my-6 text-right">
                <LinkButton href={`/choose_forgot_password/${email}`}>
                  Forgot password
                </LinkButton>
              </div>
              <Button
                variant="primary"
                className="btn-submit"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
                Log in
              </Button>
              <ErrorWrapper>{errors.root?.server.message}</ErrorWrapper>
            </form>
          </div>
          <div className="mt-8">
            <TermsAndPolicy />
          </div>
        </div>
      </div>
    </>
  );
}
