export const getSearchParamQuery = () => {
  const fullUrl = window.location.href;
  const query = fullUrl.split('?')[1];
  if (query) return `?${query}`;
  return '';
};
