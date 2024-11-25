import React from "react";
import { useAuth } from '../authContext';
import kakaoLoginImage from '@public/kakao_login_large_narrow.png';
import naverLoginImage from '@public/btnG_large.png';

type SocialLoginProps = {
  provider: "kakao" | "naver";
};

const SocialLogin: React.FC<SocialLoginProps> = ({ provider }) => {
  const { socialLoginOrRegister } = useAuth();

  return (
    <button onClick={() => socialLoginOrRegister(provider)}>
         <img
         width="300"
         height="60"
         src={provider === "kakao" ? kakaoLoginImage : naverLoginImage}
         alt={`${provider} 로그인`}
       />
    </button>
  );
};

export default SocialLogin;
