import ResetVerifyEmailForm from '@lib/components/PageForms/ResetVerifyEmailForm';
import { base64decode } from '@lib/utils/url';
import { notFound } from 'next/navigation';

interface IPageProps {
  params: {
    email: string;
  };
}

export default function ResetVerifyEmailPage({ params }: IPageProps) {
  const email = base64decode(decodeURIComponent(params.email));
  if (!email) {
    return notFound();
  }
  return <ResetVerifyEmailForm email={email} />;
}
