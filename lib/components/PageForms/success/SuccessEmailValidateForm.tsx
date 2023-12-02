'use client';

import Background from '@lib/components/Extra/Background';
import Spinner from '@lib/components/Loadings/Spinner';
import { loginWithCookie } from '@lib/server/api';
import { isWebView } from '@lib/utils/webview';
import { Button } from '@pickleballinc/react-ui';
import type { IronSessionData } from 'iron-session';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SuccessEmailValidateForm(props: IronSessionData) {
  const { user } = props;
  const [isLoading, setLoading] = useState(false);

  const getTargetUrl = () => {
    if (typeof window === 'undefined') return '/';
    if (user?.uuid)
      return `${process.env.NEXT_PUBLIC_PB_PLAYER_URI}/players/${user.uuid}/profile/edit?cplt=true`;
    return window.location.origin;
  };

  const onClaimAccount = async () => {
    try {
      setLoading(true);
      if (user?.email) {
        await loginWithCookie(props);
      }
      window.location.href = getTargetUrl();
    } catch (err) {
      console.error(`Error: login failed`, err);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
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
          {!isWebView() && (
            <>
              <div className="mt-5 text-center text-md font-normal text-gray-500">
                Click below to complete your account setup
              </div>
              <Button
                variant="primary"
                className="btn-submit mt-8 text-md"
                onClick={onClaimAccount}
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
                Claim Account
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
