'use client';

import BackButton from '@components/Buttons/BackButton';
import TermsAndPolicy from '@components/Footers/TermsAndPolicy';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import { usePostRegister } from '@lib/hooks/auth';
import { useGetCountries, useGetStates } from '@lib/hooks/country';
import type { SelectOption } from '@lib/types/select';
import type { IUser } from '@lib/types/user';
import {
  emailValidatorOptions,
  firstNameValidatorOptions,
  lastNameValidatorOptions,
  password2ValidatorOptionsFn,
  passwordValidatorOptions,
  phoneAreaCodeValidatorOptions,
  phoneNumberValidatorOptions,
  zipCodeValidatorOptions
} from '@lib/validators/user';
import { Button, InputField, Radio, Select } from '@pickleballinc/react-ui';
import { validateRecaptchaToken } from '@server/recaptcha';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import Background from '../Extra/Background';
import ErrorWrapper from '../Wrappers/ErrorWrapper';

interface IFormProps {
  email: string;
}

export default function RegisterSubmitForm(props: IFormProps) {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaResult, setRecaptchaResult] = useState(true);
  const { data: countriesData } = useGetCountries();
  const { data: statesData } = useGetStates();
  const [stateTitle, setStateTitle] = useState('State');
  const [zipCodeTitle, setZipCodeTitle] = useState('Zip Code');
  const [isSubmitted, setSubmitted] = useState(false);
  const postRegister = usePostRegister();

  const {
    register,
    getValues,
    setValue,
    watch,
    trigger,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>();

  const checkManualValidation = () => {
    const { countryId, stateId, phoneCountryId, textAlertEnabled } =
      getValues();
    let valid = true;
    if (countryId) {
      clearErrors('countryId');
    } else {
      setError('countryId', { message: 'Country is required' });
      valid = false;
    }
    if (stateId) {
      clearErrors('stateId');
    } else {
      setError('stateId', { message: 'State is required' });
      valid = false;
    }
    if (phoneCountryId) {
      clearErrors('phoneCountryId');
    } else {
      setError('phoneCountryId', { message: 'Country is required' });
      valid = false;
    }
    if (textAlertEnabled === undefined) {
      setError('textAlertEnabled', {
        message: 'Please select one of the alert options'
      });
      valid = false;
    } else {
      clearErrors('textAlertEnabled');
    }
    return valid;
  };

  const onSelectChange = (option: unknown, id: keyof IUser) => {
    const { value } = option as SelectOption;
    setValue(id, value);
    if (isSubmitted) checkManualValidation();

    // Set title of state and zip code according to the country
    const { countryId } = getValues();
    const country = countriesData.results.find(
      country => country.id === countryId
    );
    setStateTitle(country?.stateTitle || 'State');
    setZipCodeTitle(`${country?.zipCodeTitle || 'Zip'} Code`);
  };

  const getCountriesOptions = () => {
    return countriesData.results.map(item => {
      return { value: item.id, label: item.title };
    });
  };

  const getStatesOptions = () => {
    const { countryId } = getValues();
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
    setSubmitted(true);
    const isValid = checkManualValidation() && (await trigger());
    if (!isValid) return;
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
        const {
          email,
          firstName,
          lastName,
          password,
          phoneNumber,
          phoneAreaCode,
          phoneCountryId,
          countryId,
          stateId,
          zipCode
        } = getValues();
        await postRegister({
          email,
          firstName,
          lastName,
          password,
          phone: phoneNumber,
          phoneAreaCode,
          phoneCountryId: Number(phoneCountryId),
          countryId: Number(countryId),
          stateId: Number(stateId),
          zip: zipCode
        });
        router.push(`/signup-verify/email/${email}`);
      } catch (err) {
        console.error(err);
        setError('root.server', {
          message: 'Something went wrong. Please try again some time later'
        });
      }
    }
  };

  return (
    <>
      <Background />
      <BackButtonLayout>
        <BackButton />
      </BackButtonLayout>
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[60px]">
        <div className="box-border flex w-[592px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-left">
                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  className="input-basic"
                  readOnly
                  {...register('email', emailValidatorOptions)}
                  value={props.email}
                />
                <ErrorWrapper>{errors.email?.message}</ErrorWrapper>
              </div>
              <div className="mt-5 flex flex-wrap gap-5 text-left sm:flex-col">
                <div className="flex-1">
                  <InputField
                    label="First Name"
                    placeholder="Your first name"
                    className="input-basic"
                    {...register('firstName', firstNameValidatorOptions)}
                  />
                  <ErrorWrapper>{errors.firstName?.message}</ErrorWrapper>
                </div>
                <div className="flex-1">
                  <InputField
                    label="Last Name"
                    placeholder="Your last name"
                    className="input-basic"
                    {...register('lastName', lastNameValidatorOptions)}
                  />
                  <ErrorWrapper>{errors.lastName?.message}</ErrorWrapper>
                </div>
              </div>
              <div className="mt-5 text-left">
                <div className="input-label">Country</div>
                <Select
                  options={getCountriesOptions()}
                  instanceId="country-select"
                  placeholder="Pick your country"
                  onChange={option => onSelectChange(option, 'countryId')}
                />
                <ErrorWrapper>{errors.countryId?.message}</ErrorWrapper>
              </div>
              <div className="mt-5 text-left">
                <div className="input-label">{stateTitle}</div>
                <Select
                  options={getStatesOptions()}
                  placeholder={`Pick your ${stateTitle.toLocaleLowerCase()}`}
                  instanceId="state-select"
                  onChange={option => onSelectChange(option, 'stateId')}
                />
                <ErrorWrapper>{errors.stateId?.message}</ErrorWrapper>
              </div>
              <div className="mt-5 text-left">
                <InputField
                  label={zipCodeTitle}
                  placeholder={zipCodeTitle}
                  className="input-basic"
                  {...register('zipCode', zipCodeValidatorOptions)}
                />
                <ErrorWrapper>{errors.zipCode?.message}</ErrorWrapper>
              </div>
              <div className="mt-10 text-left">
                <InputField
                  label="Password"
                  placeholder="Create a password"
                  className="input-basic"
                  type="password"
                  {...register('password', passwordValidatorOptions)}
                />
                <ErrorWrapper>{errors.password?.message}</ErrorWrapper>
                {!errors.password && (
                  <div className="mt-1 text-sm font-normal text-gray-500">
                    Must be at least 8 characters
                  </div>
                )}
              </div>
              <div className="mt-5 text-left">
                <InputField
                  label="Repeat Password"
                  placeholder="Repeat the password"
                  className="input-basic"
                  type="password"
                  {...register('password2', password2ValidatorOptionsFn(watch))}
                />
                <ErrorWrapper>{errors.password2?.message}</ErrorWrapper>
              </div>
              <div className="mt-10 flex flex-wrap gap-2 text-left">
                <div className="basis-[180px] sm:basis-[50%]">
                  <div className="input-label">Country</div>
                  <Select
                    options={getCountryCodesOptions()}
                    className="select-basic"
                    instanceId="country-code-select"
                    onChange={option =>
                      onSelectChange(option, 'phoneCountryId')
                    }
                    placeholder="Country"
                  />
                  <ErrorWrapper>{errors.phoneCountryId?.message}</ErrorWrapper>
                </div>
                <div className="basis-[130px] sm:flex-1">
                  <InputField
                    label="Area Code"
                    placeholder="Area code"
                    className="input-basic"
                    {...register(
                      'phoneAreaCode',
                      phoneAreaCodeValidatorOptions
                    )}
                  />
                  <ErrorWrapper>{errors.phoneAreaCode?.message}</ErrorWrapper>
                </div>
                <div className="flex-1 sm:basis-[100%]">
                  <InputField
                    label="Phone Number"
                    placeholder="000-0000"
                    className="input-basic"
                    {...register('phoneNumber', phoneNumberValidatorOptions)}
                  />
                  <ErrorWrapper>{errors.phoneNumber?.message}</ErrorWrapper>
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
                    onChange={() =>
                      onSelectChange({ value: 1 }, 'textAlertEnabled')
                    }
                  />
                  <Radio
                    Text="No, don't get texts"
                    size="sm"
                    className="input-radio-basic"
                    name="radio-alert"
                    onChange={() =>
                      onSelectChange({ value: 0 }, 'textAlertEnabled')
                    }
                  />
                </div>
                <div className="mt-[-12px]">
                  <ErrorWrapper>
                    {errors.textAlertEnabled?.message}
                  </ErrorWrapper>
                </div>
              </div>
              {!recaptchaResult && (
                <ErrorWrapper>
                  We were unable to verify that you are not a robot. Please
                  ensure your browser has cookies and JavaScript enabled.
                </ErrorWrapper>
              )}
              <Button
                variant="primary"
                className="btn-submit mt-8"
                type="submit"
                onClick={onSubmit}
              >
                Get started
              </Button>
              <ErrorWrapper>{errors.root?.server.message}</ErrorWrapper>
            </form>
          </div>
          <div className="mt-8">
            <TermsAndPolicy />
          </div>
        </div>
      </div>
    </>
  );
}
