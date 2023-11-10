'use client';

import { InputField } from '@pickleballinc/react-ui';
import type { FC, PropsWithChildren } from 'react';
import { Fragment, useRef } from 'react';

interface ICodeInputFieldProps {
  onChange?: (value: string) => void;
}

const CodeInputField: FC<PropsWithChildren<ICodeInputFieldProps>> = ({
  onChange
}) => {
  const inputs = useRef([]);

  const setInputFocus = (index: number) => {
    if (index < 0 || index >= inputs.current.length) return;
    (inputs.current[index] as HTMLInputElement).focus();
  };

  const getCurrentValue = () => {
    let value = '';
    for (let i = 0; i < inputs.current.length; i += 1) {
      value += (inputs.current[i] as HTMLInputElement).value;
    }
    return value;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value && index < inputs.current.length - 1) {
      setInputFocus(index + 1);
    }
    if (onChange) onChange(getCurrentValue());
  };

  const handleInputKeyDown = (index: number, key: string) => {
    const { value } = inputs.current[index] as HTMLInputElement;
    console.log(value);
    if (key === 'Backspace' && !value && index > 0) {
      setInputFocus(index - 1);
    }
  };

  return (
    <div className="flex gap-3 mi:scale-[85%] mi:gap-1 sm:gap-2">
      {[0, 1, 2, 3, 4, 5].map(index => (
        <Fragment key={index}>
          <InputField
            className="input-code-item"
            maxLength={1}
            ref={input => {
              (inputs.current[index] as unknown) = input;
            }}
            onChange={e => handleInputChange(index, e.target.value)}
            onKeyDown={e => handleInputKeyDown(index, e.key)}
          />
          {index === 2 && (
            <span className="text-[60px] font-medium text-gray-300 sm:text-[38px]">
              -
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default CodeInputField;
