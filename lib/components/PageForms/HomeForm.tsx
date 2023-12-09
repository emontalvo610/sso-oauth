'use client';

import TermsAndPolicy from '@lib/components/Footers/TermsAndPolicy';
import type { IUser } from '@lib/types/user';
import { clearSessionStorage, getSessionStorageItem } from '@lib/utils/storage';
import { base64encode, getSearchParamQuery } from '@lib/utils/url';
import { Button, InputField } from '@pickleballinc/react-ui';
import { emailValidatorOptions } from '@validators/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import BackButton from '../Buttons/BackButton';
import LogoButton from '../Buttons/LogoButton';
import Background from '../Extra/Background';
import BackButtonLayout from '../Layouts/BackButtonLayout';
import Spinner from '../Loadings/Spinner';
import ErrorWrapper from '../Wrappers/ErrorWrapper';

export default function HomeForm() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const [logout, setLogout] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>();

  useEffect(() => {
    if (getSessionStorageItem('logout')) {
      setLogout(true);
    }
    clearSessionStorage();
  }, []);

  const onSubmit = (data: IUser) => {
    setLoading(true);
    router.push(
      `/choose_email/${base64encode(data.email)}${getSearchParamQuery()}`
    );
  };

  const getBackUrl = () => {
    const cancelUrl = params?.get('cancel');
    return cancelUrl || `${process.env.NEXT_PUBLIC_PB_URI}`;
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
        <div className="box-border flex w-[440px] flex-col items-center gap-8 rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center gap-8">
            <img src="/icons/logo-pt.svg" width={48} height={48} />
            <img src="/icons/logo-p.svg" width={48} height={48} />
            <img src="/icons/logo-pb.svg" width={48} height={48} />
          </div>
          <div className="w-full">
            {logout && (
              <div className="flex justify-center text-[25px] text-gray-600">
                Logged out
              </div>
            )}
            <div className="pt-4 text-sm font-normal leading-5 text-gray-600">
              Log into your account. If you don't have one, you will be prompted
              to create one.
            </div>
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="text-left">
                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  {...register('email', emailValidatorOptions)}
                  className="input-basic"
                  autoFocus
                />
                <ErrorWrapper>{errors.email?.message}</ErrorWrapper>
              </div>
              <Button
                variant="primary"
                type="submit"
                className="btn-submit mt-8"
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
                Get Started
              </Button>
            </form>
          </div>
          <TermsAndPolicy />
        </div>
      </div>
    </>
  );
}
