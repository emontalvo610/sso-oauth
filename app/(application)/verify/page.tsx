import BackButton from '@components/Buttons/BackButton';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TermsAndPolicy from '@lib/components/Footers/TermsAndPolicy';
import { Button } from '@pickleballinc/react-ui';

export default function VerifyPage() {
  return (
    <div className="flex-1 self-start pt-[72px]">
      <BackButtonLayout>
        <BackButton />
      </BackButtonLayout>
      <div className="flex justify-center">
        <div className="max-w-[360px] text-center">
          <div className="flex justify-center gap-6">
            <img src="/images/logo-pb.png" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Email or text message
          </div>
          <div className="mt-3 text-md font-normal text-gray-500 sm:mt-2">
            Choose to verify your account via text message or email
          </div>
          <div className="mt-8 w-full">
            <Button
              prefixIcon={
                <FontAwesomeIcon icon={faArrowLeft} width={12} height={12} />
              }
              size="md"
              variant="secondary"
              className="btn-simple w-full"
            >
              Verify via email
            </Button>
            <div className="my-3 text-md font-normal text-gray-500">OR</div>
            <Button
              prefixIcon={
                <FontAwesomeIcon icon={faArrowLeft} width={12} height={12} />
              }
              size="md"
              variant="secondary"
              className="btn-simple w-full"
            >
              Verify via text message
            </Button>
          </div>
          <TermsAndPolicy />
        </div>
      </div>
    </div>
  );
}
