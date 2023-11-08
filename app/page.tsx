import HomeForm from '@lib/components/PageForms/HomeForm';
import { validateToken } from '@lib/server/api';
import { getServerActionSession } from '@lib/server/session/session';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerActionSession();
  const { user } = session;

  if (user?.token) {
    const isTokenValid = await validateToken(user.token);
    if (isTokenValid) {
      redirect('/account');
    }
  }

  return <HomeForm />;
}
