import { Button, InputField } from '@pickleballinc/react-ui';

export default function HomePage() {
  return (
    <>
      <img
        src="/images/background.png"
        className="fixed left-0 top-0 h-[100vh] w-[100vw] blur-md"
      />
      <div className="z-10 flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[24px]">
        <div className="pb-8">
          <img
            src="/images/logo.png"
            className="h-[60px] w-[320px] sm:h-[52px] sm:w-[280px]"
          />
        </div>
        <div className="box-border flex h-[590px] w-[440px] flex-col items-center gap-8 rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-[514px] sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center gap-8">
            <img src="/icons/logo-pt.svg" width={48} height={48} />
            <img src="/icons/logo-p.svg" width={48} height={48} />
            <img src="/icons/logo-pb.svg" width={48} height={48} />
          </div>
          <div className="w-full">
            <div className="text-xmd font-semibold leading-7 text-gray-900">
              Enter your email
            </div>
            <div className="pt-4 text-sm font-normal leading-5 text-gray-600">
              Log into your Pickleball.com account. If you don't have one, you
              will be prompted to create one.
            </div>
          </div>
          <div className="w-full">
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
          <div className="w-full text-left text-sm leading-5 text-gray-600 sm:hidden">
            This email and password lets you seamlessly log into the
            Pickleball.com products, such as{' '}
            <a href="https://pickleballbrackets.com/legal_Terms.aspx">
              Pickleball+
            </a>
            ,{' '}
            <a href="https://pickleballbrackets.com/legal_Terms.aspx">
              PickleballTournaments.com
            </a>
            ,{' '}
            <a href="https://pickleballbrackets.com/legal_Terms.aspx">
              PickleballBrackets.com
            </a>
            ,{' '}
            <a href="https://pickleballbrackets.com/legal_Terms.aspx">
              PPATour.com
            </a>
            , and{' '}
            <a href="https://pickleballbrackets.com/legal_Terms.aspx">
              Pickleball TV
            </a>
            .
            <br />
            <br />
            If you've used your email with one of these products, please{' '}
            <a href="#">use it here</a> too.
          </div>
          <div className="text-left text-sm font-normal leading-5 text-gray-600 ld:hidden">
            By signing up or logging in, I agree to PickleballBrackets.com's{' '}
            <a href="https://pickleballbrackets.com/legal_Terms.aspx">
              terms of service
            </a>
            ,{' '}
            <a href="https://pickleballbrackets.com/legal_Privacy.aspx">
              privacy policy
            </a>
            ,{' '}
            <a href="https://pickleballbrackets.com/legal_DMCA.aspx">
              and DMCA policy
            </a>
            .
          </div>
        </div>
      </div>
    </>
  );
}
