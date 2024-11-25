import React, { useState } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../layouts/PageLayout';

type ProfileStats = {
  myPosts: number;
  savedPosts: number;
};

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />
      
      {/* Modal */}
      <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl">
        <div className="px-4 py-6">
          <h3 className="text-center text-lg mb-2">로그아웃 하시겠어요?</h3>
          
          <div className="flex gap-3 mt-8">
            <button 
              onClick={onClose}
              className="flex-1 py-4 border border-gray-200 rounded-xl text-base"
            >
              취소
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-4 bg-black text-white rounded-xl text-base"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAdditionalMenu, setShowAdditionalMenu] = useState(false);
  const [showKeywordEdit, setShowKeywordEdit] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  
  const stats: ProfileStats = {
    myPosts: 5,
    savedPosts: 16
  };

  const additionalTags = ['프로이직', '구직중', '취기'];

  const fullIntroduction = "안녕하세요. 디자인꿈나무입니다. 반갑습니다. 도토리 부냐주세요 그랬어요 네네네네네 : 반가워요 네네네네네네네! 저는 UX/UI 디자이너가 되기 위해 열심히 공부하고 있습니다. 사용자 경험을 개선하는 것에 큰 관심이 있으며, 현재는 스타트업에서 실무 경험을 쌓고 있습니다. 좋은 디자인으로 세상을 더 나은 곳으로 만들고 싶습니다.";
  const shortIntroduction = fullIntroduction.slice(0, 50) + "...";

  const handleLogout = () => {
    console.log('로그아웃 처리');
    setShowLogoutModal(false);
  };

  const handleAdditionalMenuClick = () => {
    setShowAdditionalMenu(!showAdditionalMenu);
    if (!showAdditionalMenu && isExpanded) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="flex flex-col h-full bg-gray-50">
        <PageLayout
          title="마이 페이지"
          onBack={() => navigate(-1)}
        >
          <div className="flex flex-col items-center">
            <div className="absolute left-[140px] top-[88px] w-20 h-20 rounded-full bg-[#DBCBF1] opacity-100">
              <div className="w-12 h-12 bg-contain bg-center" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23FFB266'/%3E%3Ccircle cx='35' cy='40' r='5' fill='black'/%3E%3Ccircle cx='65' cy='40' r='5' fill='black'/%3E%3Cpath d='M35 60 Q50 70 65 60' fill='none' stroke='black' stroke-width='3'/%3E%3C/svg%3E")`
              }} />
            </div>

            {/* Profile Section */}
            <div className="w-[328px] h-[597px] flex flex-col gap-2.5 mt-[48px]">
              <div className="w-[328px] h-[287px] flex flex-col items-center pt-12 pb-2 gap-5 rounded-2xl bg-white">
                <h2 className="mt-3 text-xl font-medium">디자인꿈나무</h2>
                <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600 justify-center px-4">
                  <span>UX/UI 디자이너</span>
                  <span>•</span>
                  <span>스타트업</span>
                  <span>•</span>
                  <span>신입-2년</span>
                  <button 
                    onClick={handleAdditionalMenuClick}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    +3
                  </button>
                </div>

                {showAdditionalMenu && (
                  <div className="flex gap-2 mt-2 text-sm text-gray-600">
                    {additionalTags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-sm text-gray-600 text-center px-4">
                  {isExpanded ? fullIntroduction : shortIntroduction}
                </p>

                <button 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  className="mt-4 px-4 py-2 border border-gray-300 rounded-full text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  {isExpanded ? (
                    <>
                      소개글 접기
                      <IoChevronUpOutline className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      소개글 더보기
                      <IoChevronDownOutline className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Stats */}
              <div className="flex justify-around py-4 bg-white border-t border-b border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-medium">{stats.myPosts}</div>
                  <div className="text-sm text-gray-600">내가 쓴 글</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium">{stats.savedPosts}</div>
                  <div className="text-sm text-gray-600">저장한 글</div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="w-[328px] flex flex-col py-2 gap-1 rounded-2xl bg-white">
                <div className="flex justify-between items-center px-4 py-3 border-b cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 flex justify-center items-center rounded-[23.4px] bg-[#FBEFE3]">
                      <img src="/img_dotori.png" alt="도토리" />
                    </div>
                    <span className="text-sm text-[#212121]">보유 도토리</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#212121]">24개</span>
                    <img src='/ic_arrow_right_16.svg' className="w-4 h-4" alt="arrow" />
                  </div>
                </div>

                <div 
                  className="flex justify-between items-center px-4 py-3 border-b cursor-pointer"
                  onClick={() => setShowKeywordEdit(true)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 flex justify-center items-center rounded-[23.4px] bg-[#FFF8E0]">
                      <span className="text-lg font-bold text-[#E9A800]">#</span>
                    </div>
                    <span className="text-sm text-[#212121]">추천 게시글 키워드</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#212121]">3개</span>
                    <img src='/ic_arrow_right_16.svg' className="w-4 h-4" alt="arrow" />
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="w-[328px] flex flex-col py-2 gap-1 rounded-2xl bg-white">
                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-sm text-[#212121]">계정 설정</span>
                  <img src='/ic_arrow_right_16.svg' className="w-4 h-4" alt="arrow" />
                </div>

                <div 
                  className="flex items-center px-4 py-3 cursor-pointer"
                  onClick={() => setShowLogoutModal(true)}
                >
                  <span className="text-sm text-[#212121]">로그아웃</span>
                </div>
              </div>

              {/* Service Info */}
              <div className="w-[328px] flex justify-center items-center px-4 py-3">
                <button className="text-sm text-[#9E9E9E]">서비스 소개</button>
              </div>
            </div>
          </div>
        </PageLayout>
      </div>

      {/* Keyword Edit Modal */}
      {showKeywordEdit && (
        <div className="absolute inset-x-0 top-0 h-[85%] bg-white rounded-t-3xl shadow-lg">
          <div className="flex flex-col h-full">
            <div className="py-6 px-5">
              <h2 className="text-lg font-medium">추천 게시물 키워드 편집</h2>
              <p className="mt-1 text-sm text-gray-500">(최소 선택 가능)</p>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <button className="py-2 px-3 rounded-full text-sm border border-gray-300 bg-white text-gray-700">트렌드</button>
                <button className="py-2 px-3 rounded-full text-sm border border-gray-300 bg-white text-gray-700">신모 노하우</button>
                <button className="py-2 px-3 rounded-full text-sm border-gray-900 bg-gray-900 text-white">커리어 성장</button>
                <button className="py-2 px-3 rounded-full text-sm border border-gray-300 bg-white text-gray-700">인사이트</button>
                <button className="py-2 px-3 rounded-full text-sm border border-gray-300 bg-white text-gray-700">프로젝트</button>
                <button className="py-2 px-3 rounded-full text-sm border border-gray-300 bg-white text-gray-700">업계 동향</button>
                <button className="py-2 px-3 rounded-full text-sm border-gray-900 bg-gray-900 text-white">취업/이직</button>
                <button className="py-2 px-3 rounded-full text-sm border-gray-900 bg-gray-900 text-white">기업 정보</button>
                <button className="py-2 px-3 rounded-full text-sm border border-gray-300 bg-white text-gray-700">멘토 찾아요</button>
                <button className="py-2 px-3 rounded-full text-sm border border-gray-300 bg-white text-gray-700">취시생활</button>
                <button className="py-2 px-3 rounded-full text-sm border border-gray-300 bg-white text-gray-700">프로젝트</button>
                <button className="py-2 px-3 rounded-full text-sm border border-gray-300 bg-white text-gray-700">교육 후기</button>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4">
              <button 
                className="w-full bg-gray-900 text-white py-4 rounded-xl text-base font-medium"
                onClick={() => setShowKeywordEdit(false)}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default ProfilePage;