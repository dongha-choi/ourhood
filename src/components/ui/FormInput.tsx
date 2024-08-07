import React, { ChangeEvent } from 'react';

interface FormInputProps {
  type: string;
  name: string;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  value,
  label,
  onChange,
  error,
}) => {
  return (
    <div className='relative w-full mt-2 text-sm font-semibold'>
      <p>{label}</p>
      <div className='flex items-center'>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
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
