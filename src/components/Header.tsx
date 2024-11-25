import React from 'react';

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  headerButton?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    class?: string;
  };
}

const Header = ({ title, onBack, headerButton }: HeaderProps): JSX.Element | null => {
  return (
    <header className="absolute left-0 top-0 w-[360px] h-12 flex flex-row items-center px-3 gap-2 opacity-100">
      
        
          <button onClick={onBack}>
            <img src='/public/ic_arrow_left.png' className="w-6 h-6 z-0 opacity-100" />
          </button>
          {title && (
            <>
            <span className="h-[19px] z-1 font-pretendard text-sm font-bold leading-[130%] tracking-[-0.025em] text-[#212121]">
              {title}
            </span>
            </>
          )}
          {headerButton && (
            <button 
              onClick={headerButton.onClick}
              disabled={headerButton.disabled}
              className={`text-sm text-gray-600 ${headerButton.class}`}
            >
          {headerButton.text}
          </button>
      )}
    </header>
  );
};

export default Header;
