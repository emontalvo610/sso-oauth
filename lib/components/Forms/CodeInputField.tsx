'use client';

import { InputField } from '@pickleballinc/react-ui';
import type {
  ClipboardEvent,
  FC,
  KeyboardEvent,
  PropsWithChildren
} from 'react';
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
      const digit = (inputs.current[i] as HTMLInputElement).value || '#';
      value += digit;
    }
    return value;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value && index < inputs.current.length - 1) {
      setInputFocus(index + 1);
    }
    if (onChange) onChange(getCurrentValue());
  };

  const handleClipboardPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    let codes = e.clipboardData.getData('text');
    codes = codes
      .split('')
      .filter(code => code >= '0' && code <= '9')
      .join('');
    if (codes.length === inputs.current.length) {
      for (let i = 0; i < inputs.current.length; i += 1) {
        (inputs.current[i] as HTMLInputElement).value = codes[i];
      }
      if (onChange) onChange(getCurrentValue());
    }
  };

  const handleInputKeyDown = async (
    index: number,
    key: string,
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (!e.shiftKey) {
      if (key === 'ArrowLeft' && index > 0) {
        setInputFocus(index - 1);
      }
      if (key === 'ArrowRight' && index < inputs.current.length - 1) {
        setInputFocus(index + 1);
      }
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
            onKeyDown={e => handleInputKeyDown(index, e.key, e)}
            onPaste={e => handleClipboardPaste(e)}
            autoFocus={index === 0}
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
