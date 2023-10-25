'use client';

import BackButton from '@components/Buttons/BackButton';
import TermsAndPolicy from '@components/Footers/TermsAndPolicy';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import { useGetCountries, useGetStates } from '@lib/hooks/country';
import { Button, InputField, Radio, Select } from '@pickleballinc/react-ui';
import { validateRecaptchaToken } from '@server/recaptcha';
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function RegisterSubmitForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaResult, setRecaptchaResult] = useState(false);
  const { data: countriesData } = useGetCountries();
  const { data: statesData } = useGetStates();

  const getCountryCodesOptions = () => {
    return countriesData.results
      .filter(country => country.internationalCountryCallingCode.length > 0)
      .map(country => {
        return {
          value: country.id,
          label: `${`${country.abbreviation} (${country.internationalCountryCallingCode}) `}`
        };
      });
  };

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
            <img src="/icons/logo-pt.svg" width={64} height={64} />
            <img src="/icons/logo-p.svg" width={64} height={64} />
            <img src="/icons/logo-pb.svg" width={64} height={64} />
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
              <div className="flex-1">
                <InputField
                  label="First Name"
                  placeholder="Your first name"
                  className="input-basic"
                />
              </div>
              <div className="flex-1">
                <InputField
                  label="Last Name"
                  placeholder="Your last name"
                  className="input-basic"
                />
              </div>
            </div>
            <div className="mt-5 text-left">
              <div className="input-label">Country</div>
              <Select
                options={countriesData.results.map(item => {
                  return { value: item.id, label: item.title };
                })}
                isClearable
                placeholder="Pick your country"
              />
            </div>
            <div className="mt-5 text-left">
              <div className="input-label">State</div>
              <Select
                options={statesData.results.slice(0, 10).map(item => {
                  return { value: item.id, label: item.title };
                })}
                isClearable
                placeholder="Pick your state"
              />
            </div>
            <div className="mt-5 text-left">
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
            <div className="mt-10 flex flex-wrap gap-2 text-left">
              <div className="basis-[180px] sm:basis-[50%]">
                <div className="input-label">Country</div>
                <Select
                  options={getCountryCodesOptions()}
                  className="select-basic"
                />
              </div>
              <div className="basis-[130px] sm:flex-1">
                <InputField
                  label="Area Code"
                  placeholder="Area code"
                  className="input-basic"
                />
              </div>
              <div className="flex-1 sm:basis-[100%]">
                <InputField
                  label="Phone Number"
                  placeholder="000-0000"
                  className="input-basic"
                />
              </div>
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
          <div className="mt-8">
            <TermsAndPolicy />
          </div>
        </div>
      </div>
    </div>
  );
}
