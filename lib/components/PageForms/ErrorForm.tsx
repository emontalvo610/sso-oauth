import { Button } from '@pickleballinc/react-ui';

export default function ErrorForm() {
  return (
    <div className="flex-1 self-start pt-[72px]">
      <div className="flex justify-center">
        <div className="max-w-[360px] text-center">
          <div className="flex justify-center">
            <img src="/images/logo-pb.png" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            Whoops, that's an invalid link
          </div>
          <div className="mt-5 text-md font-normal text-gray-500">
            If you still need to reset your password, you can request a new
            reset email
          </div>
          <Button variant="primary" className="btn-submit mt-8">
            Back to Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
