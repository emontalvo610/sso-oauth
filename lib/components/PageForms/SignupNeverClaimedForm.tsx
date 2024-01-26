'use client';

import LinkButton from '@lib/components/Buttons/LinkButton';
import { usePostResendValidationEmail } from '@lib/hooks/auth';
import { base64encode, getSearchParamQuery } from '@lib/utils/url';
import { useState } from 'react';
import { toast } from 'react-toastify';

import BackButton from '../Buttons/BackButton';
import Background from '../Extra/Background';
import BackButtonLayout from '../Layouts/BackButtonLayout';
import Spinner from '../Loadings/Spinner';

interface IFormProps {
  email: string;
}

export default function SignupNeverClaimedForm(props: IFormProps) {
  const [isLoading, setLoading] = useState(false);
  const postResendValidationEmail = usePostResendValidationEmail();

  const getBackUrl = () => {
    return `/${getSearchParamQuery()}`;
  };

  const onResendConfirm = async () => {
    try {
      setLoading(true);
      await postResendValidationEmail({
        email: props.email,
        custom_url: `${window.location.origin}/validate_email`
      });
      toast.success(`An email link was resent to ${props.email}`);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />
      <BackButtonLayout>
        <BackButton targetUrl={getBackUrl()} />
      </BackButtonLayout>
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[24px]">
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 text-center sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center">
            <img src="/icons/icon-msg.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Claim your account
          </div>
          <div className="mt-5 text-md font-normal text-gray-500">
            <span className="font-bold text-gray-500">NOTICE:</span>
            <br />
            An account was started with this email but never claimed
            <br />
            <span className="font-medium text-gray-500">{props.email}</span>
          </div>
          <div className="mt-5 text-sm font-normal text-gray-500">
            <LinkButton onClick={onResendConfirm} disabled={isLoading}>
              {isLoading && <Spinner />}
              Click here
            </LinkButton>{' '}
            to resend email to claim account
          </div>
          <div className="mt-1 text-sm font-normal text-gray-500">
            <LinkButton
              href={`/register/${base64encode(props.email)}`}
              disabled={isLoading}
            >
              Click here
            </LinkButton>{' '}
            to fill out the form again
          </div>
        </div>
      </div>
    </>
  );
}
