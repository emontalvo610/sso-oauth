'use client';

import { faPenLine } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputField } from '@pickleballinc/react-ui';
import type { FC, InputHTMLAttributes, PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';

interface IStaticInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onValueChange?: (value: string) => void;
}

enum Status {
  EDITING,
  STATIC
}

const StaticInputField: FC<PropsWithChildren<IStaticInputFieldProps>> = ({
  label,
  placeholder,
  className,
  value,
  onValueChange
}) => {
  const [status, setStatus] = useState(Status.STATIC);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onEditValue = () => {
    setStatus(Status.EDITING);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value as string;
    }
  }, [status]);

  const onKeyDown: any = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (onValueChange && inputRef.current) {
        onValueChange(inputRef.current.value);
      }
      setStatus(Status.STATIC);
    }
    if (e.key === 'Escape') {
      setStatus(Status.STATIC);
    }
  };

  return (
    <>
      {status === Status.EDITING && (
        <InputField
          label={label}
          placeholder={placeholder}
          className={className}
          onKeyDown={onKeyDown}
          ref={inputRef}
        />
      )}
      {status === Status.STATIC && (
        <div className="flex flex-col gap-2 text-center">
          <div className="text-md font-normal text-gray-600">{label}</div>
          <div className="flex justify-center gap-3 text-md font-normal text-gray-900">
            <div>{value}</div>
            <div
              className="cursor-pointer text-gray-500 hover:text-gray-600"
              onClick={onEditValue}
              onKeyDown={onEditValue}
            >
              <FontAwesomeIcon icon={faPenLine} width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StaticInputField;
