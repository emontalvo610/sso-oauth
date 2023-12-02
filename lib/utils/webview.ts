import { getSessionStorageItem, setSessionStorageItem } from './storage';

export const isAndroidWebview = () => {
  return navigator.userAgent.includes(' wv');
};

export const isIOSWebView = () => {
  return /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
    navigator.userAgent
  );
};

export const isWebView = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  const params = new URLSearchParams(window.location.search);
  if (params.get('mobile')) setSessionStorageItem('mobile', 'true');
  const mobile = getSessionStorageItem('mobile');
  return !!mobile;
};
