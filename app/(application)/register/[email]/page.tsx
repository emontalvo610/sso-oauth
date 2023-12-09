import RegisterSubmitForm from '@lib/components/PageForms/RegisterSubmitForm';
import { extractIP } from '@lib/utils/location';
import { base64decode } from '@lib/utils/url';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

interface IPageProps {
  params: {
    email: string;
  };
}

export default function RegisterPage({ params }: IPageProps) {
  const header = headers();
  const email = base64decode(decodeURIComponent(params.email));

  if (!email) {
    return notFound();
  }

  const forwardAddr = (header.get('x-forwarded-for') ?? '127.0.0.1').split(
    ','
  )[0]; // ::ffff:127.0.0.1
  const ip = extractIP(forwardAddr);

  return <RegisterSubmitForm ip={ip} email={email} />;
}
