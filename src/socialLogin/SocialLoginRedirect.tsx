import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';

type SocialProvider = 'kakao' | 'naver';

interface SocialLoginRedirectProps {
  provider: SocialProvider;
}

const SocialLoginRedirect: React.FC<SocialLoginRedirectProps> = ({ provider }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { socialLoginCallback } = useAuth();
  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      socialLoginCallback(provider, code);
    } else {
      navigate('/login');
    }
  }, [provider, location, socialLoginCallback, navigate]);

return <div>Processing {provider} login...</div>;
};

export default SocialLoginRedirect;