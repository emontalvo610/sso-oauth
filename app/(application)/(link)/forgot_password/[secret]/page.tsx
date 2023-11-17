import ResetPasswordSubmitForm from '@lib/components/PageForms/ResetPasswordSubmitForm';
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

  if (user) {
    redirect('/account');
  }

  return <ResetPasswordSubmitForm secret={secret} />;
}
