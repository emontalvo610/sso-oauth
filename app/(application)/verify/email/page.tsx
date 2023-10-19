import LinkButton from '@lib/components/Buttons/LinkButton';

export default function VerifyEmailPage() {
  return (
    <div className="flex-1 self-start pt-[72px]">
      <div className="flex justify-center">
        <div className="max-w-[360px] text-center">
          <div className="flex justify-center">
            <img src="/images/logo-pb.png" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Check your email
          </div>
          <div className="mt-5 text-md font-normal text-gray-500">
            An email was sent to
            <br />
            <span className="text-gray-900">example@mail.com</span>
          </div>
          <div className="mt-5 text-md font-normal text-gray-500">
            Open the email and click on the link to complete your signup process
          </div>
          <div className="mt-5 text-sm font-normal text-gray-500">
            Didn't receive the email? <LinkButton>Click to resend</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
