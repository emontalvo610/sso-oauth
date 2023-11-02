'use client';

import TermsAndPolicy from '@lib/components/Footers/TermsAndPolicy';
import type { IUser } from '@lib/types/user';
import { clearSessionStorage } from '@lib/utils/storage';
import { Button, InputField } from '@pickleballinc/react-ui';
import { emailValidatorOptions } from '@validators/user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import LogoButton from '../Buttons/LogoButton';
import Background from '../Extra/Background';
import ErrorWrapper from '../Wrappers/ErrorWrapper';

export default function HomeForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>();

  useEffect(() => {
    clearSessionStorage();
  }, []);

  const onSubmit = (data: IUser) => {
    router.push(`/choose_email/${data.email}`);
  };

  return (
    <>
      <Background />
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[24px]">
        <div className="pb-8">
          <LogoButton />
        </div>
        <div className="box-border flex w-[440px] flex-col items-center gap-8 rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center gap-8">
            <img src="/icons/logo-pt.svg" width={48} height={48} />
            <img src="/icons/logo-p.svg" width={48} height={48} />
            <img src="/icons/logo-pb.svg" width={48} height={48} />
          </div>
          <div className="w-full">
            <div className="text-xmd font-semibold leading-7 text-gray-900">
              Enter your email
            </div>
            <div className="pt-4 text-sm font-normal leading-5 text-gray-600">
              Log into your account. If you don't have one, you will be prompted
              to create one.
            </div>
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-left">
                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  {...register('email', emailValidatorOptions)}
                  className="input-basic"
                />
                <ErrorWrapper>{errors.email?.message}</ErrorWrapper>
              </div>
              <Button
                variant="primary"
                type="submit"
                className="btn-submit mt-8"
              >
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
