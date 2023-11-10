/* eslint-disable no-console */
import { sessionOptions } from '@lib/server/session/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';

const logoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    req.session.destroy();
    res.setHeader('cache-control', 'no-store, max-age=0');
    res.status(200).json({ status: 'OK' });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }

    console.log(e);
  }
};

export default withIronSessionApiRoute(logoutHandler, sessionOptions);
