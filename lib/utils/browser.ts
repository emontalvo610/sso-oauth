import Bowser from 'bowser';

export const getBrowserInfo = (userAgent: string) => {
  const browser = Bowser.getParser(userAgent);
  return browser;
};

export const isMobileDevice = (userAgent: string) => {
  const regExp = /iPhone|iPad|iPod|Android/i;
  return regExp.test(userAgent);
};
