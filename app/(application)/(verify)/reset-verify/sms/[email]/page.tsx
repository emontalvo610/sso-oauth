import ResetVerifySMSForm from '@lib/components/PageForms/ResetVerifySMSForm';

interface IPageProps {
  params: {
    email: string;
    phoneNumber: string;
  };
}

export default function ResetVerifySMSPage({ params }: IPageProps) {
  const email = decodeURIComponent(params.email);
  const phoneNumber = params.phoneNumber || '(+1) 425 954 5959';

  return <ResetVerifySMSForm email={email} phoneNumber={phoneNumber} />;
}
