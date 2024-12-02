import React, { useState } from 'react';
import ic_arrow_left from '/ic_arrow_left.png';
import { useNavigate, useLocation } from 'react-router-dom';
import {handleSignUp} from '../../api/user';
interface UserData {
  nickname: string;
  selectedCharacter: string;
  selectedColor: string;
  job: string;
  personalHistory: string;
  corporateForm: string;
  myStatus: string[];
  boardKeywords: string[];
  profileImage: File
}
const InterestSelection: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const interests = [
    '트렌드', '실무 노하우', '커리어 성장',
    '인사이트', '프로덕트', '업계 동향',
    '취업/이직', '기업 정보', '멘토 찾아요',
    '회사생활', '프로젝트', '교육 후기'
  ];
  const userData = location.state as UserData || JSON.parse(localStorage.getItem('userData') || '');
// 데이터가 없으면 이전 페이지로 리다이렉트
// useEffect(() => {
//   if (!userData) {
//     navigate('/job-select');
//   }
// }, [userData, navigate]);

  if (!userData) return null;

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  const handleSignup = async () => {
    const allData = {
      ...userData,
      boardKeywords: selectedInterests, // 선택된 태그들 추가
      simpleIntroduce: "" //가입 단계에서 공란
    };
    //서버와 api통신
    console.log(allData)
    await handleSignUp(allData);
  }
  const isValid = selectedInterests.length > 0;
  return (
    <div className="flex justify-center  w-full h-screen bg-white">
      <div className="w-[360px] h-full relative">
      {/* Header */}
      <div className="absolute top-[24px] w-full h-[48px] px-3 flex items-center justify-between">
          <div className='w-[24px] h-[24px] gap-[8px]'>
            <button className="text-2xl" onClick={handleGoBack}>
              <img src={ic_arrow_left} className='w-[24px] h-[24px]' alt="back"/>
            </button>
          </div>
        </div>

        <div className="absolute top-[104px] left-[16px] text-[#212121]">
          <div>
            <h1 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px] mb-1">
              원하는 정보를 골라주세요!
            </h1>
            <h2 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px]">
              딱 맞는 글을 추천해드릴게요.
            </h2>
          </div>
        </div>
        <div className="absolute top-[138px] right-4 w-[20px] h-[18px] font-bold text-[14px] leading-[18.2px] text-right tracking-tighter">
          <span className="text-black">3</span>
          <span className="text-[#BDBDBD]">/3</span>
        </div>

      {/* Interest Selection */}
      <div className="absolute top-[192px] left-[16px] flex flex-wrap gap-2.5 w-[328px]">
      {interests.map((interest) => (
        <button
          key={interest}
          className={`rounded-md border border-gray-200 px-3.5 py-1.5 ${
            selectedInterests.includes(interest)
              ? 'bg-black text-white'
              : 'bg-white text-gray-500'
          }`}
          onClick={() => toggleInterest(interest)}
        >
          <span className={`font-medium text-sm leading-5 tracking-tighter ${
            selectedInterests.includes(interest) ? 'text-white' : 'text-gray-500'
          }`}>
            {interest}
          </span>
        </button>
      ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-[360px] h-[80px] top-[661px]">
        <button onClick={handleSignup} disabled={!isValid} className={`absolute top-[16px] left-[16px] w-[328px] h-[48px] rounded-lg px-[70px] py-[15px]  flex items-center justify-center ${selectedInterests.length > 0 ? 'bg-[#212121]' : 'bg-[#BDBDBD]'} `}>
          <span className='text-white text-center font-medium text-sm leading-[19.6px] tracking-[-0.35px]'>가입완료</span>
        </button>
      </div>
    </div>
    </div>
  );
};

export default InterestSelection;