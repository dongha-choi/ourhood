import React, { ChangeEventHandler, FocusEvent } from 'react';

interface FormInputProps {
  type: string;
  id: string;
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange: ChangeEventHandler | undefined;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, error, ...rest }) => {
  return (
    <div className='relative w-full text-sm font-medium '>
      {label && <label htmlFor={id}>{label}</label>}
      <div className='mt-1 flex items-center'>
        <input
          {...rest}
          id={id}
          className='w-full p-2 font-light text-base border-light outline-brand'
          required
        />
      </div>
      {error && (
        <p className='absolute -bottom-4 text-red text-xs font-medium'>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
