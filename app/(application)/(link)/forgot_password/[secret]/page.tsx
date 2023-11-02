import ResetPasswordSubmitForm from '@lib/components/PageForms/ResetPasswordSubmitForm';

interface IPageProps {
  params: {
    secret: string;
  };
}

export default async function ForgotPasswordPage({ params }: IPageProps) {
  const secret = decodeURIComponent(params.secret);
  return <ResetPasswordSubmitForm secret={secret} />;
}
