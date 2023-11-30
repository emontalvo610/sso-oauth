'use client';

import LinkButton from '@lib/components/Buttons/LinkButton';
import { usePostForgotPasswordRequest } from '@lib/hooks/forgot_password';
import { Button } from '@pickleballinc/react-ui';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Background from '../Extra/Background';
import Spinner from '../Loadings/Spinner';

interface IFormProps {
  email: string;
}

export default function ResetVerifyEmailForm(props: IFormProps) {
  const [isLoading, setLoading] = useState(false);
  const postForgotPasswordRequest = usePostForgotPasswordRequest();

  const onResendConfirm = async () => {
    try {
      setLoading(true);
      await postForgotPasswordRequest({
        email: props.email,
        custom_url: `${window.location.origin}/forgot_password`,
        request_type: 'email'
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
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[24px]">
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 text-center sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center">
            <img src="/icons/icon-shield.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Email Sent to
          </div>
          <div className="mt-2 text-md font-normal text-gray-500">
            <span className="font-medium text-gray-500">{props.email}</span>
            <br />
            <br />
            <span className="flex text-start text-md font-semibold">
              NOTE: Check your junk/spam folder if you do not receive the email
            </span>
          </div>
          <div className="my-5 text-sm font-normal text-gray-500">
            Didn't receive the email?{' '}
            <LinkButton onClick={onResendConfirm} disabled={isLoading}>
              {isLoading && <Spinner />}
              Resend Email
            </LinkButton>
          </div>
          <Link href="/" className="link-none">
            <Button variant="primary" className="btn-submit">
              Back to Log In
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
