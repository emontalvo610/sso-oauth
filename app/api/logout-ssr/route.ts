import apiClient from '@lib/server/axios';
import {
  getServerActionSession,
  SESSION_NAME
} from '@lib/server/session/session';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await getServerActionSession();
  const searchParams = req.nextUrl.searchParams;
  const redirect = searchParams.get('redirect');

  const encryption = await apiClient.post(
    `${process.env.API_URL}/v1/pb_data/encrypt`,
    {
      ID: session.user?.uuid,
      TIMESTAMP: Math.floor(Date.now() / 1000),
      URL: redirect || `${process.env.NEXT_PUBLIC_PB_URI}`,
      LOGOUT: 1
    }
  );
  const OLT: string = encryption.data;

  session.destroy();
  req.cookies.delete(SESSION_NAME);

  let redirectOLT = OLT;
  let redirectURI = `${process.env.NEXT_PUBLIC_PBRACKETS_SSO_URI}`;

  const domain = process.env.NEXT_PUBLIC_PICKLEBALL_TOURNAMENTS;
  if (domain) {
    // we check if pickleballtournaments service is up and healthy
    const healthZ = await apiClient.get(`${domain}/health`);
    // eslint-disable-next-line no-console
    console.log(`Response of PTOURNAMENTS healthz is ${healthZ.status}`);

    if (healthZ.status === 201) {
      const sessionObject = {
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
      redirectURI = `${process.env.NEXT_PUBLIC_PICKLEBALL_TOURNAMENTS}/session-destroy`;
    }
  }

  NextResponse.redirect(`${redirectURI}?olt=${redirectOLT}`);
}
