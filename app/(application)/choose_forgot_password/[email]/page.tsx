import ChooseForgotPasswordForm from '@lib/components/PageForms/ChooseForgotPasswordForm';
import { LookupEmail } from '@lib/constants';
import { lookupEmail } from '@lib/server/api';
import { getServerActionSession } from '@lib/server/session/session';
import { base64decode } from '@lib/utils/url';
import { notFound, redirect } from 'next/navigation';

interface IPageProps {
  params: {
    email: string;
  };
}

export default async function ChooseForgotPasswordPage({ params }: IPageProps) {
  const email = base64decode(decodeURIComponent(params.email));
  if (!email) {
    return notFound();
  }
  const emailExist = await lookupEmail(email);

  const session = await getServerActionSession();
  const { user } = session;

  if (user) {
    redirect('/account');
  }

  if (emailExist.status === LookupEmail.VERIFIED) {
    return (
      <ChooseForgotPasswordForm
        email={email}
        smsEnabled={emailExist.smsEnabled}
      />
    );
  }

  redirect(`/`);
}
