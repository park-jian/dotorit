import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { socialData, provider } = location.state as { socialData: any; provider: 'kakao' | 'naver' };
  
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        socialData,
        provider,
        additionalInfo
      });
      // 등록 성공 시 로그인 처리
      // 여기서 accessToken을 설정하고 홈으로 리다이렉트
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>추가 정보 입력</h2>
      <input
        type="text"
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        placeholder="추가 정보를 입력하세요"
      />
      <button type="submit">가입 완료</button>
    </form>
  );
};

export default RegisterPage;