import { sessionOptions } from '@lib/server/session/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';

const logoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  res.status(200).redirect('/');
};

export default withIronSessionApiRoute(logoutHandler, sessionOptions);
