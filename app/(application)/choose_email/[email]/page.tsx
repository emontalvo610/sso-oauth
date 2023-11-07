import LoginForm from '@lib/components/PageForms/LoginForm';
import RegisterPrepareForm from '@lib/components/PageForms/RegisterPrepareForm';
import { lookupEmail, validateToken } from '@lib/server/api';
import { getServerActionSession } from '@lib/server/session/session';
import { redirect } from 'next/navigation';

interface IPageProps {
  params: {
    email: string;
  };
}

export default async function ValidateEmailPage({ params }: IPageProps) {
  const email = decodeURIComponent(params.email);
  const emailExist = await lookupEmail(email);

  const session = await getServerActionSession();
  const { user } = session;

  if (user?.token) {
    const isTokenValid = await validateToken(user.token);
    if (isTokenValid) {
      redirect('/profile');
    }
  }

  return emailExist ? (
    <LoginForm email={email} />
  ) : (
    <RegisterPrepareForm email={email} />
  );
}
