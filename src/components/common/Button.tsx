import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  children,
  className = ''
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-[16px] left-[16px] w-[328px] h-[48px] rounded-lg px-[70px] py-[15px] flex items-center justify-center ${className}`}
    >
      <span className='text-white text-center font-medium text-sm leading-[19.6px] tracking-[-0.35px]'>
        {children}
      </span>
    </button>
  );
};