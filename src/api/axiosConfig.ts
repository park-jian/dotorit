import axios from 'axios';

const api = axios.create({
  baseURL: 'http://15.165.4.143:8080',
  withCredentials: true, // 인증 정보 포함시 필요
  headers: {
    'Content-Type': 'application/json',
  }
});

// 인터셉터 추가로 토큰 설정 확인
api.interceptors.request.use(
  (config) => {
    console.log('Request Headers:', config.headers);  // 디버깅용
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// let authToken: string | null = null;
// export const setAuthToken = (token: string | null) => {
//   authToken = token;
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };
// export const getAuthToken = (): string | null => {
//   return authToken;
// };
export default api;