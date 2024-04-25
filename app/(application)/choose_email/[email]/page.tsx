import LoginForm from '@lib/components/PageForms/LoginForm';
import RegisterPrepareForm from '@lib/components/PageForms/RegisterPrepareForm';
import SignupNeverClaimedForm from '@lib/components/PageForms/SignupNeverClaimedForm';
import { LookupEmail } from '@lib/constants';
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

  if (emailExist.status === LookupEmail.VERIFIED)
    return <LoginForm email={email} />;

  if (emailExist.status === LookupEmail.NOT_FOUND)
    return <RegisterPrepareForm email={email} />;

  return <SignupNeverClaimedForm email={email} />;
}
