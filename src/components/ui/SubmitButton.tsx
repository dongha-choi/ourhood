import React, { MouseEvent } from 'react';

interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  disabled,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className='h-10 px-2 w-full text-white text-sm bg-brand hover:bg-brandHovered text-center border-brand rounded-md box-border inline-block font-medium'
      type='submit'
    >
      {label}
    </button>
  );
};

export default SubmitButton;
