import HomeForm from '@lib/components/PageForms/HomeForm';
import { getServerActionSession } from '@lib/server/session/session';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerActionSession();
  const { user } = session;

  if (user) {
    redirect('/account');
  }

  return <HomeForm />;
}
