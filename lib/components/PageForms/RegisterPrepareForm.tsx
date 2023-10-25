'use client';

import BackButton from '@components/Buttons/BackButton';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import TermsAndPolicy from '@lib/components/Footers/TermsAndPolicy';
import StaticInputField from '@lib/components/Forms/StaticInputField';
import { Button } from '@pickleballinc/react-ui';
import { useState } from 'react';

export default function RegisterPrepareForm() {
  const [email, setEmail] = useState('example@mail.com');

  return (
    <div className="flex-1 self-start pt-[72px]">
      <BackButtonLayout>
        <BackButton />
      </BackButtonLayout>
      <div className="flex justify-center">
        <div className="max-w-[360px] text-center">
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
            <Button variant="primary" className="btn-submit mt-8">
              Create your account
            </Button>
          </div>
          <div className="mt-8">
            <TermsAndPolicy />
          </div>
        </div>
      </div>
    </div>
  );
}
