'use client';

import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@pickleballinc/react-ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface IBackButtonProps {
  targetUrl?: string;
}

const BackButton = ({ targetUrl }: IBackButtonProps) => {
  const router = useRouter();

  const onBack = () => {
    if (!targetUrl) {
      router.back();
    }
  };

  return (
    <Link href={targetUrl || '#'} className="link-none">
      <Button
        prefixIcon={
          <FontAwesomeIcon icon={faArrowLeft} width={12} height={12} />
        }
        size="md"
        variant="secondary"
        className="btn-simple btn-text-purple w-[120px]"
        onClick={onBack}
      >
        Back
      </Button>
    </Link>
  );
};

export default BackButton;
