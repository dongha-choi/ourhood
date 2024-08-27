import React, { ChangeEvent, FocusEvent } from 'react';

interface FormInputProps {
  type: string;
  id: string;
  name: string;
  value?: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  id,
  name,
  value,
  label,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className='relative w-full mt-2 text-sm font-semibold'>
      <label htmlFor={id}>{label}</label>
      <div className='flex items-center'>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className='w-full mt-1 p-1 font-medium border-light'
          required
        />
      </div>
      {error && (
        <p className='absolute mt-1 text-red text-xs font-medium'>{error}</p>
      )}
    </div>
  );
};

export default FormInput;
