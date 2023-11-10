'use client';

import LinkButton from '@lib/components/Buttons/LinkButton';
import { usePostForgotPasswordRequestByEmail } from '@lib/hooks/forgot_password';
import { Button } from '@pickleballinc/react-ui';
import Link from 'next/link';
import { toast } from 'react-toastify';

import Background from '../Extra/Background';

interface IFormProps {
  email: string;
}

export default function ResetVerifyEmailForm(props: IFormProps) {
  const postForgotPasswordRequest = usePostForgotPasswordRequestByEmail();

  const onResendConfirm = async () => {
    try {
      await postForgotPasswordRequest({
        email: props.email,
        custom_url: `${window.location.origin}/forgot_password`
      });
      toast.success(`An email link was resent to ${props.email}`);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <Background />
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[24px]">
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 text-center sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center">
            <img src="/icons/icon-msg.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Email Sent to Reset Password
          </div>
          <div className="mt-5 text-md font-normal text-gray-500">
            Check email box for
            <br />
            <span className="font-medium text-gray-500">{props.email}</span>
            <br />
            for a link to reset your password.
            <br />
            <br />
            <span className="text-sm font-semibold">
              NOTE: Check your junk/spam folder if you do not receive the email
            </span>
          </div>
          <div className="my-5 text-sm font-normal text-gray-500">
            Didn't receive the email?{' '}
            <LinkButton onClick={onResendConfirm}>Resend Email</LinkButton>
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
