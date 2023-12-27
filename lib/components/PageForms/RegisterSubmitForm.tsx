'use client';

import BackButton from '@components/Buttons/BackButton';
import TermsAndPolicy from '@components/Footers/TermsAndPolicy';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import { usePostRegister } from '@lib/hooks/auth';
import { useGetCountries, useGetStates } from '@lib/hooks/country';
import type { SelectOption } from '@lib/types/select';
import type { IUser } from '@lib/types/user';
import type { ILocation } from '@lib/utils/location';
import { getLocationFromIP } from '@lib/utils/location';
import { base64encode, getSearchParamQuery } from '@lib/utils/url';
import { isWebView } from '@lib/utils/webview';
import {
  firstNameValidatorOptions,
  lastNameValidatorOptions,
  password2ValidatorOptionsFn,
  passwordValidatorOptions,
  phoneNumberValidatorOptions,
  zipCodeValidatorOptions
} from '@lib/validators/user';
import {
  Button,
  Checkbox,
  InputField,
  Radio,
  Select
} from '@pickleballinc/react-ui';
import { validateRecaptchaToken } from '@server/recaptcha';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import LogoButton from '../Buttons/LogoButton';
import Background from '../Extra/Background';
import PasswordStrength from '../Extra/PasswordStrength';
import StaticInputField from '../Forms/StaticInputField';
import Spinner from '../Loadings/Spinner';
import ErrorWrapper from '../Wrappers/ErrorWrapper';

interface IFormProps {
  email: string;
  ip: string;
}

interface ISelectOption {
  value: string;
  label: string;
  abbreviation: string;
}

