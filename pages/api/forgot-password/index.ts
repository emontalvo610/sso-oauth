/* eslint-disable no-console */
import axios from '@lib/server/axios';
import { Environment } from '@lib/server/environment';
import { getBrowserInfo, getDeviceOS, getDeviceType } from '@lib/utils/browser';
import type { NextApiRequest, NextApiResponse } from 'next';
import os from 'os';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    console.log('Unsupported method');
    res.status(405).json({ message: 'Method not supported' });
  }
  const { payload, userAgent } = req.body;
  const browser = getBrowserInfo(userAgent);
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
