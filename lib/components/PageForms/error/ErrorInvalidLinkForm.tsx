'use client';

import Background from '@lib/components/Extra/Background';
import { Button } from '@pickleballinc/react-ui';
import { useRouter } from 'next/navigation';

export default function ErrorInvalidLinkForm() {
  const router = useRouter();

  const onBack2Login = () => {
    router.push('/');
  };

  return (
    <>
      <Background />
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[60px]">
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center">
            <img src="/icons/icon-warning.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-center text-[30px] font-semibold leading-9 sm:text-[24px]">
            Whoops, that's an invalid link
          </div>
          <div className="mt-5 text-md font-normal text-gray-500">
            Please try again later
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
    </>
  );
}
