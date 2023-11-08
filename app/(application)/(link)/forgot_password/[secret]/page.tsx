import ResetPasswordSubmitForm from '@lib/components/PageForms/ResetPasswordSubmitForm';
import { validateToken } from '@lib/server/api';
import { getServerActionSession } from '@lib/server/session/session';
import { redirect } from 'next/navigation';

interface IPageProps {
  params: {
    secret: string;
  };
}

export default async function ForgotPasswordPage({ params }: IPageProps) {
  const secret = decodeURIComponent(params.secret);

  const session = await getServerActionSession();
  const { user } = session;

  if (user?.token) {
    const isTokenValid = await validateToken(user.token);
    if (isTokenValid) {
      redirect('/account');
    }
  }

  return <ResetPasswordSubmitForm secret={secret} />;
}
