import ErrorInvalidLinkForm from '@lib/components/PageForms/error/ErrorInvalidLinkForm';
import {
  encryptUser,
  validateEmailSecret,
  validateSession
} from '@lib/server/api';
import { redirect } from 'next/navigation';

interface IPageProps {
  params: {
    secret: string;
    session: string;
  };
}

export default async function ValidateEmail({ params }: IPageProps) {
  const secret = decodeURIComponent(params.session);
  const session = decodeURIComponent(params.secret);
  const user = await validateEmailSecret(secret);
  const redirection = await validateSession(session);

  if (user && session) {
    const enryptedUser = await encryptUser(user.uuid, user.email);
    redirect(`${redirection.REDIRECT_URL}?session=${enryptedUser}`);
  }
  return <ErrorInvalidLinkForm />;
}
