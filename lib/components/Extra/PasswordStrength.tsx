'use client';

interface IPasswordStrengthProps {
  password: string;
}

const PasswordStrength = ({ password }: IPasswordStrengthProps) => {
  if (!password) {
    return null;
  }
  const atLeastOneUppercase = /[A-Z]/g;
  const atLeastOneLowercase = /[a-z]/g;
  const atLeastOneNumeric = /[0-9]/g;
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
  const eightCharsOrMore = /.{8,}/g;

  const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore)
  };

  const passwordStrength = Object.values(passwordTracker).filter(
    value => value
  ).length;

  const getStrength = () => {
    let className = 'h-2 rounded-full';
    let label = '';
    switch (passwordStrength) {
      case 1:
        className += ' w-1/4 bg-danger-300';
        label = 'Weak';
        break;
      case 2:
        className += ' bg-amber-300 w-2/4';
        label = 'Fair';
        break;
      case 3:
      case 4:
        className += ' w-3/4 bg-secondary-300';
        label = 'Good';
        break;
      case 5:
        className += ' w-4/4 bg-green-300';
        label = 'Strong';
        break;
      default:
        break;
    }
    return { className, label };
  };

  return (
    <div className="mt-3 flex items-center">
      <div className="text-xs font-medium tracking-widest">Strength:</div>
      <div className="ml-2 h-2 w-2/3 rounded-full bg-gray-200">
        <div className={getStrength().className} />
      </div>
      <div className="ml-2 text-xs font-medium tracking-widest">
        {getStrength().label}
      </div>
    </div>
  );
};

export default PasswordStrength;
