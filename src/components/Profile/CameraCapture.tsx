import React, { useState, useRef, useCallback } from 'react';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 카메라 시작
  const startCamera = useCallback(async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      setStream(videoStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
    } catch (error) {
      console.error('카메라 접근 에러:', error);
    }
  }, []);

  // 컴포넌트 마운트 시 카메라 시작
  React.useEffect(() => {
    startCamera();
    
    // 클린업: 카메라 스트림 정지
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  // 사진 촬영
  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // 비디오 크기에 맞춰 캔버스 설정
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // 캔버스에 현재 비디오 프레임 그리기
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // 캔버스의 이미지를 파일로 변환
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'profile-photo.png', { type: 'image/png' });
            onCapture(file);
            
            // 카메라 스트림 정지 및 모달 닫기
            if (stream) {
              stream.getTracks().forEach(track => track.stop());
            }
            onClose();
          }
        }, 'image/png');
      }
    }
  }, [stream, onCapture, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg"
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={capturePhoto}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            사진 촬영
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}