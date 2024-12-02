import api from '../api/axiosConfig';

export const tokenUtils = {
  setTokens: (accessToken: string) => {
    if (!accessToken) return;
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    console.log('Token set:', api.defaults.headers.common['Authorization']);
  },

  clearTokens: () => {
    delete api.defaults.headers.common['Authorization'];
  },

// //   getAccessToken: () => Cookies.get('access_token'),
// //   getRefreshToken: () => Cookies.get('refreshToken')
  // JWT 토큰에서 만료 시간을 추출하는 함수
  // getTokenExpirationTime: (token: string): number => {
  //   try {
  //     const base64Url = token.split('.')[1];
  //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //     const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
  //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //     }).join(''));
  //     return JSON.parse(jsonPayload).exp * 1000; // milliseconds로 변환
  //   } catch (error) {
  //     console.log(error);
  //     return 0;
  //   }
  // },

  // 토큰이 5분 이내에 만료되는지 확인하는 함수
  // isTokenExpiringSoon: (token: string): boolean => {
  //   if (!token) return true;
  //   const expirationTime = tokenUtils.getTokenExpirationTime(token);
  //   const currentTime = Date.now();
  //   const fiveMinutes = 5 * 60 * 1000; // 5분을 밀리초로 변환
  //   console.log("isTokenExpiringSoon_currentTime:",  new Date(Date.now()).toLocaleTimeString());
  //   const timeLeft = expirationTime - currentTime; // 밀리초 단위
  //   const minutes = Math.floor(timeLeft / (1000 * 60));
  //   const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  //   console.log(`남은 시간: ${minutes}분 ${seconds}초`);
  //   return expirationTime - currentTime <= fiveMinutes;
  // }
};

export default tokenUtils;