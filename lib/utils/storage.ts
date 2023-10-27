export const setSessionStorageItem = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const getSessionStorageItem = (key: string) => {
  return sessionStorage.getItem(key) || '';
};

export const clearSessionStorageItem = (key: string) => {
  sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};
