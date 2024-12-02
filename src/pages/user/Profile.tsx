import React, {useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../layouts/PageLayout';
import ic_edit from '/ic_edit.png';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import { ProfileEditContent } from '../../components/Profile/ProfileEditContent';
import {validateNickname} from '../../api/user';
import CameraCapture from '../../components/Profile/CameraCapture';
import { createCharacterImageFile } from '../../components/Profile/ProfileImageUpload';
const Profile = () => {
  const [nickname, setNickname] = useState('');
  const [nicknameValidation, setNicknameValidation] = useState({
    isValid: false,
    message: '',
    isChecked: false
  });
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("img_profile");
  const [selectedColor, setSelectedColor] = useState<string>('#DFD8D8');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);  // 새로 추가
  const [showCamera, setShowCamera] = useState(false);  // 새로 추가
  const navigate = useNavigate();

  const handleValidate = useCallback(async (value: string) => {
    try {
      const result = await validateNickname(value);
      setNicknameValidation({
        isValid: result.data,
        message: result.message || '',
        isChecked: true
      });
      //  setNicknameValidation({ //test를 위해 가짜로 만들었슈 위에 주석 처리 한 것이 진짜
      //    isValid: true,
      //    message: 'success',
      //    isChecked: true
      //  });
    } catch (error) {
      console.error('Validation error:', error);
      setNicknameValidation({
        isValid: false,
        message: '닉네임 검증 중 오류가 발생했습니다.',
        isChecked: true
      });
    }
  }, []);
  // nickname 입력 처리 함수
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    // 입력값이 변경되면 체크 상태 초기화
    setNicknameValidation(prev => ({
      ...prev,
      isChecked: false
    }));
  };
  // blur 이벤트 처리 함수
  const handleNicknameBlur = useCallback(async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!nicknameValidation.isChecked && value.length >= 2) {
      await handleValidate(value);
    }
  }, [handleValidate, nicknameValidation.isChecked]);
   // 이미지 업로드 처리
   const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setIsBottomSheetOpen(false);
  };
  const isValid = nickname.length >= 2 && nickname.length <= 10 && selectedCharacter && selectedColor && nicknameValidation.isValid;
  const handleNextPage = async () => {
    let profileImage: File;
      
      if (uploadedImage) {
        // 사용자가 직접 업로드하거나 촬영한 이미지가 있는 경우
        profileImage = uploadedImage;
      } else {
        // 캐릭터와 배경색으로 이미지 생성
        profileImage = await createCharacterImageFile(
          selectedCharacter,
          selectedColor
        );
      }

      // const formData = new FormData();
      // formData.append('nickname', nickname);
      // formData.append('profileImage', profileImage);
    navigate('/job-select', {
      state: {
        nickname,
        selectedCharacter,
        selectedColor,
        profileImage
      }
    });
  };
  const handleBack = () => {
    console.log('back button clicked');  // 디버깅용
    //navigate(-1);
    navigate("/");
  };
  const CustomProfileEditContent = () => (
    <div>
      {/* <ProfileImageUpload
        selectedCharacter={selectedCharacter}
        selectedColor={selectedColor}
        onImageUpload={handleImageUpload}
      /> */}
      <ProfileEditContent
        selectedCharacter={selectedCharacter}
        selectedColor={selectedColor}
        onCharacterSelect={setSelectedCharacter}
        onColorSelect={setSelectedColor}
      />
    </div>
  );
  return (
      <PageLayout title="" 
      onBack={handleBack}
      actionButton={{
        text: '다음',
        onClick: handleNextPage,
        disabled: !isValid,
        footerClass: `w-full h-[48px] rounded-lg flex items-center justify-center ${isValid ? 'bg-[#FF6A00]' : 'bg-[#BDBDBD]'}`,
        textClass: 'text-white text-center font-medium text-sm leading-[19.6px] tracking-[-0.35px]'
      }}>

        <div className="flex justify-center w-full h-full">
            <div className="w-full relative h-full flex flex-col ">
              <div className="pt-[104px] px-[16px] text-[#212121]">
                <div>
                  <h1 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px] mb-1">반가워요!</h1>
                  <h2 className="text-[20px] font-bold leading-[28px] tracking-[-0.5px]">프로필을 설정해주세요.</h2>
                </div>
              </div>
              
              <div className="absolute top-[138px] right-4 w-[20px] h-[18px] font-bold text-[14px] leading-[18.2px] text-right tracking-tighter">
                <span className="text-black">1</span>
                <span className="text-[#BDBDBD]">/3</span>
              </div>

              <div className="w-[100px] h-[100px] mt-[88px] mx-auto">
                <div className="relative w-full h-full">
                  {uploadedImage ? (
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt="Uploaded Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full rounded-full flex items-center justify-center p-[18.33px] overflow-hidden"
                      style={{ backgroundColor: selectedColor }}
                    >
                      <img src={`${selectedCharacter}.png`} alt="Profile" />
                    </div>
                  )}
                  <button 
                    className="absolute bottom-[3px] right-[-4px] w-[30px] h-[30px] bg-[#757575] rounded-full flex items-center justify-center"
                    onClick={() => setIsBottomSheetOpen(true)}
                  >
                    <img src={ic_edit} alt="Edit" className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>

              <div className="mt-[40px] w-full h-[71px] px-[16px] gap-[6px]">
                <label className={`w-[328px] h-[17px] font-medium text-xs leading-[16.8px] tracking-[-0.3px] ${
                  !nicknameValidation.isChecked ? 'text-[#9E9E9E]' : 
                  nicknameValidation.isValid ? 'text-[#9E9E9E]' : 'text-[#FF1F00]'}`}>닉네임
                </label>
                <div className="relative">
                <input
                  value={nickname}
                  onChange={handleNicknameChange}
                  onBlur={handleNicknameBlur}
                  type="text"
                  placeholder="최소 2자~최대 10자로 적어주세요"
                  className={`w-full h-[48px] rounded-lg border px-3 py-[14px] text-sm ${
                    !nicknameValidation.isChecked ? 'border-[#E0E0E0]' : 
                    nicknameValidation.isValid ? 'border-[#E0E0E0]' : 'border-[#FF1F00]'
                  }`}
                />
                </div>
                {nicknameValidation.isValid === false && nicknameValidation.isChecked === true && (
                  <label className="font-pretendard text-xs font-normal leading-[140%] flex items-center tracking-tight text-[#FF1F00] mt-1.5">
                    {nicknameValidation.message}
                  </label>
                )}
              </div>
              <BottomSheet 
                isOpen={isBottomSheetOpen} 
                onClose={() => setIsBottomSheetOpen(false)}
              >
                <CustomProfileEditContent />
              </BottomSheet>

              {showCamera && (
                <CameraCapture
                  onCapture={handleImageUpload}
                  onClose={() => setShowCamera(false)}
                />
              )}
            </div>
        </div>
      </PageLayout>
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