import ResetVerifyEmailForm from '@lib/components/PageForms/ResetVerifyEmailForm';

interface IPageProps {
  params: {
    email: string;
  };
}

export default function ResetVerifyEmailPage({ params }: IPageProps) {
  const email = decodeURIComponent(params.email);
  return <ResetVerifyEmailForm email={email} />;
}
