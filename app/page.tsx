import BackButton from '@components/Buttons/BackButton';
import Footer from '@components/Footers/Footer';
import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import FooterLayout from '@components/Layouts/FooterLayout';
import TermsAndPolicy from '@lib/components/Footers/TermsAndPolicy';
import { Button, InputField } from '@pickleballinc/react-ui';

export default function HomePage() {
  return (
    <>
      <div className="flex-1 pb-24 sm:self-start sm:pt-[72px]">
        <BackButtonLayout>
          <BackButton />
        </BackButtonLayout>
        <div className="flex justify-center">
          <div className="max-w-[360px] text-center">
            <div className="flex justify-center gap-6">
              <img src="/images/logo-pb.png" width={64} height={64} />
              <img src="/images/logo-pt.png" width={64} height={64} />
              <img src="/images/logo-pb.png" width={64} height={64} />
            </div>
            <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
              Let's get started
            </div>
            <div className="mt-3 text-md font-normal text-gray-500 sm:mt-2">
              Enter your email to log in or sign up
            </div>
            <div className="mt-8 w-full">
              <div className="text-left">
                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  className="input-basic"
                />
              </div>
              <Button variant="primary" className="btn-submit mt-8">
                Get Started
              </Button>
            </div>
            <TermsAndPolicy />
          </div>
        </div>
        <FooterLayout>
          <Footer />
        </FooterLayout>
      </div>
      <div className="flex-1 sm:hidden">
        <img
          src="/images/background.png"
          className="h-[100%] max-h-[calc(100vh-48px)] w-[100%] rounded-[15px]"
        />
      </div>
    </>
  );
}
