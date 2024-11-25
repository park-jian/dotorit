import React from 'react';
import ic_arrow_left from '/ic_arrow_left.png';
import { useNavigate } from 'react-router-dom';
import {OnboardingLayoutProps} from '../types/type';
export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
    title,
    subtitle,
    step,
    children,
    footer
}) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="fixed top-[24px] w-[360px] h-[48px] px-3 flex items-center justify-between">
        <div className='w-[24px] h-[24px] gap-[8px]'>
            <button className="text-2xl" onClick={handleGoBack}>
                <img src={ic_arrow_left} className='w-[24px] h-[24px]' alt="back"/>
            </button>
        </div>
      </div>
      {/* Title Section */}
        <div className="absolute top-[104px] left-[16px] text-[#212121] ">
            <div>
                <h1 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px] mb-1">
                    {title}
                </h1>
                {subtitle && (
                    <h2 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px]">
                    {subtitle}
                    </h2>
                )}
            </div>
        </div>
       
        {/* Progress Indicator */}
        <div className="absolute top-[138px] right-4 w-[20px] h-[18px] font-bold text-[14px] leading-[18.2px] text-right tracking-tighter">
          <span className="text-black">{step}</span>
          <span className="text-[#BDBDBD]">/3</span>
        </div>

      {/* content */}
      <div className="absolute top-[192px] left-[16px] flex flex-wrap gap-2.5 w-[328px]">
        {children}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-[360px] h-[80px] top-[661px]">
        {footer}
      </div>
    </div>
  );
};

