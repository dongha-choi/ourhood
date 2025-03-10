import React, { MouseEvent } from 'react';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  size: 'full' | 'medium' | 'small';
  shape: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  onClick,
  size,
  shape,
  type = 'button',
}) => {
  let style =
    'px-2 text-center border-2 border-brand rounded-lg box-border inline-block font-medium';
  switch (size) {
    case 'full':
      style += ' h-[3rem] text-lg w-full';
      break;
    case 'medium':
      style += ' h-[2.2rem] text-base';
      break;
    case 'small':
      style += ' h-[2rem] text-sm font-semibold';
  }
  switch (shape) {
    case 'primary':
      style += ' bg-brand text-white';
      break;
    case 'secondary':
      style += ' bg-white text-brand';
  }
  return (
    <button disabled={disabled} onClick={onClick} className={style} type={type}>
      {label}
    </button>
  );
};

export default Button;
