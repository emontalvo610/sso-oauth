/* eslint-disable no-console */
import ProfileForm from '@lib/components/PageForms/ProfileForm';
import apiClient from '@lib/server/axios';
import { getServerActionSession } from '@lib/server/session/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AccountPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
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

  if (searchParams?.redirect) {
    const userObject = {
      email: user.email,
      expiration: user.expiration,
      isCompleted: user.isCompleted,
      isSuperAdmin: user.isSuperAdmin,
      token: user.token,
      oltToken: user.oltToken,
      uuid: user.uuid,
      pbUuid: user.pbUuid
    };

    let redirectOLT;
    let redirectURI = `${process.env.NEXT_PUBLIC_PBRACKETS_SSO_URI}`;

    const encryption = await apiClient.post(
      `${process.env.API_URL}/v1/pb_data/encrypt`,
      {
        ID: user?.uuid,
        TIMESTAMP: Math.floor(Date.now() / 1000),
        URL: searchParams?.redirect
      }
    );

    const OLT = encryption.data;
    redirectOLT = OLT;

    const domain = process.env.NEXT_PUBLIC_PICKLEBALL_TOURNAMENTS;

    if (domain) {
      // we check if pickleballtournaments service is up and healthy
      const healthZ = await apiClient.get(`${domain}/health`);
      console.log(`Response of PTOURNAMENTS healthz is ${healthZ.status}`);

      if (healthZ.status === 201) {
        const sessionObject = {
          SESSION: userObject,
          PBRACKETS: {
            URL: process.env.NEXT_PUBLIC_PBRACKETS_SSO_URI,
            OLT
          }
        };
        const encryptPBTournaments = await apiClient.post(
          `${process.env.API_URL}/v1/pb_data/encrypt`,
          sessionObject
        );
        redirectOLT = encryptPBTournaments.data;
        redirectURI = `${process.env.NEXT_PUBLIC_PICKLEBALL_TOURNAMENTS}/session`;
      }
    }

    redirect(`${redirectURI}?olt=${redirectOLT}`);
  }

  return <ProfileForm email={user.email} />;
}
