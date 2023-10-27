'use client';

import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@pickleballinc/react-ui';
import { useRouter } from 'next/navigation';

interface IBackButtonProps {
  targetUrl?: string;
}

const BackButton = ({ targetUrl }: IBackButtonProps) => {
  const router = useRouter();

  const onBack = () => {
    if (targetUrl) router.push(targetUrl);
    else {
      router.back();
    }
  };

  return (
    <Button
      prefixIcon={<FontAwesomeIcon icon={faArrowLeft} width={12} height={12} />}
      size="md"
      variant="secondary"
      className="btn-simple w-[120px]"
      onClick={onBack}
    >
      Back
    </Button>
  );
};

export default BackButton;
