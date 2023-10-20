import { faEnvelope } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinkButton from '@lib/components/Buttons/LinkButton';
import CodeInputField from '@lib/components/Forms/CodeInputField';
import HorizontalBar from '@lib/components/Layouts/HorizontalBar';
import { Button } from '@pickleballinc/react-ui';

export default function VerifySMSForm() {
  return (
    <div className="flex-1 self-start pt-[72px]">
      <div className="flex justify-center">
        <div className="max-w-[360px] text-center">
          <div className="flex justify-center gap-6">
            <img src="/images/logo-pb.png" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Check your text message
          </div>
          <div className="mt-3 text-md font-normal text-gray-500 sm:mt-2">
            Text message was sent to
            <br />
            <span className="text-gray-900">1--- ----32</span>
          </div>
          <div className="ml-[-110px] mt-8 sm:ml-[-8px]">
            <CodeInputField />
          </div>
          <div className="mt-8 w-full">
            <Button variant="primary" className="btn-submit">
              Get started
            </Button>
            <div className="my-5 text-sm font-normal text-gray-500">
              Didn't receive the text message?{' '}
              <LinkButton>Click to resend</LinkButton>
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
            >
              Send an email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
