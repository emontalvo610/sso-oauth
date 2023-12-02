import { isWebView } from '@lib/utils/webview';
import type { FC, PropsWithChildren } from 'react';

const BackButtonLayout: FC<PropsWithChildren> = ({ children }) => {
  return !isWebView() ? (
    <div className="absolute left-16 top-16 sm:left-4 sm:top-4">{children}</div>
  ) : null;
};

export default BackButtonLayout;
