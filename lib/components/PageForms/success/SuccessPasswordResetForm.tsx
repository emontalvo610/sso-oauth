'use client';

import Background from '@lib/components/Extra/Background';
import { Button } from '@pickleballinc/react-ui';
import Link from 'next/link';

export default function SuccessPasswordResetForm() {
  return (
    <>
      <Background />
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[60px]">
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center">
            <img src="/icons/icon-key.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Password reset
          </div>
          <div className="mt-5 text-md font-normal text-gray-500">
            Your password has been successfully reset.
            <br />
          </div>
          <Link href="/" className="link-none text-md">
            <Button variant="primary" className="btn-submit mt-8">
              Back to Log In
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
