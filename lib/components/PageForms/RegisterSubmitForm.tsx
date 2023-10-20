'use client';

import BackButton from '@components/Buttons/BackButton';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import TermsAndPolicy from '@lib/components/Footers/TermsAndPolicy';
import { validateRecaptchaToken } from '@lib/server/recaptcha';
import { Button, InputField, Radio } from '@pickleballinc/react-ui';
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function RegisterSubmitForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaResult, setRecaptchaResult] = useState(false);

  const onSubmit = async () => {
    if (!executeRecaptcha) return;
    try {
      const token = await executeRecaptcha();
      if (!token) {
        setRecaptchaResult(false);
        return;
      }
      const result = await validateRecaptchaToken(token);
      setRecaptchaResult(result);
    } catch (err) {
      console.error(err);
      setRecaptchaResult(false);
    }
  };

  return (
    <div className="mt-16 flex-1 pb-10 sm:mt-0 sm:self-start sm:pt-[72px]">
      <BackButtonLayout>
        <BackButton />
      </BackButtonLayout>
      <div className="flex justify-center">
        <div className="w-[512px] text-center sm:w-full sm:max-w-[360px]">
          <div className="flex justify-center gap-6">
            <img src="/images/logo-pb.png" width={64} height={64} />
            <img src="/images/logo-pt.png" width={64} height={64} />
            <img src="/images/logo-pb.png" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Create your account
          </div>
          <div className="mt-3 text-md font-normal text-gray-500 sm:mt-2">
            Fill in the form to create your account
          </div>
          <div className="mt-8 w-full">
            <div className="text-left">
              <InputField
                label="Email"
                placeholder="Enter your email"
                className="input-basic"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-5 text-left sm:flex-col">
              <InputField
                label="First Name"
                placeholder="Your first name"
                className="input-basic"
              />
              <InputField
                label="Last Name"
                placeholder="Your last name"
                className="input-basic"
              />
            </div>
            <div className="mt-5 text-left">
              <InputField
                label="Country"
                placeholder="Pick your country"
                className="input-basic"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-5 text-left sm:flex-col">
              <InputField
                label="State"
                placeholder="Pick your state"
                className="input-basic"
              />
              <InputField
                label="Zip Code"
                placeholder="Zip Code"
                className="input-basic"
              />
            </div>
            <div className="mt-10 text-left">
              <InputField
                label="Password"
                placeholder="Create a password"
                className="input-basic"
                type="password"
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
              />
            </div>
            <div className="mt-10 text-left">
              <InputField
                label="Mobile Phone"
                placeholder="000 000-0000"
                className="input-basic"
              />
            </div>
            <div className="mt-5 text-left">
              <div className="mt-1 text-sm font-normal text-gray-500">
                Allow Pickleball Brackets to send you Text Alerts
              </div>
              <div className="flex gap-6">
                <Radio
                  Text="Yes, get texts"
                  size="sm"
                  className="input-radio-basic"
                />
                <Radio
                  Text="No, don't get texts"
                  size="sm"
                  className="input-radio-basic"
                />
              </div>
            </div>
            {!recaptchaResult && (
              <div className="mt-4 text-sm text-red-600">
                We were unable to verify that you are not a robot. Please ensure
                your browser has cookies and JavaScript enabled.
              </div>
            )}
            <Button
              variant="primary"
              className="btn-submit mt-8"
              onClick={onSubmit}
            >
              Get started
            </Button>
          </div>
          <TermsAndPolicy />
        </div>
      </div>
    </div>
  );
}
