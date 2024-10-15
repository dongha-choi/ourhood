import React, { ChangeEvent } from 'react';

interface FileInputProps {
  id: string;
  name: string;
  label?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  name,
  label,
  onChange,
  error,
}) => {
  return (
    <div className='relative w-full text-sm font-semibold'>
      {label && <label htmlFor={id}>{label}</label>}
      <div className='flex items-center'>
        <input
          id={id}
          name={name}
          type='file'
          onChange={onChange}
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

export default FileInput;
