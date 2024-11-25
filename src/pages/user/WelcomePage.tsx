import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import ic_arrow_left from '/ic_arrow_left.png';
import ic_arrow_right_16 from '/ic_arrow_right_16.png';
import img_dotori from '/img_dotori.png';
const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  return (
    <div className="flex flex-col h-[777px] bg-white relative">
      {/* Header */}
      <div className="absolute top-[24px] w-[360px] h-[48px] px-3 flex items-center justify-between">
        <div className='w-[24px] h-[24px] gap-[8px]'>
            <button className="text-2xl" onClick={handleGoBack}><img src={ic_arrow_left} className='w-[24px] h-[24px]'/></button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="absolute top-[104px] left-[24px] gap-[6px] font-bold text-xl leading-7 tracking-tighter text-gray-900">
          <p>닉네임닉네임최대10자님,</p>
          <p>가입을 축하드려요!</p>
          <p>도토릿에서 함께 성장해가요.</p>
        </div>

        {/* Icon */}
        <div className="absolute top-[263px] left-[120px]">
          <div className="w-[120px] h-[120px] rounded-[78px] bg-[#FBEFE3] justify-between p-[22px]">
            <img src={img_dotori} />
          </div>
          <div className='flex items-center justify-center w-[40px] h-[40px] absolute top-0 right-0 rounded-[24px] px-[12px] py-[15px] gap-[10px] bg-[#FF6A00]'>
            <div className="w-[21px] h-[21px] flex items-center justify-center font-bold text-white">
              x5
            </div>
          </div>
        </div>
        {/* 가입 선물 content */}
        <div className='text-center absolute top-[400px] left-[109px] text-[#212121] gap-[1px] text-base font-medium leading-[20.8px] tracking-tighter text-center'>
          <p className="">가입 선물로</p>
          <p className=''><span className='font-bold'>도토리 5개</span>를 드렸어요!</p>
        </div>
        {/* 도토리 사용 가이드 content */}
        <button className='absolute flex top-[454px] left-[121px] gap-[2px]'>
          <span className="text-[#757575] font-medium text-sm leading-[19.6px] tracking-tighter">도토리 사용 가이드</span>
          <img src={ic_arrow_right_16} />
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-[360px] h-[80px] top-[661px]">
        <Link to="/">
          <button className="bg-[#212121] absolute top-[16px] left-[16px] w-[328px] h-[48px] rounded-lg px-[70px] py-[15px] flex items-center justify-center">
            <span className='text-white text-center font-medium text-sm leading-[19.6px] tracking-[-0.35px]'>홈 둘러보기</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;