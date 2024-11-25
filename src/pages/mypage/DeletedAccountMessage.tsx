import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../layouts/PageLayout';
const DeletedAccountMessage = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <PageLayout
            actionButton={{
              text: '홈으로 돌아가기',
              onClick: goHome,
            }}
        >
      {/* Main Content */}
      <div className="text-[18px] font-bold leading-[130%] tracking-[-0.025em] text-[#212121] mt-[30px] px-4 pb-24 pt-12">
        <p className="">계정이 삭제되었습니다.</p>
        <p className="">그동안 감사했습니다.</p>
      </div>
    </PageLayout>
);};

export default DeletedAccountMessage;