import ChooseForgotPasswordForm from '@lib/components/PageForms/ChooseForgotPasswordForm';
import { lookupEmail } from '@lib/server/api';
import { redirect } from 'next/navigation';

interface IPageProps {
  params: {
    email: string;
  };
}

export default async function ChooseForgotPasswordPage({ params }: IPageProps) {
  const email = decodeURIComponent(params.email);
  const emailExist = await lookupEmail(email);

  if (emailExist) {
    return <ChooseForgotPasswordForm email={email} />;
  }

  redirect(`/`);
}
