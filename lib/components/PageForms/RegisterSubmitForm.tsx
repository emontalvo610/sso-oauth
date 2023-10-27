'use client';

import BackButton from '@components/Buttons/BackButton';
import TermsAndPolicy from '@components/Footers/TermsAndPolicy';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import { usePostRegister } from '@lib/hooks/auth';
import { useGetCountries, useGetStates } from '@lib/hooks/country';
import type { SelectOption } from '@lib/types/select';
import { Button, InputField, Radio, Select } from '@pickleballinc/react-ui';
import { validateRecaptchaToken } from '@server/recaptcha';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface IFormProps {
  email: string;
}

export default function RegisterSubmitForm(props: IFormProps) {
  const [email, setEmail] = useState(props.email);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [, setStateId] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [phoneCountryId, setPhoneCountryId] = useState('');
  const [phoneAreaCode, setPhoneAreaCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [, setTextAlertEnabled] = useState(-1);

  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaResult, setRecaptchaResult] = useState(true);
  const { data: countriesData } = useGetCountries();
  const { data: statesData } = useGetStates();
  const postRegister = usePostRegister();

  const stateTitle = useMemo(() => {
    const country = countriesData.results.find(
      country => country.id === countryId
    );
    return country?.stateTitle || 'State';
  }, [countryId]);

  const zipCodeTitle = useMemo(() => {
    const country = countriesData.results.find(
      country => country.id === countryId
    );
    return `${country?.zipCodeTitle || 'Zip'} Code`;
  }, [countryId]);

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const onLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const onCountryChange = (option: unknown) => {
    console.log({ countryId });
    setCountryId((option as SelectOption).value);
  };

  const onStateChange = (option: unknown) => {
    setStateId((option as SelectOption).value);
  };

  const onZipCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onPassword2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword2(event.target.value);
  };

  const onPhoneAreaCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneAreaCode(event.target.value);
  };

  const onPhoneCountryChange = (option: unknown) => {
    setPhoneCountryId((option as SelectOption).value);
  };

  const onPhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const getCountriesOptions = () => {
    return countriesData.results.map(item => {
      return { value: item.id, label: item.title };
    });
  };

  const getStatesOptions = () => {
    return statesData.results
      .filter(state => state.countryId === countryId)
      .map(state => {
        return { value: state.id, label: state.title };
      });
  };

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
    let isHuman = false;
    try {
      const token = await executeRecaptcha();
      if (!token) {
        setRecaptchaResult(false);
        return;
      }
      isHuman = await validateRecaptchaToken(token);
      setRecaptchaResult(isHuman);
    } catch (err) {
      console.error(err);
      setRecaptchaResult(false);
    }

    if (isHuman) {
      try {
        await postRegister({
          email,
          firstName,
          lastName,
          password,
          phone: phoneNumber,
          phoneAreaCode,
          phoneCountryId: Number(phoneCountryId)
        });
        router.push(`/verify/email/${email}`);
      } catch (err) {
        console.error(err);
        alert(`Something went wrong. Please try again some time later`);
      }
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
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-5 text-left sm:flex-col">
              <div className="flex-1">
                <InputField
                  label="First Name"
                  placeholder="Your first name"
                  className="input-basic"
                  value={firstName}
                  onChange={onFirstNameChange}
                />
              </div>
              <div className="flex-1">
                <InputField
                  label="Last Name"
                  placeholder="Your last name"
                  className="input-basic"
                  value={lastName}
                  onChange={onLastNameChange}
                />
              </div>
            </div>
            <div className="mt-5 text-left">
              <div className="input-label">Country</div>
              <Select
                options={getCountriesOptions()}
                instanceId="country-select"
                placeholder="Pick your country"
                onChange={onCountryChange}
              />
            </div>
            <div className="mt-5 text-left">
              <div className="input-label">{stateTitle}</div>
              <Select
                options={getStatesOptions()}
                placeholder={`Pick your ${stateTitle.toLocaleLowerCase()}`}
                instanceId="state-select"
                onChange={onStateChange}
              />
            </div>
            <div className="mt-5 text-left">
              <InputField
                label={zipCodeTitle}
                placeholder={zipCodeTitle}
                className="input-basic"
                value={zipCode}
                onChange={onZipCodeChange}
              />
            </div>
            <div className="mt-10 text-left">
              <InputField
                label="Password"
                placeholder="Create a password"
                className="input-basic"
                type="password"
                value={password}
                onChange={onPasswordChange}
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
                value={password2}
                onChange={onPassword2Change}
              />
            </div>
            <div className="mt-10 flex flex-wrap gap-2 text-left">
              <div className="basis-[180px] sm:basis-[50%]">
                <div className="input-label">Country</div>
                <Select
                  options={getCountryCodesOptions()}
                  className="select-basic"
                  instanceId="country-code-select"
                  onChange={onPhoneCountryChange}
                  placeholder="Country"
                />
              </div>
              <div className="basis-[130px] sm:flex-1">
                <InputField
                  label="Area Code"
                  placeholder="Area code"
                  className="input-basic"
                  value={phoneAreaCode}
                  onChange={onPhoneAreaCodeChange}
                />
              </div>
              <div className="flex-1 sm:basis-[100%]">
                <InputField
                  label="Phone Number"
                  placeholder="000-0000"
                  className="input-basic"
                  value={phoneNumber}
                  onChange={onPhoneNumberChange}
                />
              </div>
            </div>
            <div className="mt-5 text-left">
              <div className="mt-1 text-sm font-normal text-gray-500">
                Allow Pickleball.com to send you Text Alerts
              </div>
              <div className="flex gap-6">
                <Radio
                  Text="Yes, get texts"
                  size="sm"
                  className="input-radio-basic"
                  name="radio-alert"
                  onChange={() => setTextAlertEnabled(1)}
                />
                <Radio
                  Text="No, don't get texts"
                  size="sm"
                  className="input-radio-basic"
                  name="radio-alert"
                  onChange={() => setTextAlertEnabled(0)}
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
