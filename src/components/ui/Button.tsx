import React, { MouseEvent } from 'react';

interface ButtonProps {
  label: string;
  loading?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  label,
  loading,
  onClick,
  type = 'button',
}) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className='w-full mt-2 py-2 text-center text-lg font-medium text-brand border-2 rounded-md  border-brand'
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
