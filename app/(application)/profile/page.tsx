import ProfileForm from '@lib/components/PageForms/ProfileForm';
import { validateToken } from '@lib/server/api';
import { getServerActionSession } from '@lib/server/session/session';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerActionSession();
  const { user } = session;
  console.log({ user });

  if (user?.token) {
    const isTokenValid = await validateToken(user.token);
    if (!isTokenValid) {
      redirect('/api/logout');
    }
  } else {
    redirect('/api/logout');
  }
  return <ProfileForm email={user.email} />;
}
