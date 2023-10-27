import RegisterSubmitForm from '@lib/components/PageForms/RegisterSubmitForm';

interface IPageProps {
  params: {
    email: string;
  };
}

export default function RegisterPage({ params }: IPageProps) {
  const email = decodeURIComponent(params.email);
  return <RegisterSubmitForm email={email} />;
}
