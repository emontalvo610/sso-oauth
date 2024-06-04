/* eslint-disable no-console */
import axios from '@lib/server/axios';
import { Environment } from '@lib/server/environment';
import { validateRecaptchaToken } from '@lib/server/recaptcha';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    console.log('Unsupported method');
    res.status(405).json({ message: 'Method not supported' });
  }
  try {
    // Recaptcha validation
    const captchaToken = req.body.payload.captchaToken;
    const isHuman = await validateRecaptchaToken(captchaToken);
    if (!isHuman) {
      return res.status(500).json({
        message:
          'We were unable to verify that you are not a robot. Please ensure your browser has cookies and JavaScript enabled.'
      });
    }
    delete req.body.payload.captchaToken;

    const response = await axios.post(
      `${Environment.API_URL}/v1/pub/register_users`,
      {
        payload: req.body.payload,
        force_recreation: true
      }
    );

    if (response.status !== 200) {
      throw new Error('API call failed');
    }

    return res.status(200).json(response.data);
  } catch (err: any) {
    if (err.response?.status === 409) {
      return res.status(409).json({
        message: 'An account with your phone number and name already exists.'
      });
    }
    return res.status(500).json({
      message: 'Something went wrong. Please try again some time later.'
    });
  }
};

export default handler;
