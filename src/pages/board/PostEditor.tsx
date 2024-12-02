import { useState } from 'react';
import Editor from '../../components/Editor';
import api from '../../api/axiosConfig';

const PostEditor = () => {
  const [content, setContent] = useState('');
  // 원본 파일들을 저장할 상태 추가
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      // 파일 크기 검사
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('파일 크기는 5MB를 초과할 수 없습니다.');
      }

      // 파일 타입 검사
      if (!file.type.startsWith('image/')) {
        throw new Error('이미지 파일만 업로드 가능합니다.');
      }

      // 파일 저장
      setUploadedFiles(prev => [...prev, file]);
      
      // Blob URL 생성
      const tempUrl = URL.createObjectURL(file);

      // 페이지 언로드 시 Blob URL 해제
      window.addEventListener('unload', () => {
        URL.revokeObjectURL(tempUrl);
      });

      return tempUrl;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('이미지 업로드에 실패했습니다.');
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('content', content);
      
      // 업로드된 파일들을 FormData에 추가
      uploadedFiles.forEach((file, index) => {
        formData.append(`image${index}`, file);
      });

      // 여기서 실제 서버로 전송
      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('저장 성공:', response.data);
      
      // 저장 후 Blob URL 정리
      uploadedFiles.forEach(file => {
        if (file instanceof File) {
          URL.revokeObjectURL(URL.createObjectURL(file));
        }
      });
      
      // 상태 초기화
      setUploadedFiles([]);
      setContent('');
      
    } catch (error) {
      console.error('저장 실패:', error);
    }
  };

  return (
    <div>
      <h1>게시글 작성</h1>
      <Editor
        initialData="<p>내용을 입력하세요.</p>"
        onChange={setContent}
        onImageUpload={handleImageUpload}
      />
      <button onClick={handleSave}>
        저장
      </button>
    </div>
  );
};

export default PostEditor;