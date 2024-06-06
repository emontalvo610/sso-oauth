/* eslint-disable no-console */
import axios from '@lib/server/axios';
import { Environment } from '@lib/server/environment';
import { getBrowserInfo, getDeviceOS, getDeviceType } from '@lib/utils/browser';
import { extractIP } from '@lib/utils/location';
import type { NextApiRequest, NextApiResponse } from 'next';
import { headers } from 'next/headers';
import os from 'os';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    console.log('Unsupported method');
    res.status(405).json({ message: 'Method not supported' });
  }
  const { payload, userAgent } = req.body;
  const browser = getBrowserInfo(userAgent);

  const header = headers();
  const forwardAddr = (header.get('x-forwarded-for') ?? '127.0.0.1').split(
    ','
  )[0]; // ::ffff:127.0.0.1
  const userIp = extractIP(forwardAddr);

  try {
    const response = await axios.post(
      `${Environment.API_URL}/v1/pub/forgot_password`,
      {
        payload
      },
      {
        headers: {
          browser: browser?.getBrowserName() || 'Unknown',
          'browser-version': browser?.getBrowserVersion() || 'Unknown',
          'server-machine-name': os.hostname(),
          'user-agent': userAgent,
          'pb-user-ip': userIp,
          'pb-device': getDeviceType(userAgent),
          'pb-device-os': getDeviceOS(userAgent)
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
