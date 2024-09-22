import React, { ChangeEvent, FocusEvent } from 'react';

interface FormTextAreaProps {
  label: string;
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  rows: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  id,
  name,
  value,
  rows,
  placeholder,
  onChange,
  onBlur,
}) => {
  return (
    <>
      <label htmlFor={id} className='w-full mt-2 text-sm font-semibold'>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className='w-full border-light p-1 text-sm min-h-12 appearance-none rounded'
      />
    </>
  );
};

export default FormTextArea;
