/* eslint-disable no-console */
import apiClient from '@lib/server/axios';
import { sessionOptions } from '@lib/server/session/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';

const logoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { redirect } = req.query;

    console.log(redirect || `https://${process.env.COOKIE_DOMAIN}`);
    const encryption = await apiClient.post(
      `${process.env.API_URL}/v1/pb_data/encrypt`,
      {
        ID: req.session.user?.uuid,
        TIMESTAMP: Math.floor(Date.now() / 1000),
        URL: redirect || `https://${process.env.COOKIE_DOMAIN}`,
        LOGOUT: 1
      }
    );
    const OLT: string = encryption.data;

    req.session.destroy();
    res.setHeader('cache-control', 'no-store, max-age=0');

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

    res.status(200).json({
      status: 'OK',
      body: {
        redirectURI,
        redirectOLT
      }
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }

    console.log(e);
  }
};

export default withIronSessionApiRoute(logoutHandler, sessionOptions);
