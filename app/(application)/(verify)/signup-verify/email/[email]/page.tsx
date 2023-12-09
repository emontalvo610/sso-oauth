import SignupVerifyEmailForm from '@lib/components/PageForms/SignupVerifyEmailForm';
import { base64decode } from '@lib/utils/url';
import { notFound } from 'next/navigation';

interface IPageProps {
  params: {
    email: string;
  };
}

export default function SignupVerifyEmailPage({ params }: IPageProps) {
  const email = base64decode(decodeURIComponent(params.email));
  if (!email) {
    return notFound();
  }
  return <SignupVerifyEmailForm email={email} />;
}
