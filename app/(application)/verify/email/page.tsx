import VerifyEmailForm from '@lib/components/PageForms/VerifyEmailForm';

interface IPageProps {
  params: {
    email: string;
  };
}

export default function VerifyEmailPage({ params }: IPageProps) {
  return <VerifyEmailForm email={params.email} />;
}
