import LoginForm from '@lib/components/PageForms/LoginForm';
import RegisterPrepareForm from '@lib/components/PageForms/RegisterPrepareForm';
import { lookupEmail } from '@lib/server/api';

interface IPageProps {
  params: {
    email: string;
  };
}

export default async function ValidateEmailPage({ params }: IPageProps) {
  const email = decodeURIComponent(params.email);
  const emailExist = await lookupEmail(email);

  return emailExist ? (
    <LoginForm email={email} />
  ) : (
    <RegisterPrepareForm email={email} />
  );
}
