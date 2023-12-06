import RegisterSubmitForm from '@lib/components/PageForms/RegisterSubmitForm';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

interface IPageProps {
  params: {
    email: string;
  };
}

export default function RegisterPage({ params }: IPageProps) {
  const header = headers();
  const email = decodeURIComponent(params.email);

  const forwardAddr = (header.get('x-forwarded-for') ?? '127.0.0.1').split(
    ','
  )[0]; // ::ffff:127.0.0.1
  const ip = extractIP(forwardAddr);

  return <RegisterSubmitForm ip={ip} email={email} />;
}
