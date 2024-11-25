import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../layouts/PageLayout';
import { Link } from 'react-router-dom';

const AccountSettings = () => {
    const navigate = useNavigate();

    return (
        <PageLayout
            title="계정 설정"
            onBack={() => navigate(-1)}

        >
        {/* Main Content */}
        <div className="pt-6 px-4 pb-24 pt-12">
            <h2 className="mt-[30px] mb-[31px] text-lg font-bold leading-[130%] tracking-[-0.025em] text-[#212121]">회원정보</h2>
            
            <div className="text-lg font-bold leading-[130%] tracking-[-0.025em] text-[#212121]">
                <div className="w-[328px] h-[71px] flex flex-col gap-1.5 z-0 mb-4">
                    <p className="text-xs font-medium leading-[140%] flex items-center tracking-[-0.025em] text-[#9E9E9E]">이름</p>
                    <div className="w-[328px] h-12 flex items-center px-3 py-3.5 gap-2.5 self-stretch z-1 rounded-lg bg-[#FAFAFA] border border-[#E0E0E0]">
                    <span className="text-sm font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#9E9E9E]">홍길동</span>
                    </div>
                </div>

                <div className="w-[328px] h-[71px] flex flex-col gap-1.5 z-0 mb-4">
                    <p className="text-xs font-medium leading-[140%] flex items-center tracking-[-0.025em] text-[#9E9E9E]">이메일</p>
                    <div className="w-[328px] h-12 flex items-center px-3 py-3.5 gap-2.5 self-stretch z-1 rounded-lg bg-[#FAFAFA] border border-[#E0E0E0]">
                    <span className="text-sm font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#9E9E9E]">dotorit@gmail.com</span>
                    </div>
                </div>

                <div className="w-[328px] h-[71px] flex flex-col gap-1.5 z-0 mb-4">
                    <p className="text-xs font-medium leading-[140%] flex items-center tracking-[-0.025em] text-[#9E9E9E]">휴대전화</p>
                    <div className="w-[328px] h-12 flex items-center px-3 py-3.5 gap-2.5 self-stretch z-1 rounded-lg bg-[#FAFAFA] border border-[#E0E0E0]">
                    <span className="text-sm font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#9E9E9E]">01012341234</span>
                    </div>
                </div>

                <div className="w-[328px] h-[71px] flex flex-col gap-1.5 z-0">
                    <p className="text-xs font-medium leading-[140%] flex items-center tracking-[-0.025em] text-[#9E9E9E]">소셜 연동</p>
                    <div className="w-[328px] h-12 flex items-center px-3 py-3.5 gap-2.5 self-stretch z-1 rounded-lg bg-[#FAFAFA] border border-[#E0E0E0]">
                    <span className="text-sm font-normal leading-[140%] flex items-center tracking-[-0.025em] text-[#9E9E9E]">카카오톡 연동완료</span>
                    </div>
                </div>
                <Link to="/mypage/account-delete">
                    <button className="text-sm font-normal leading-[140%] text-center flex items-center tracking-[-0.025em] text-[#757575] mt-6">
                        계정 삭제하기
                    </button>
                </Link>
            </div>
        </div>

        </PageLayout>
);};

export default AccountSettings;