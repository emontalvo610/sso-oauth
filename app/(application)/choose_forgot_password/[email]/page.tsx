import ChooseForgotPasswordForm from '@lib/components/PageForms/ChooseForgotPasswordForm';
import { lookupEmail } from '@lib/server/api';
import { getServerActionSession } from '@lib/server/session/session';
import { redirect } from 'next/navigation';

interface IPageProps {
  params: {
    email: string;
  };
}

export default async function ChooseForgotPasswordPage({ params }: IPageProps) {
  const email = decodeURIComponent(params.email);
  const emailExist = await lookupEmail(email);

  const session = await getServerActionSession();
  const { user } = session;

  if (user) {
    console.log('@Redirect4');
    redirect('/account');
  }

  if (emailExist) {
    return <ChooseForgotPasswordForm email={email} />;
  }

  redirect(`/`);
}
