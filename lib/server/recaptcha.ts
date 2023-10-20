'use server';

import axios from 'axios';

export const validateRecaptchaToken = async (token: string) => {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  );
  return res.data.success;
};
