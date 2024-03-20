/* eslint-disable no-console */
import axios from '@lib/server/axios';
import { Environment } from '@lib/server/environment';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    console.log('Unsupported method');
    res.status(405).json({ message: 'Method not supported' });
  }
  try {
    const response = await axios.post(
      `${Environment.API_URL}/v1/pub/register_users`,
      {
        payload: req.body.payload,
        force_recreation: true
      },
      {
        headers: {
          'PB-User-Ip': req.headers['x-forwarded-for'],
          'PB-Device': req.body.device || ''
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('API call failed');
    }

    return res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export default handler;
