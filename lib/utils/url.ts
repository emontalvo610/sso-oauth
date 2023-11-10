export const getSearchParamQuery = () => {
  if (typeof window === 'undefined') {
    return '';
  }
  const fullUrl = window.location.href;
  const query = fullUrl.split('?')[1];
  if (query) return `?${query}`;
  return '';
};
