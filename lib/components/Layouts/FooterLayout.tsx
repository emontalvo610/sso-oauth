'use client';

import type { FC, PropsWithChildren } from 'react';

const FooterLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="absolute bottom-8 left-8 sm:hidden">{children}</div>;
};

export default FooterLayout;
