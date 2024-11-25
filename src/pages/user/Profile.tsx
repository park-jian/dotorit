import React, {useState, useCallback, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
// import { OnboardingLayout } from '../../layouts/OnboardingLayout';
// import { Button } from '../../components/common/Button';
import ic_edit from '/ic_edit.png';
import ic_arrow_left from '/ic_arrow_left.png';
import img_profile from '/img_profile.png';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import { ProfileEditContent } from '../../components/Profile/ProfileEditContent';
import {validateNickname} from '../../api/user';
import {useDebounce} from '../../hooks/useDebounce';
const Profile = () => {
  const [nickname, setNickname] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const navigate = useNavigate();

  const handleValidate = useCallback(async (value: string) => {
    try {
      const result = await validateNickname(value);
      console.log('Validation result:', result);
    } catch (error) {
      console.error('Validation error:', error);
    }
  }, []); // 의존성 배열 비워서 리렌더링 방지

  // useCallback으로 감싸서 리렌더링 방지
  const debouncedValidate = useCallback(
    useDebounce(handleValidate, 500),
    [handleValidate] // handleValidate 함수가 변경될 때만 재생성
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    if (value.length >= 2) {
      debouncedValidate(value);
    }
  }, [debouncedValidate]); // debouncedValidate가 변경될 때만 재생성

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 언마운트 시 cleanup
  useEffect(() => {
    return () => {
      // useDebounce 훅이 반환하는 함수에 cancel 메서드가 있다고 가정
      if (typeof debouncedValidate.cancel === 'function') {
        debouncedValidate.cancel();
      }
    };
  }, [debouncedValidate]);
  
  return (
    <div className="flex justify-center w-full h-full bg-white"> {/* 전체 화면 중앙 정렬 컨테이너 */}
      <div className="w-[360px] h-[777px] relative">
      {/* Header */}
      <div className="absolute top-[24px] h-[48px] px-3 flex items-center justify-between">
        <div className='w-[24px] h-[24px] gap-[8px]'>
            <button className="text-2xl" onClick={handleGoBack}><img src={ic_arrow_left} className='w-[24px] h-[24px]'/></button>
        </div>
      </div>
        <div className="absolute top-[104px] left-[16px] text-[#212121] ">
            <div>
                <h1 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px] mb-1">반가워요!</h1>
                <h2 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px]">프로필을 설정해주세요.</h2>
            </div>
        </div>
        <div className="absolute top-[138px] right-4 w-[20px] h-[18px] font-bold text-[14px] leading-[18.2px] text-right tracking-tighter">
          <span className="text-black">1</span>
          <span className="text-[#BDBDBD]">/3</span>
        </div>

        <div className="w-[100px] h-[100px] absolute top-[192px] left-[130px]">
        <div className="relative w-full h-full">
          <div 
            className="w-full h-full rounded-full flex items-center justify-center p-[18.33px] overflow-hidden"
            style={{ backgroundColor: selectedColor || '#DFD8D8' }}
          >
            
            {selectedCharacter ? (
              <img src={`${selectedCharacter}.png`} alt="Profile" />
            ) : (
              <img
                src={img_profile}
                alt="Default Profile"
              />
            )}
          </div>
          <button 
            className="absolute bottom-[3px] right-[-4px] w-[30px] h-[30px] bg-[#757575] rounded-full flex items-center justify-center"
            onClick={() => setIsBottomSheetOpen(true)}
          >
            <img src={ic_edit} alt="Edit" className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

        {/* Nickname Input */}
        <div className="absolute w-[328px] h-[71px] top-[332px] left-[16px] gap-[6px]">
          <label className="w-[328px] h-[17px] text-[#9E9E9E] font-medium text-xs leading-[16.8px] tracking-[-0.3px]">닉네임</label>
          <div className="relative w-[328px]">
            <input
                onChange={handleInputChange}
                type="text"
                placeholder="최소 2자~최대 10자로 적어주세요"
                className={`w-full h-[48px] rounded-lg border border-[#E0E0E0] px-3 py-[14px] text-sm`}
            />
            </div>
        </div>
      {/* </div> */}

      {/* Footer */}
      <div className="absolute bottom-0 w-[360px] h-[80px] top-[661px]">
        <button className="bg-[#BDBDBD] absolute top-[16px] left-[16px] w-[328px] h-[48px] rounded-lg px-[70px] py-[15px] bg-[#BDBDBD] flex items-center justify-center">
          <span className='text-white text-center font-medium text-sm leading-[19.6px] tracking-[-0.35px]'>다음</span>
        </button>
      </div>

        <BottomSheet 
          isOpen={isBottomSheetOpen} 
          onClose={() => setIsBottomSheetOpen(false)}
        >
          <ProfileEditContent
            selectedCharacter={selectedCharacter}
            selectedColor={selectedColor}
            onCharacterSelect={setSelectedCharacter}
            onColorSelect={setSelectedColor}
          />
        </BottomSheet>
      </div>

    </div>
  );
};

export default Profile;

  //   <OnboardingLayout
  //     step={1}
  //     title="반가워요!"
  //     subtitle="프로필을 설정해주세요."
  //     footer={
  //       <Button
  //         className={isValid ? 'bg-black' : 'bg-[#BDBDBD]'}
  //         disabled={!isValid}
  //       >
  //         다음
  //       </Button>
  //     }
  //   >
  //     <div className="flex flex-col items-center">
  //       <div className="w-[100px] h-[100px] relative mb-10">
  //         <div className="w-full h-full bg-[#DFD8D8] rounded-full flex items-center justify-center p-[18.33px] overflow-hidden">
  //           <img src={img_profile} alt="profile" />
  //         </div>
  //         <button className="absolute bottom-[3px] right-[-4px] w-[30px] h-[30px] bg-[#757575] rounded-full flex items-center justify-center">
  //           <img src={ic_edit} alt="Edit" className="w-[18px] h-[18px]" />
  //         </button>
  //       </div>

  //       <div className="w-full gap-[6px]">
  //         <label className="block text-[#9E9E9E] font-medium text-xs leading-[16.8px] tracking-[-0.3px]">
  //           닉네임
  //         </label>
  //         <input
  //           type="text"
  //           value={nickname}
  //           onChange={(e) => setNickname(e.target.value)}
  //           placeholder="최소 2자~최대 10자로 적어주세요"
  //           className="w-full h-[48px] rounded-lg border border-[#E0E0E0] px-3 py-[14px] text-sm"
  //         />
  //       </div>
  //     </div>
  //   </OnboardingLayout>
  // );