'use client';

import Background from '@lib/components/Extra/Background';
import { loginWithCookie } from '@lib/server/api';
import { Button } from '@pickleballinc/react-ui';
import type { IronSessionData } from 'iron-session';

export default function SuccessEmailValidateForm(props: IronSessionData) {
  const { user } = props;

  const getTargetUrl = () => {
    if (typeof window === 'undefined') return '/';
    if (user?.uuid)
      return `${process.env.NEXT_PUBLIC_PB_PLAYER_URI}/players/${user.uuid}/profile/edit?cplt=true`;
    return window.location.origin;
  };

  const onClaimAccount = async () => {
    try {
      if (user?.email) {
        await loginWithCookie(props);
      }
      window.location.href = getTargetUrl();
    } catch (err) {
      console.error(`Error: login failed`, err);
    }
  };

  return (
    <>
      <Background />
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[60px]">
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center">
            <img src="/icons/icon-key.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Almost done!
          </div>
          <div className="mt-5 text-md font-normal text-gray-500">
            Click the bottom below to complete your account setup
            <br />
            Click below to log in magically.
          </div>
          <Button
            variant="primary"
            className="btn-submit mt-8 text-md"
            onClick={onClaimAccount}
          >
            Claim Account
          </Button>
        </div>
      </div>
    </>
  );
}
