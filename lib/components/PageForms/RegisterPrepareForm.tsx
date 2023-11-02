'use client';

import BackButton from '@components/Buttons/BackButton';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import TermsAndPolicy from '@lib/components/Footers/TermsAndPolicy';
import StaticInputField from '@lib/components/Forms/StaticInputField';
import { Button } from '@pickleballinc/react-ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Background from '../Extra/Background';

interface IFormProps {
  email: string;
}

export default function RegisterPrepareForm(props: IFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(props.email);

  const onCreateAccount = () => {
    router.push(`/register/${email}`);
  };

  return (
    <>
      <Background />
      <BackButtonLayout>
        <BackButton />
      </BackButtonLayout>
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[60px]">
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center gap-6">
            <img src="/icons/logo-pt.svg" width={64} height={64} />
            <img src="/icons/logo-p.svg" width={64} height={64} />
            <img src="/icons/logo-pb.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Create your account
          </div>
          <div className="mt-3 text-md font-normal text-gray-500 sm:mt-2">
            Your email was not found in our system
          </div>
          <div className="mt-8 w-full">
            <div className="text-left">
              <StaticInputField
                label="Email"
                placeholder="Enter your email"
                className="input-basic"
                value={email}
                onValueChange={setEmail}
              />
            </div>
            <Button
              variant="primary"
              className="btn-submit mt-8"
              onClick={onCreateAccount}
            >
              Create your account
            </Button>
          </div>
          <div className="mt-8">
            <TermsAndPolicy />
          </div>
        </div>
      </div>
    </>
  );
}
