import axios from 'axios';

export interface ILocation {
  ip: string;
  error?: boolean;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  latitude: number;
  longitude: number;
  postal: string;
}

export const extractIP = (str: string) => {
  const reg = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  const res = str.match(reg);
  if (res) {
    return res[0];
  }
  return '';
};

export const getLocationFromIP = async (ip: string) => {
  try {
    if (!ip) {
      return null;
    }
    const { data } = await axios.get(`https://ipapi.co/${ip}/json`);
    return data;
  } catch (err) {
    console.error('Unable to get location from IP: ', ip);
    return null;
  }
};