export default function RegisterSubmitForm(props: IFormProps) {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaResult, setRecaptchaResult] = useState(true);
  const { data: countriesData } = useGetCountries();
  const { data: statesData } = useGetStates();
  const [stateTitle, setStateTitle] = useState('State');
  const [zipCodeTitle, setZipCodeTitle] = useState('Zip Code');
  const isSubmitted = useRef<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [isTermsAgreed, setTermsAgreed] = useState(false);
  const [location, setLocation] = useState<ILocation | null>(null);
  const [defaultCountryOption, setDefaultCountryOption] =
    useState<ISelectOption | null>(null);
  const [defaultCountryCodeOption, setDefaultCountryCodeOption] =
    useState<ISelectOption | null>(null);
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

  useEffect(() => {
    console.log('Client IP: ', props.ip);
    getLocationFromIP(props.ip).then(location => {
      setLocation(location);
    });
  }, []);

  useEffect(() => {
    if (location && countriesData.results.length > 0) {
      const countryOption = getDefaultCountryOption();
      const countryCodeOption = getDefaultCountryCodeOption();
      setDefaultCountryOption(countryOption);
      setDefaultCountryCodeOption(countryCodeOption);
    }
  }, [countriesData, location]);

  const checkManualValidation = () => {
    const { countryId, stateId, phoneCountryId, textAlertEnabled, gender } =
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
    if (gender === undefined) {
      setError('gender', {
        message: 'Please select your gender'
      });
      valid = false;
    } else {
      clearErrors('gender');
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
    if (isSubmitted.current) checkManualValidation();

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
      return {
        value: item.id,
        label: item.title,
        abbreviation: item.abbreviation
      } as ISelectOption;
    });
  };

  const getStatesOptions = () => {
    const countryId = watch('countryId');
    return statesData.results
      .filter(state => state.countryId === countryId)
      .map(state => {
        return {
          value: state.id,
          label: state.title,
          abbreviation: state.abbreviation
        } as ISelectOption;
      });
  };

  const getCountryCodesOptions = () => {
    return countriesData.results
      .filter(country => country.internationalCountryCallingCode.length > 0)
      .map(country => {
        return {
          value: country.id,
          label: `${country.abbreviation} (${country.internationalCountryCallingCode})`,
          abbreviation: country.abbreviation
        } as ISelectOption;
      });
  };

  const getDefaultCountryOption = () => {
    const countryOptions = getCountriesOptions();
    let result;
    if (location?.error) {
      result = countryOptions[0];
    } else {
      result = countryOptions.find(
        country => country.abbreviation === location?.country_code_iso3
      );
    }
    setValue('countryId', result?.value || '');
    return result || null;
  };

  const getDefaultCountryCodeOption = () => {
    const countryOptions = getCountryCodesOptions();
    let result;
    if (location?.error) {
      result = countryOptions[0];
    } else {
      result = countryOptions.find(
        country => country.abbreviation === location?.country_code_iso3
      );
    }
    setValue('phoneCountryId', result?.value || '');
    return result || null;
  };

  const getSelectedCountryOption = () => {
    const countryOptions = getCountriesOptions();
    const selectedCountryId = watch('countryId');
    const selectedCountry = countryOptions.find(
      country => country.value === selectedCountryId
    );
    return selectedCountry;
  };

  const getSelectedCountryCodeOption = () => {
    const countryCodeOptions = getCountryCodesOptions();
    const selectedCountryId = watch('phoneCountryId');
    const selectedCountry = countryCodeOptions.find(
      country => country.value === selectedCountryId
    );
    return selectedCountry;
  };

  const onClickSubmit = () => {
    isSubmitted.current = true;
    if (checkManualValidation()) trigger();
  };

  const onSubmit = async () => {
    isSubmitted.current = true;
    const isValid = checkManualValidation() && (await trigger());
    if (!isValid) return;
    if (!executeRecaptcha) return;
    let isHuman = false;
    setLoading(true);
    try {
      const token = await executeRecaptcha();
      if (!token) {
        setRecaptchaResult(false);
        setLoading(false);
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
        const { email } = props;
        const {
          firstName,
          lastName,
          password,
          phoneNumber,
          phoneCountryId,
          countryId,
          stateId,
          gender,
          zipCode
        } = getValues();
        await postRegister({
          email,
          firstName,
          lastName,
          password,
          gender,
          phone: phoneNumber,
          phoneCountryId: Number(phoneCountryId),
          countryId: Number(countryId),
          stateId: Number(stateId),
          zip: zipCode,
          custom_url: `${window.location.origin}/validate_email`
        });
        router.push(`/signup-verify/email/${base64encode(email)}`);
      } catch (err) {
        console.error(err);
        setError('root.server', {
          message: 'Something went wrong. Please try again some time later'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getBackUrl = () => {
    return `/${getSearchParamQuery()}`;
  };

  return (
    <>
      <Background />
      <BackButtonLayout>
        <BackButton targetUrl={getBackUrl()} />
      </BackButtonLayout>
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[60px]">
        <div className="pb-4">
          <LogoButton />
        </div>
        <div className="box-border flex w-[592px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center gap-8">
            <img src="/icons/logo-pt.svg" width={48} height={48} />
            <img src="/icons/logo-p.svg" width={48} height={48} />
            <img src="/icons/logo-pb.svg" width={48} height={48} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Create your account
          </div>
          <div className="mt-8 w-full">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="text-left">
                <StaticInputField
                  placeholder="Enter your email"
                  className="input-basic"
                  value={props.email}
                  redirect="/"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-5 text-left sm:flex-col">
                <div className="flex-1">
                  <InputField
                    label="First Name"
                    className="input-basic"
                    autoFocus
                    {...register('firstName', firstNameValidatorOptions)}
                  />
                  <ErrorWrapper>{errors.firstName?.message}</ErrorWrapper>
                </div>
                <div className="flex-1">
                  <InputField
                    label="Last Name"
                    className="input-basic"
                    {...register('lastName', lastNameValidatorOptions)}
                  />
                  <ErrorWrapper>{errors.lastName?.message}</ErrorWrapper>
                </div>
              </div>
              <div className="mt-4 text-left">
                <div className="flex items-center gap-9 sm:gap-4">
                  <div className="input-label pt-[6px]">Gender</div>
                  <Radio
                    Text="Male"
                    size="sm"
                    className="input-radio-basic"
                    name="radio-gender"
                    onChange={() => onSelectChange({ value: 'M' }, 'gender')}
                  />
                  <Radio
                    Text="Female"
                    size="sm"
                    className="input-radio-basic"
                    name="radio-gender"
                    onChange={() => onSelectChange({ value: 'F' }, 'gender')}
                  />
                </div>
                <div className="mb-4 ml-[86px] mt-[-8px] sm:ml-[66px]">
                  <ErrorWrapper>{errors.gender?.message}</ErrorWrapper>
                </div>
              </div>
              <div className="mt-5 text-left">
                <div className="input-label">Country</div>
                <Select
                  options={getCountriesOptions()}
                  className="select-basic"
                  instanceId="country-select"
                  placeholder=""
                  onChange={option => onSelectChange(option, 'countryId')}
                  value={getSelectedCountryOption() || defaultCountryOption}
                />
                <ErrorWrapper>{errors.countryId?.message}</ErrorWrapper>
              </div>
              <div className="mt-5 text-left">
                <div className="input-label">{stateTitle}</div>
                <Select
                  options={getStatesOptions()}
                  className="select-basic"
                  instanceId="state-select"
                  placeholder=""
                  onChange={option => onSelectChange(option, 'stateId')}
                />
                <ErrorWrapper>{errors.stateId?.message}</ErrorWrapper>
              </div>
              <div className="mt-5 text-left">
                <InputField
                  label={zipCodeTitle}
                  className="input-basic"
                  value={watch('zipCode')}
                  {...register('zipCode', zipCodeValidatorOptions)}
                />
                <ErrorWrapper>{errors.zipCode?.message}</ErrorWrapper>
              </div>
              <div className="mt-10 text-left">
                <InputField
                  label="Password"
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
              <PasswordStrength password={watch('password')} />
              <div className="mt-5 text-left">
                <InputField
                  label="Repeat Password"
                  className="input-basic"
                  type="password"
                  {...register('password2', password2ValidatorOptionsFn(watch))}
                />
                <ErrorWrapper>{errors.password2?.message}</ErrorWrapper>
              </div>
              <div className="mt-10 flex flex-wrap gap-5 text-left sm:gap-2">
                <div className="min-w-[120px] basis-[140px] sm:basis-[30%]">
                  <div className="input-label">Country</div>
                  <Select
                    options={getCountryCodesOptions()}
                    className="select-basic"
                    instanceId="country-code-select"
                    placeholder=""
                    onChange={option =>
                      onSelectChange(option, 'phoneCountryId')
                    }
                    value={
                      getSelectedCountryCodeOption() || defaultCountryCodeOption
                    }
                  />
                  <ErrorWrapper>{errors.phoneCountryId?.message}</ErrorWrapper>
                </div>
                <div className="flex-1">
                  <InputField
                    label="Phone Number"
                    maxLength={13}
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
                <div className="mt-2 flex gap-6 mi:flex-col mi:gap-2">
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
                <div className="mt-1">
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
              <div className="mt-6">
                <Checkbox
                  Text={() =>
                    isWebView() ? (
                      <>I agree to the Terms of Service</>
                    ) : (
                      <>
                        I agree to the{' '}
                        <a
                          href="https://pickleball.com/terms-of-use"
                          target="_blank"
                        >
                          Terms of Service
                        </a>
                      </>
                    )
                  }
                  size="sm"
                  onChange={() => {
                    setTermsAgreed(!isTermsAgreed);
                  }}
                />
              </div>
              <Button
                variant="primary"
                className="btn-submit mt-6"
                type="submit"
                onClick={onClickSubmit}
                disabled={isLoading || !isTermsAgreed}
              >
                {isLoading && <Spinner />}
                Submit
              </Button>
              <ErrorWrapper>{errors.root?.server.message}</ErrorWrapper>
            </form>
          </div>
          <div className="mt-4">
            <Link href={getBackUrl()}>Back to Log In</Link>
          </div>
          <div className="mt-8">
            <TermsAndPolicy />
          </div>
        </div>
      </div>
    </>
  );
}
