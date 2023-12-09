import ErrorEmptyPhoneForm from '@lib/components/PageForms/error/ErrorEmptyPhoneForm';
import ResetVerifySMSForm from '@lib/components/PageForms/ResetVerifySMSForm';
import { getMaskedPhoneNumberByEmail } from '@lib/server/api';
import { base64decode } from '@lib/utils/url';
import { notFound } from 'next/navigation';

interface IPageProps {
  params: {
    email: string;
  };
}

export default async function ResetVerifySMSPage({ params }: IPageProps) {
  const email = base64decode(decodeURIComponent(params.email));
  if (!email) {
    return notFound();
  }
  const phoneNumber = await getMaskedPhoneNumberByEmail(email);

  return phoneNumber ? (
    <ResetVerifySMSForm email={email} phoneNumber={phoneNumber} />
  ) : (
    <ErrorEmptyPhoneForm />
  );
}
