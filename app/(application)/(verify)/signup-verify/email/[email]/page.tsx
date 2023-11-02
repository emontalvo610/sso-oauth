import SignupVerifyEmailForm from '@lib/components/PageForms/SignupVerifyEmailForm';

interface IPageProps {
  params: {
    email: string;
  };
}

export default function SignupVerifyEmailPage({ params }: IPageProps) {
  const email = decodeURIComponent(params.email);
  return <SignupVerifyEmailForm email={email} />;
}
