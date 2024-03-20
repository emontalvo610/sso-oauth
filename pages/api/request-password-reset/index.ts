/* eslint-disable no-console */
import axios from '@lib/server/axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    console.log('Unsupported method');
    res.status(405).json({ message: 'Method not supported' });
  }
  try {
    const response = await axios.post(
      'https://api.pickleball.com/v1/pub/request_forgot_password',
      {
        payload: req.body.payload
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
