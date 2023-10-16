import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@pickleballinc/react-ui';

const BackButton = () => {
  return (
    <Button
      prefixIcon={<FontAwesomeIcon icon={faArrowLeft} width={12} height={12} />}
      size="md"
      variant="secondary"
      className="btn-simple w-[120px]"
    >
      Back
    </Button>
  );
};

export default BackButton;
