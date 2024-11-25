import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../layouts/PageLayout';

const DotoriHistoryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('전체');

  const history = [
    {
      date: '10.09',
      title: '닉네임님에게 선물을 보냈습니다.',
      amount: -33,
      detail: '게시글 제목 영역입니다 여기까지',
      type: '사용'
    },
    {
      date: '10.09',
      title: '닉네임님에게 선물을 받았습니다.',
      amount: +5,
      detail: '게시글 제목 영역입니다 여기까지',
      type: '적립'
    },
    {
      date: '10.02',
      title: '게시글 작성 적립',
      amount: +10,
      detail: '게시글 제목 영역입니다 여기까지',
      type: '적립'
    },
    {
      date: '10.01',
      title: '충전',
      amount: +30,
      detail: '30,000원 결제',
      type: '적립'
    },
    {
      date: '10.01',
      title: '도토리 가입 축하 적립',
      amount: +10,
      type: '적립'
    }
  ];

  const filteredHistory = history.filter(item => {
    if (activeTab === '전체') return true;
    return item.type === activeTab;
  });

  return (
    <PageLayout
      title="보유 도토리"
      onBack={() => navigate(-1)}
      headerButton={{
        text: '도토리 사용 가이드',
        onClick: () => {},
        class: `text-xs font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#757575] mr-4 absolute right-0`
      }}
    >
      <div className="flex items-center gap-2 px-4 py-4 mt-12 h-[92px] w-[360px] bg-[#FBEFE3]">
        <div className="ml-2 w-9 h-9 flex flex-row justify-center items-center p-[6.6px] gap-[3px] rounded-[23.4px] bg-white">
          <img src="/img_dotori.png" alt="dotori" />
        </div>
        <span>보유 도토리</span>
        <span className="absolute right-[24px] font-pretendard text-[18px] font-bold leading-[130%] tracking-[-0.025em] text-[#212121]">24개</span>
      </div>

      <div className="px-4 pb-24 pt-[18px]">
        <div className="h-8 flex flex-row items-center p-0 gap-2">
          {['전체', '사용', '적립'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-8 flex flex-row justify-center items-center px-3 py-[6px] gap-[10px] z-0 rounded-[26px] ${
                activeTab === tab 
                  ? 'bg-[#424242] text-white' 
                  : 'border border-[#E0E0E0] text-[#9E9E9E]'
              }`}
            >
              <span className="font-pretendard text-sm font-normal leading-[140%] flex items-center tracking-[-0.025em]">
                {tab}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-white mt-9">
          {filteredHistory.map((item, index) => (
            <div 
              key={index} 
              className="static left-0 top-0 w-[328px] h-20 flex flex-col pt-3 gap-3 self-stretch z-0 border-b border-[#EEEEEE]"
            >
              <div className="static left-0 top-3 w-[328px] h-14 flex flex-row justify-between p-0 self-stretch z-0">
                <div className="flex items-center">
                  <span className="font-pretendard text-xs font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#9E9E9E]">
                    {item.date}
                  </span>
                  <div className="ml-2 mr-[22px] justify-center static left-11 top-0 w-[226px] h-14 flex flex-col p-0 gap-2 z-1">
                    <span className="font-pretendard text-sm font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#212121]">
                      {item.title}
                    </span>
                    {item.detail && (
                      <div className="static left-0 top-7 h-7 flex flex-row items-center px-2 pl-2 py-1.5 gap-0.5 z-1 rounded-lg opacity-100 bg-[#F5F5F5]">
                        <span className="font-pretendard text-[11px] font-medium leading-[140%] flex items-center tracking-[-0.025em] text-[#9E9E9E]">
                          {item.detail}
                        </span>
                        <img className="static left-[147px] top-1.5 w-4 h-4 z-1" src="/ic_arrow_right_16.svg" alt="arrow" />
                      </div>
                    )}
                  </div>
                  <span className={`
                    static left-[292px] top-0 h-[19px] z-1 opacity-100
                    font-pretendard text-sm font-bold leading-[130%] flex items-center tracking-[-0.025em] 
                    ${item.amount > 0 ? 'text-[#424242]' : ''}`}
                  >
                    {item.amount > 0 ? '+' : ''}{item.amount}개
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default DotoriHistoryPage;