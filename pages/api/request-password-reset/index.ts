/* eslint-disable no-console */
import axios from '@lib/server/axios';
import { Environment } from '@lib/server/environment';
import { getDeviceType } from '@lib/utils/browser';
import { extractIP } from '@lib/utils/location';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    console.log('Unsupported method');
    res.status(405).json({ message: 'Method not supported' });
  }

  const forwardAddr = String(
    req.headers['x-forwarded-for'] ?? '127.0.0.1'
  ).split(',')[0]; // ::ffff:127.0.0.1
  const userIp = extractIP(forwardAddr);
  const userAgent = req.headers['user-agent'] ?? '';

  try {
    const response = await axios.post(
      `${Environment.API_URL}/v1/pub/request_forgot_password`,
      {
        payload: req.body.payload
      },
      {
        headers: {
          'pb-device': getDeviceType(userAgent),
          'pb-user-ip': userIp
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
