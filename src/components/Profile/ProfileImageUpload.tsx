import React, { useState, useRef } from 'react';
import CameraCapture from './CameraCapture';

interface ProfileImageUploadProps {
  selectedCharacter: string;
  selectedColor: string;
  onImageUpload: (file: File) => void;
}
export const createCharacterImageFile = async (
    characterSrc: string,
    backgroundColor: string
  ): Promise<File> => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Canvas context not supported');
    }
  
    // 배경색 그리기
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 캐릭터 이미지 그리기
    const img = new Image();
    img.src = `${characterSrc}.png`;
    
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Canvas를 Blob으로 변환
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => {
        if (b) resolve(b);
      }, 'image/png');
    });
    
    return new File([blob], 'profile.png', { type: 'image/png' });
  };
const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  selectedCharacter,
  selectedColor,
  onImageUpload
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };
  
  const handleCameraCapture = (file: File) => {
    setUploadedImage(URL.createObjectURL(file));
    onImageUpload(file);
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
      
      {uploadedImage ? (
        <img 
          src={uploadedImage} 
          alt="Uploaded profile" 
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
      ) : (
        <div 
          className="w-[100px] h-[100px] rounded-full flex items-center justify-center"
          style={{ backgroundColor: selectedColor }}
        >
          <img src={`/${selectedCharacter}.png`} alt="Character" />
        </div>
      )}
      
      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          파일 업로드
        </button>
        <button 
          onClick={() => setShowCamera(true)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          사진 촬영
        </button>
      </div>

      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
};

export default ProfileImageUpload;