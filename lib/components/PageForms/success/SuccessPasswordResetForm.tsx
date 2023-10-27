'use client';

import { Button } from '@pickleballinc/react-ui';
import { useRouter } from 'next/navigation';

export default function SuccessPasswordResetForm() {
  const router = useRouter();

  const onBack2Login = () => {
    router.push('/');
  };

  return (
    <div className="flex-1 self-start pt-[72px]">
      <div className="flex justify-center">
        <div className="max-w-[360px] text-center">
          <div className="flex justify-center">
            <img src="/icons/icon-key.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Password reset
          </div>
          <div className="mt-5 text-md font-normal text-gray-500">
            Your password has been successfully reset.
            <br />
            Click below to log in magically.
          </div>
          <Button
            variant="primary"
            className="btn-submit mt-8"
            onClick={onBack2Login}
          >
            Back to Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
