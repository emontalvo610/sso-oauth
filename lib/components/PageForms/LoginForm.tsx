'use client';

import BackButton from '@components/Buttons/BackButton';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import LinkButton from '@lib/components/Buttons/LinkButton';
import TermsAndPolicy from '@lib/components/Footers/TermsAndPolicy';
import StaticInputField from '@lib/components/Forms/StaticInputField';
import { usePostLogin } from '@lib/hooks/auth';
import { Button, InputField } from '@pickleballinc/react-ui';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface IFormProps {
  email: string;
}

export default function LoginForm(props: IFormProps) {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState('');
  const postLogin = usePostLogin();
  const router = useRouter();

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    try {
      await postLogin({ email, password });
      router.push('/profile');
    } catch (error) {
      console.error(`Error: login failed`, error);
      alert('Login failed. Please try again with correct credentials.');
    }
  };

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
            Log in to your account
          </div>
          <div className="mt-3 text-md font-normal text-gray-500 sm:mt-2">
            Enter your password to log in
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
            <div className="mt-5 text-left">
              <InputField
                label="Password"
                placeholder="Input your password"
                className="input-basic"
                type="password"
                value={password}
                onChange={onPasswordChange}
              />
            </div>
            <div className="mt-6 text-right">
              <LinkButton>Forgot password</LinkButton>
            </div>
            <Button
              variant="primary"
              className="btn-submit mt-6"
              onClick={onSubmit}
            >
              Log in
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
