import React from 'react';
import { IoChevronBackOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const ModifyProfile = () => {
    return (
        // overflow-x-hidden 추가 및 전체 패딩 제거
        <div className="relative max-w-md mx-auto bg-white min-h-screen overflow-x-hidden">
          {/* Header - padding 미세 조정 */}
          <header className="relative flex items-center h-[44px] border-b border-gray-100 px-2">
            <button className="flex items-center gap-1">
              <IoChevronBackOutline className="w-5 h-5" />
              <span className="text-[14px]">프로필 편집</span>
            </button>
          </header>
    
          {/* 메인 컨텐츠의 패딩을 더 정밀하게 조정 */}
          <div className="px-4">
            {/* Profile Image - 상단 여백 정확히 조정 */}
            <div className="pt-4">
              <div className="relative w-fit">
                <div className="w-[68px] h-[68px] rounded-full bg-[#F3F0FF] flex items-center justify-center">
                  <img 
                    src="/api/placeholder/40/40" 
                    alt="Profile" 
                    className="w-[40px] h-[40px]" 
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
                  <IoCheckmarkCircleOutline className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

        {/* Form Fields */}
        <div className="mt-6 space-y-6">
          {/* Nickname */}
          <div>
            <div className="text-[13px] text-gray-500 mb-1">닉네임</div>
            <input
              type="text"
              className="w-full border-0 border-b border-gray-200 pb-1 text-[15px] focus:outline-none focus:border-gray-400"
              defaultValue="다짜인데나꾸"
            />
          </div>
          
          {/* Introduction */}
          <div>
            <div className="text-[13px] text-gray-500 mb-1">소개글</div>
            <textarea
              className="w-full border-0 border-b border-gray-200 pb-1 text-[15px] resize-none focus:outline-none focus:border-gray-400"
              defaultValue="다짜인한사람도, 다짜인안한사람도, 반갑습니다. 도움이 필요하시면 그때마다방문해주세숑에에. 많이하다 보니 내공도함께해요!"
              rows={2}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <button className="flex-1 h-[34px] text-[14px] border border-gray-200 rounded bg-gray-50">
            기기/PM
          </button>
          <button className="flex-1 h-[34px] text-[14px] border border-gray-200 rounded bg-gray-50">
            LXsell 디자인
          </button>
          <button className="flex-1 h-[34px] text-[14px] border border-gray-200 rounded bg-gray-50">
            브랜드 디자인
          </button>
        </div>

        {/* Appeal Categories */}
        <div className="mt-8">
          <div className="text-[15px] font-medium mb-2">매력</div>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 h-[32px] bg-gray-50 rounded-full text-[14px]">친환-굿넘</button>
            <button className="px-3 h-[32px] bg-gray-50 rounded-full text-[14px]">좋구-닷오</button>
            <button className="px-3 h-[32px] bg-gray-50 rounded-full text-[14px]">10년 이상</button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6">
          <div className="text-[15px] font-medium mb-2">기타 정보</div>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 h-[32px] bg-gray-50 rounded-full text-[14px]">스냅담당</button>
            <button className="px-3 h-[32px] bg-gray-50 rounded-full text-[14px]">카드키 가입</button>
            <button className="px-3 h-[32px] bg-gray-50 rounded-full text-[14px]">공개쓰</button>
          </div>
        </div>

        {/* Selling Tags */}
        <div className="mt-6">
          <div className="text-[15px] font-medium mb-2">
            내 셀링 태그 <span className="text-gray-400 font-normal">(최소 2개∙최대 5개)</span>
          </div>
          <div className="grid grid-cols-3 gap-[6px]">
            <button className="h-[34px] bg-gray-50 rounded text-[14px]">프로파일러</button>
            <button className="h-[34px] bg-gray-50 rounded text-[14px]">전략전문</button>
            <button className="h-[34px] bg-gray-50 rounded text-[14px]">참여형</button>
            <button className="h-[34px] bg-gray-50 rounded text-[14px]">비지니스 솔션</button>
            <button className="h-[34px] bg-gray-50 rounded text-[14px]">딥팀 리서치</button>
            <button className="h-[34px] bg-gray-50 rounded text-[14px]">커처럽 컨설팅</button>
            <button className="h-[34px] bg-gray-50 rounded text-[14px]">대화형</button>
            <button className="h-[34px] bg-gray-50 rounded text-[14px]">구실과</button>
            <button className="h-[34px] bg-gray-50 rounded text-[14px]">브레인킹</button>
            <button className="h-[34px] bg-gray-50 rounded text-[14px]">심층회</button>
            <button className="h-[34px] bg-gray-50 rounded text-[14px]">스크럽 응용</button>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="px-4 py-4">
          <button className="w-full h-[50px] bg-[#FF6B2C] text-white rounded text-[15px] font-medium">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyProfile;