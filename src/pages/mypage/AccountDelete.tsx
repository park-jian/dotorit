import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../layouts/PageLayout';
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative z-50 w-[300px] bg-white rounded-[10px] p-5">
        <h3 className="text-center text-lg font-medium mb-2">계정을 삭제하시겠습니까?</h3>
        <p className="text-center text-sm text-gray-600">삭제 후 복구가 불가능합니다.</p>
        
        <div className="w-full flex justify-between gap-1 mt-4">
          <button 
            onClick={onClose}
            className="w-[48%] h-[48px] flex justify-center items-center gap-[10px] rounded-[8px] border border-[#757575]"
          >
            취소하기
          </button>
          <button 
            onClick={onConfirm}
            className="w-[48%] h-[48px] flex justify-center items-center gap-[10px] rounded-[8px] bg-[#FF6A00] text-white"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountDelete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // 실제 삭제 로직 구현
    console.log('계정 삭제 처리');
    setIsModalOpen(false);
  };

  return (
    <PageLayout
            title="계정 설정"
            onBack={() => navigate(-1)}
            actionButton={{
              text: '삭제하기',
              onClick: handleDeleteClick,
            }}
        >

      {/* Main Content */}
      <div className="px-4 pb-24 pt-12">
        <h2 className="text-lg font-bold leading-[130%] tracking-[-0.025em] text-[#212121]">계정을 삭제하시겠습니까?</h2>
        
        {/* Icon and Warning */}
        <div className="flex flex-col items-center justify-center mt-[53px] mb-6">
          <div className="relative w-[70px] h-[70px] flex justify-center items-center p-[12.83px] gap-[5.83px] rounded-full bg-[#EEEEEE] border-[3px] border-[#9E9E9E] mb-6">
            <img src="/public/img_dotori.svg" className="w-[39.67px] h-[39.67px] z-0"/>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-[70px] h-[2px] bg-[#9E9E9E] rotate-45"></div>
            </div>
          </div>
          <div className="font-pretendard text-base leading-[130%] text-center tracking-[-0.025em] text-[#212121]">
            <span className="font-medium">닉네임님이 갖고 계신 </span>
            <br />
            <span className="font-bold">도토리 5개가 </span>
            <span className="font-medium">사라져요.</span>
          </div>
        </div>


        {/* Notice Box */}
        <div className="w-[328px] h-[111px] flex flex-col justify-center items-end p-4 pl-3.5 gap-1.5 rounded-[10px] bg-[#F5F5F5] mt-6 mb-9 py-4 px-3.5">
          <div className="flex items-start">
            <input type="checkbox" className="w-6 h-6" />
            <div className="w-[272px] h-[79px] flex flex-col justify-center py-0.5 gap-1 grow z-1">
              <p className="text-sm font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#212121]">내용에 동의합니다.</p>
              <p className="text-xs font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#616161]">
                계정 삭제시 보유하고 있는 젤 또는 도토리 등은 복구되지 않으며 랭킹 등록이 삭제됩니다. 이를 인지하였으며 이에 동의합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Delete Reason */}
        <div className="mt-9 mb-[15px] text-sm font-bold leading-[130%] tracking-[-0.025em] text-[#212121]">탈퇴 사유</div>
        <div className="w-[299px] h-[120px] flex flex-col gap-2">
            <div className="w-[299px] h-6 flex items-center gap-1 self-stretch z-3 ">
              <input type="radio" name="reason" className="w-6 h-6 z-0" />
              <span className="w-[271px] h-[17px] text-xs font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#212121] ml-[3px]">원하는 정보가 없어요.</span>
            </div>
            <div className="w-[299px] h-6 flex items-center gap-1 self-stretch z-3">
              <input type="radio" name="reason" className="w-6 h-6 z-0" />
              <span className="w-[271px] h-[17px] text-xs font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#212121] ml-[3px]">서비스를 이용하기 불편해요.</span>
            </div>
            <div className="w-[299px] h-6 flex items-center gap-1 self-stretch z-3">
              <input type="radio" name="reason" className="w-6 h-6 z-0" />
              <span className="w-[271px] h-[17px] text-xs font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#212121] ml-[3px]">자주 사용하지 않아요.</span>
            </div>
            <div className="w-[299px] h-6 flex items-center gap-1 self-stretch z-3">
              <input type="radio" name="reason" className="w-6 h-6 z-0" />
              <span className="w-[271px] h-[17px] text-xs font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#212121] ml-[3px]">기타</span>
            </div>
            <div className="mt-2 ml-6 py-3.5 px-3 w-[304px] h-12 flex items-center gap-2.5 self-stretch rounded-lg bg-[#FAFAFA] border border-[#E0E0E0]">
              <input 
                type="text" 
                placeholder="기타 탈퇴 사유 직접 입력" 
                className="w-[280px] h-[20px] text-sm text-gray-500 font-normal leading-[140%] flex items-center pl-2 placeholder:text-gray-500 font-pretendard"
              />
            </div>
        </div>

        {/* Delete Button */}
        {/* <button 
          onClick={handleDeleteClick}
          className="w-full py-4 bg-gray-200 text-gray-400 rounded-xl text-base"
        >
          삭제하기
        </button> */}
      </div>

      {/* Modal */}
      <DeleteConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    {/* </div>
  );
}; */}
</PageLayout>
);};

export default AccountDelete;