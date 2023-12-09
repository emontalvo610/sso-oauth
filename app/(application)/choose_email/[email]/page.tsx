import LoginForm from '@lib/components/PageForms/LoginForm';
import RegisterPrepareForm from '@lib/components/PageForms/RegisterPrepareForm';
import { lookupEmail } from '@lib/server/api';
import { base64decode } from '@lib/utils/url';
import { notFound } from 'next/navigation';

interface IPageProps {
  params: {
    email: string;
  };
}

export default async function ValidateEmailPage({ params }: IPageProps) {
  const email = base64decode(decodeURIComponent(params.email));
  const emailExist = await lookupEmail(email);

  if (!email) {
    return notFound();
  }

  return emailExist ? (
    <LoginForm email={email} />
  ) : (
    <RegisterPrepareForm email={email} />
  );
}
