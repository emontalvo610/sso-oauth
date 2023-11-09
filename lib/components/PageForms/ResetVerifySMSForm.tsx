'use client';

import { faEnvelope } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinkButton from '@lib/components/Buttons/LinkButton';
import CodeInputField from '@lib/components/Forms/CodeInputField';
import HorizontalBar from '@lib/components/Layouts/HorizontalBar';
import {
  usePostForgotPasswordRequestByEmail,
  usePostForgotPasswordSMSRequestBySMS
} from '@lib/hooks/forgot_password';
import { Button } from '@pickleballinc/react-ui';
import { toast } from 'react-toastify';

import Background from '../Extra/Background';

interface IFormProps {
  email: string;
  phoneNumber: string;
}

export default function ResetVerifySMSForm(props: IFormProps) {
  const postForgotPasswordRequestByEmail =
    usePostForgotPasswordRequestByEmail();
  const postForgotPasswordRequestBySMS = usePostForgotPasswordSMSRequestBySMS();

  const onSendEmailConfirmation = async () => {
    try {
      await postForgotPasswordRequestByEmail({
        email: props.email,
        custom_url: `${window.location.origin}/forgot_password`
      });
      toast.success(`An email link was resent to ${props.email}`);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const onSendSMSConfirmation = async () => {
    try {
      await postForgotPasswordRequestBySMS();
      toast.success(`A text message was resent to your phone`);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <Background />
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[24px]">
        <div className="box-border flex w-[620px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 text-center sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center gap-6">
            <img src="/icons/icon-msg.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Check your text message
          </div>
          <div className="mb-8 mt-3 text-md font-normal text-gray-500 sm:mt-2">
            Text message was sent to
            <br />
            <span className="text-gray-900">{props.phoneNumber}</span>
          </div>
          <div className="relative flex w-0 justify-center">
            <CodeInputField />
          </div>
          <div className="mt-8 w-[360px] sm:w-full">
            <Button variant="primary" className="btn-submit">
              Get started
            </Button>
            <div className="my-5 text-sm font-normal text-gray-500">
              Didn't receive the text message?{' '}
              <LinkButton onClick={onSendSMSConfirmation}>
                Click to resend
              </LinkButton>
            </div>
            <HorizontalBar>OR</HorizontalBar>
            <Button
              prefixIcon={
                <FontAwesomeIcon
                  icon={faEnvelope}
                  width={20}
                  height={20}
                  className="pt-1"
                />
              }
              size="md"
              variant="secondary"
              className="btn-simple mt-4 w-full"
              onClick={onSendEmailConfirmation}
            >
              Send an email
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
