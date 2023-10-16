import { Button } from '@pickleballinc/react-ui';
import type { FC, PropsWithChildren } from 'react';

const LinkButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Button size="md" variant="secondary" className="btn-link">
      {children}
    </Button>
  );
};

export default LinkButton;
