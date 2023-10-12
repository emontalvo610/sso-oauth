import { Button, InputField } from "@pickleballinc/react-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between p-6 box-border sm:p-2">
      <div className="flex-1 sm:self-start sm:pt-[88px]">
        <div className="absolute top-16 left-16 sm:top-4 sm:left-4">
          <Button
            prefixIcon={
              <FontAwesomeIcon icon={faArrowLeft} width={12} height={12} />
            }
            size="md"
            variant="secondary"
            className="btn-simple"
          >
            Back
          </Button>
        </div>
        <div className="flex justify-center">
          <div className="max-w-[360px] text-center">
            <div className="flex gap-6 justify-center">
              <img src="/images/logo-pb.png" width={64} height={64} />
              <img src="/images/logo-pt.png" width={64} height={64} />
              <img src="/images/logo-pb.png" width={64} height={64} />
            </div>
            <div className="text-[30px] font-semibold leading-9 mt-6 sm:text-[24px]">
              Let's get started
            </div>
            <div className="text-md text-gray-500 font-normal mt-3 sm:mt-2">
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
              <Button
                variant="primary"
                className="btn-submit mt-8"
              >
                Get Started
              </Button>
            </div>
            <div className="font-normal leading-5 text-gray-600 text-sm text-center mt-8">
              By signing up or logging in, I agree to PickleballBrackets.com's{" "}
              <a href="https://pickleballbrackets.com/legal_Terms.aspx">
                terms of service
              </a>
              ,{" "}
              <a href="https://pickleballbrackets.com/legal_Privacy.aspx">
                privacy policy
              </a>
              ,{" "}
              <a href="https://pickleballbrackets.com/legal_DMCA.aspx">
                and DMCA policy
              </a>
              .
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-8 sm:hidden">
          <div className="font-normal capitalize leading-5 text-gray-600 text-sm">
            © Pickleball Brackets 2023
          </div>
        </div>
      </div>
      <div className="flex-1 sm:hidden">
        <img
          src="/images/background.png"
          className="rounded-[15px] w-[100%] h-[100%] max-h-[calc(100vh-48px)]"
        />
      </div>
    </main>
  );
}
