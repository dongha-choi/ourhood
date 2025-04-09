import React, { ChangeEvent, FocusEvent } from 'react';

interface IconFormInputProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type: string;
  id: string;
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const IconFormInput: React.FC<IconFormInputProps> = ({
  icon: Icon,
  id,
  label,
  error,
  ...rest
}) => {
  return (
    <div className='relative w-full text-sm font-medium '>
      {label && <label htmlFor={id}>{label}</label>}
      <div className='mt-1 flex items-center border-light rounded-lg'>
        <Icon className='absolute left-2 w-4 h-4 text-gray' />
        <input
          {...rest}
          id={id}
          className='w-full p-2 pl-7 font-light outline-brand'
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

export default IconFormInput;
