'use client';

import { Button } from '@pickleballinc/react-ui';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

type ILinkButtonProps = PropsWithChildren<{
  href?: string;
  onClick?: () => void;
}>;

const LinkButton = ({ children, href, onClick }: ILinkButtonProps) => {
  return (
    <Button
      size="md"
      variant="secondary"
      className="btn-link"
      onClick={onClick}
    >
      {href && (
        <Link className="btn-link" href={href}>
          {children}
        </Link>
      )}
      {!href && <div className="btn-link">{children}</div>}
    </Button>
  );
};

export default LinkButton;
