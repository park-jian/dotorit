// LoginCallback.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import tokenUtils from '../../utils/tokenUtils';
const LoginCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 쿼리 파라미터 추출
    const isNewUser = searchParams.get('isNewUser') === 'true';
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      // 토큰 저장
     // localStorage.setItem('accessToken', accessToken);
     tokenUtils.setTokens(accessToken);
      // isNewUser 값에 따라 다른 페이지로 리다이렉트
      if (isNewUser) {
        navigate('/profile'); // 신규 사용자는 온보딩 페이지로
      } else {
        navigate('/home'); // 기존 사용자는 메인 페이지로
      }
    } else {
      // 토큰이 없는 경우 에러 처리
      console.error('로그인 처리 중 오류가 발생했습니다.');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div>
      로그인 처리중...
    </div>
  );
};

export default LoginCallback;