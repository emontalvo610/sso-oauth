import ErrorExpiredLinkForm from '@lib/components/PageForms/error/ErrorExpiredLinkForm';
import ErrorInvalidLinkForm from '@lib/components/PageForms/error/ErrorInvalidLinkForm';
import ResetPasswordSubmitForm from '@lib/components/PageForms/ResetPasswordSubmitForm';
import { Validity } from '@lib/constants';
import { validateSecret } from '@lib/server/api';
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

  const validity = await validateSecret(secret);
  if (validity === Validity.VALID)
    return <ResetPasswordSubmitForm secret={secret} />;
  if (validity === Validity.EXPIRED) return <ErrorExpiredLinkForm />;
  return <ErrorInvalidLinkForm />;
}
