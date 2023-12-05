'use client';

import { faEnvelope } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinkButton from '@lib/components/Buttons/LinkButton';
import CodeInputField from '@lib/components/Forms/CodeInputField';
import HorizontalBar from '@lib/components/Layouts/HorizontalBar';
import {
  useGetValidateSecret,
  usePostForgotPasswordRequest
} from '@lib/hooks/forgot_password';
import { getSearchParamQuery } from '@lib/utils/url';
import { Button } from '@pickleballinc/react-ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import BackButton from '../Buttons/BackButton';
import Background from '../Extra/Background';
import BackButtonLayout from '../Layouts/BackButtonLayout';
import Spinner from '../Loadings/Spinner';
import ErrorWrapper from '../Wrappers/ErrorWrapper';

interface IFormProps {
  email: string;
  phoneNumber: string;
}

export default function ResetVerifySMSForm(props: IFormProps) {
  const [isLoading, setLoading] = useState(false);
  const [isEmailLoading, setEmailLoading] = useState(false);
  const [isSMSLoading, setSMSLoading] = useState(false);
  const [authCode, setAuthCode] = useState('######');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const postForgotPasswordRequest = usePostForgotPasswordRequest();
  const getValidateSecret = useGetValidateSecret();

  const onSendEmailConfirmation = async () => {
    try {
      setEmailLoading(true);
      await postForgotPasswordRequest({
        email: props.email,
        custom_url: `${window.location.origin}/forgot_password`,
        request_type: 'email'
      });
      toast.success(`An email link was resent to ${props.email}`);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setEmailLoading(false);
    }
  };

  const onSendSMSConfirmation = async () => {
    try {
      setSMSLoading(true);
      await postForgotPasswordRequest({
        email: props.email,
        request_type: 'sms'
      });
      toast.success(`A text message was resent to your phone`);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setSMSLoading(false);
    }
  };

  const getBackUrl = () => {
    return `/${getSearchParamQuery()}`;
  };

  const onAuthCodeChange = (value: string) => {
    setAuthCode(value);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const { status } = await getValidateSecret(authCode);
      if (status === 200) {
        router.push(`/forgot_password/${authCode}`);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Invalid code. Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />
      <BackButtonLayout>
        <BackButton targetUrl={getBackUrl()} />
      </BackButtonLayout>
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[60px]">
        <div className="box-border flex w-[540px] flex-col items-center rounded-[12px] bg-white px-5 pb-12 pt-8 text-center sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center gap-6">
            <img src="/icons/icon-mobile.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Text sent to
          </div>
          <div className="mb-8 mt-3 text-md font-normal text-gray-500 sm:mt-2">
            <span className="text-gray-900">{props.phoneNumber}</span>
          </div>
          <div className="relative flex w-0 justify-center">
            <CodeInputField onChange={onAuthCodeChange} />
          </div>
          <div className="mt-8 w-[360px] sm:w-full">
            <Button
              variant="primary"
              className="btn-submit"
              onClick={onSubmit}
              disabled={authCode.includes('#') || isLoading}
            >
              {isLoading && <Spinner />}
              Get started
            </Button>
            <ErrorWrapper>{errorMessage}</ErrorWrapper>
            <div className="my-5 text-sm font-normal text-gray-500">
              Didn't receive the text message?{' '}
              <LinkButton
                onClick={onSendSMSConfirmation}
                disabled={isSMSLoading}
              >
                {isSMSLoading && <Spinner />}
                Click to resend
              </LinkButton>
            </div>
            <HorizontalBar>OR</HorizontalBar>
            <Button
              prefixIcon={
                isEmailLoading ? (
                  <Spinner />
                ) : (
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    width={20}
                    height={20}
                    className="pt-1"
                  />
                )
              }
              size="md"
              variant="secondary"
              className="btn-simple mt-4 w-full"
              onClick={onSendEmailConfirmation}
              disabled={isEmailLoading}
            >
              Send an email
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
