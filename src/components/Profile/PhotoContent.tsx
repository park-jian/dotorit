// PhotoContent.tsx
import React, { useRef,useState } from 'react';
import ic_camera from '/ic_camera.png';
import ic_picture from '/ic_picture.png';

// 필요한 경우 props 인터페이스 추가
interface PhotoContentProps {
  onFileSelect?: (file: File) => void;
  maxFileSize?: number; // MB 단위
  acceptedFileTypes?: string[];
}

export const PhotoContent: React.FC<PhotoContentProps> = ({
  onFileSelect,
  maxFileSize = 5, // 기본 5MB
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/heic']
}) => {
    // 파일 선택 처리 함수
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>('');
  
    const validateFile = (file: File): boolean => {
      setError('');
      
      // 파일 타입 검사
      if (!acceptedFileTypes.includes(file.type.toLowerCase())) {
        setError('지원하지 않는 파일 형식입니다.');
        return false;
      }
      
      // 파일 크기 검사
      if (file.size > maxFileSize * 1024 * 1024) {
        setError(`파일 크기는 ${maxFileSize}MB 이하여야 합니다.`);
        return false;
      }
      
      return true;
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (validateFile(file)) {
        onFileSelect?.(file);
      }
  
      // 입력 초기화
      event.target.value = '';
    };
  
    const handleCameraClick = () => {
      // 모바일에서 카메라 직접 열기
      cameraInputRef.current?.click();
    };
  
    const handleAlbumClick = () => {
      fileInputRef.current?.click();
    };
  

  return (
<div className="w-full max-w-md mx-auto">
    <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      
      {/* 갤러리 선택용 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes.join(',')}
        className="hidden"
        onChange={handleFileChange}
      />
    <div className="w-full h-[48px] flex items-center justify-center gap-4">
      {/* 카메라 캡처용 input */}
      
      <button 
        className="w-[161.5px] h-[48px] rounded-lg px-4 py-3 gap-1 bg-[#F5F5F5] flex items-center justify-center hover:bg-[#EEEEEE] transition-colors"
        onClick={handleCameraClick }
      >
        <div className='w-[24px] h-[24px]'><img src={ic_camera}/> </div>
        <span className="font-bold text-[14px] leading-[18.2px] tracking-[-0.025em] text-[#616161]">촬영하기</span>
      </button>
      <button 
        className="w-[161.5px] h-[48px] rounded-lg px-4 py-3 gap-1 bg-[#F5F5F5] flex items-center justify-center hover:bg-[#EEEEEE] transition-colors"
        onClick={handleAlbumClick}
      >
        <div className='w-[24px] h-[24px]'><img src={ic_picture}/> </div>
        <span className="font-bold text-[14px] leading-[18.2px] tracking-[-0.025em] text-[#616161]">앨범 선택</span>
      </button>
    </div>

    {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}
    </div>
  );
};