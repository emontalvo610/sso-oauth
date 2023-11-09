'use client';

import LinkButton from '@lib/components/Buttons/LinkButton';
import { usePostForgotPasswordRequestByEmail } from '@lib/hooks/forgot_password';
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
            Check your email
          </div>
          <div className="mt-5 text-md font-normal text-gray-500">
            We sent a password reset link to
            <br />
            <span className="font-medium text-gray-500">{props.email}</span>
          </div>
          <div className="mt-5 text-sm font-normal text-gray-500">
            Didn't receive the email?{' '}
            <LinkButton onClick={onResendConfirm}>Click to resend</LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
