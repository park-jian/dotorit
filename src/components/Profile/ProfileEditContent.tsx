// ProfileEditContent.tsx
import React, { useState } from 'react';
import img_profile from '/img_profile.png';
import { CharacterContent } from './CharacterContent';
import { PhotoContent } from './PhotoContent';

interface ProfileEditContentProps {
  onCharacterSelect: (character: string) => void;
  onColorSelect: (color: string) => void;
  selectedCharacter?: string;
  selectedColor?: string;
}

type TabType = 'character' | 'photo';

export const ProfileEditContent: React.FC<ProfileEditContentProps> = ({
  onCharacterSelect,
  onColorSelect,
  selectedCharacter,
  selectedColor
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('character');
  const [selectedPhotoURL, setSelectedPhotoURL] = useState<string | null>(null);
  const handleFileSelect = (file: File) => {
    // 카메라로 찍었든, 앨범에서 선택했든 동일하게 처리
    console.log('Selected file:', file.name);
    const imageUrl = URL.createObjectURL(file);
    setSelectedPhotoURL(imageUrl);
    console.log('Selected file:', file.name);
  };
 // 프로필 이미지를 결정하는 렌더링 로직
 const renderProfileImage = () => {
  if (activeTab === 'photo' && selectedPhotoURL) {
    // 사진 탭이 활성화되어 있고 선택된 사진이 있는 경우
    return (
      <img
        src={selectedPhotoURL}
        alt="Selected Profile"
        className="w-[80px] h-[80px] rounded-full object-cover"
      />
    );
  } else if (selectedCharacter) {
    // 캐릭터가 선택된 경우
    return (
      <img
        src={`${selectedCharacter}.png`}
        alt="Profile"
        className="w-[80px] h-[80px]"
      />
    );
  } else {
    // 둘 다 없는 경우 기본 이미지
    return (
      <img
        src={img_profile}
        alt="Default Profile"
        className="w-[80px] h-[80px]"
      />
    );
  }
};
  return (
    <div className="">
      <header className='border-b-2 border-[#EEEEEE] mb-8'>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">프로필 사진 설정</h2>
          <div className="flex bg-[#EEEEEE] rounded-[10px] p-[4px] gap-[2px]">
            <button 
              className={`w-[48px] h-[26px] rounded-[8px] px-[6px] py-[3px] gap-[10px] flex items-center justify-center ${
                activeTab === 'character' ? 'bg-white' : ''
              }`}
              onClick={() => setActiveTab('character')}
            >
              <span className='font-medium text-xs leading-[19.6px] tracking-[-0.025em] text-[#616161]'>캐릭터</span>
            </button>
            <button 
              className={`w-[48px] h-[26px] rounded-[8px] px-[6px] py-[3px] gap-[10px] flex items-center justify-center ${
                activeTab === 'photo' ? 'bg-white' : ''
              }`}
              onClick={() => setActiveTab('photo')}
            >
              <span className='font-medium text-xs leading-[19.6px] tracking-[-0.025em] text-[#616161]'>내사진</span>
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-[120px] h-[120px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: selectedColor || '#DFD8D8' }} 
          >
            {renderProfileImage()}
          </div>
        </div>
      </header>

      {activeTab === 'character' ? (
        <CharacterContent 
          onCharacterSelect={onCharacterSelect}
          onColorSelect={onColorSelect}
          selectedCharacter={selectedCharacter}
          selectedColor={selectedColor}
        />
      ) : (
        <PhotoContent
          onFileSelect={handleFileSelect}
          maxFileSize={10} // 10MB로 제한
          acceptedFileTypes={['image/jpeg', 'image/png', 'image/heic']}
        />
      )}
    </div>
  );
};

export default ProfileEditContent;