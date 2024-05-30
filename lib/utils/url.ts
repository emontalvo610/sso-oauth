export function removeTrailingSlash(url: string) {
  return url.replace(/\/$/, '');
}

export const proxyWhitelist = [
  '/v1/data/lookup_countries',
  '/v1/data/lookup_states',
  '/v1/pub/resend_validation_email',
  '/v1/sso/validate_url'
];

export function isValidProxyUrl(url?: string) {
  if (!url) return false;
  return proxyWhitelist.some(whiteUrl => url.includes(whiteUrl));
}

export const getSearchParamQuery = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  const fullUrl = window.location.href;
  const query = fullUrl.split('?')[1];
  if (query) return `?${query}`;
  return '';
};

export const isPlainText = (str: string) => {
  const symbols = '~`!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';
  for (let i = 0; i < str.length; i += 1) {
    if (
      !(
        (str[i] >= '0' && str[i] <= '9') ||
        (str[i] >= 'a' && str[i] <= 'z') ||
        (str[i] >= 'A' && str[i] <= 'Z') ||
        symbols.includes(str[i])
      )
    )
      return false;
  }
  return true;
};

export const base64encode = (str: string) => {
  return btoa(str);
};

export const base64decode = (str: string) => {
  try {
    const plain = atob(str);
    if (isPlainText(plain) && btoa(plain) === str) return plain;
    return '';
  } catch (err) {
    return '';
  }
};
