export const isAndroidWebview = () => {
  return navigator.userAgent.includes(' wv');
};

export const isIOSWebView = () => {
  return /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
    navigator.userAgent
  );
};

export const isWebView = () => {
  return isAndroidWebview() || isIOSWebView();
};
