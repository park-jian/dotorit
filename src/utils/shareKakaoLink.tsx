// shareKakao.ts 또는 shareKakao.tsx

// Kakao SDK 타입 정의
interface KakaoShare {
  sendDefault: (options: KakaoShareOptions) => void;
}

interface KakaoInstance {
  init: (apiKey: string) => void;
  isInitialized: () => boolean;
  Share: KakaoShare;
}

interface KakaoShareOptions {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons: Array<{
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }>;
}

// window.Kakao 타입 선언
declare global {
  interface Window {
    Kakao: KakaoInstance;
  }
}

interface ShareKakaoProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

export const shareKakao = ({
  title,
  description,
  imageUrl,
  linkUrl,
}: ShareKakaoProps): void => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    
    if (!kakao.isInitialized()) {
      const key = import.meta.env.VITE_KAKAO_API_KEY;
        console.log('Kakao key:', key);
      kakao.init(key);
    }

    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: linkUrl,
          webUrl: linkUrl,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: linkUrl,
            webUrl: linkUrl,
          },
        },
      ],
    });
  }
};