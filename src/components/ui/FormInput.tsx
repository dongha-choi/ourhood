import React, { ChangeEvent, FocusEvent } from 'react';

interface FormInputProps {
  type: string;
  id: string;
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
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
  placeholder,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className='relative w-full text-sm font-semibold'>
      {label && <label htmlFor={id}>{label}</label>}
      <div className='flex items-center'>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className='w-full p-1 font-medium border-light'
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
