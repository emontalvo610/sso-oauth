'use client';

import BackButton from '@components/Buttons/BackButton';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import { Button, InputField } from '@pickleballinc/react-ui';
import { useState } from 'react';

export default function ResetPasswordSubmitForm() {
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  return (
    <div className="flex-1 self-start pt-[72px]">
      <BackButtonLayout>
        <BackButton />
      </BackButtonLayout>
      <div className="flex justify-center">
        <div className="max-w-[360px] text-center">
          <div className="flex justify-center">
            <img src="/images/logo-pb.png" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Set new password
          </div>
          <div className="mt-3 text-md font-normal text-gray-500 sm:mt-2">
            Your new password must be different to previously used passwords.
          </div>
          <div className="mt-8 w-full">
            <div className="text-left">
              <InputField
                label="Password"
                placeholder="Create a password"
                className="input-basic"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div className="mt-1 text-sm font-normal text-gray-500">
                Must be at least 8 characters
              </div>
            </div>
            <div className="mt-5 text-left">
              <InputField
                label="Repeat Password"
                placeholder="Repeat the password"
                className="input-basic"
                type="password"
                value={repassword}
                onChange={e => setRepassword(e.target.value)}
              />
            </div>
            <Button variant="primary" className="btn-submit mt-8">
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
