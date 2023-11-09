import ProfileForm from '@lib/components/PageForms/ProfileForm';
import { validateToken } from '@lib/server/api';
import { getServerActionSession } from '@lib/server/session/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const session = await getServerActionSession();
  const { user } = session;

  const logout = async () => {
    'use server';

    // eslint-disable-next-line @typescript-eslint/no-shadow
    cookies().delete('iron-session/pickleball/sso');
  };

  if (user?.token) {
    const isTokenValid = await validateToken(user.token);
    if (!isTokenValid) {
      logout();
      redirect('/');
    }
  } else {
    logout();
    redirect('/');
  }

  return <ProfileForm email={user.email} />;
}
