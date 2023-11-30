import ErrorEmptyPhoneForm from '@lib/components/PageForms/error/ErrorEmptyPhoneForm';
import ResetVerifySMSForm from '@lib/components/PageForms/ResetVerifySMSForm';
import { getMaskedPhoneNumberByEmail } from '@lib/server/api';

interface IPageProps {
  params: {
    email: string;
  };
}

export default async function ResetVerifySMSPage({ params }: IPageProps) {
  const email = decodeURIComponent(params.email);
  const phoneNumber = await getMaskedPhoneNumberByEmail(params.email);

  return phoneNumber ? (
    <ResetVerifySMSForm email={email} phoneNumber={phoneNumber} />
  ) : (
    <ErrorEmptyPhoneForm />
  );
}
