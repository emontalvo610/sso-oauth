import ProfileForm from '@lib/components/PageForms/ProfileForm';
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

  if (!user) {
    logout();
    redirect('/');
  }

  return <ProfileForm email={user.email} />;
}
