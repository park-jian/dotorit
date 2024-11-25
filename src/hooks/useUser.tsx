import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import api, { setAuthToken } from '../api/axiosConfig';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// 로그인 훅
export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  
    return useMutation({
      mutationFn: async ({ email, password }: { email: string; password: string }) => {
        const response = await api.post('/open-api/v1/users/login', 
          { email, password },
          { withCredentials: true }
        );
        
        if (response.data.result.result_code === 200) {
          const { access_token } = response.data.body;
          setAuthToken(access_token);
          
          // 사용자 정보 가져오기
          const userResponse = await api.get('/api/v1/users/me');
          console.log("hi:", userResponse.data.body)
          return userResponse.data.body;
        }
        
        throw new Error(response.data.result.result_message);
      },
      onSuccess: (data) => {
        // auth와 user 모두 업데이트
        queryClient.setQueryData(['auth'], { access_token: api.defaults.headers.common['Authorization'] });
        queryClient.setQueryData(['user'], data);
        navigate('/');
      },
    });
};

// 소셜 회원가입 훅
export const useSignup = (social) => {
    const navigate = useNavigate();
  
    return useMutation({
        mutationFn: async (social) => {
            const response = await api.post(`/oauth2/authorization/${social}`);
            
            if (response.data.result.result_code === 201) {
                //소셜 로그인 성공시 받은 데이터를 가지고 추가 정보 페이지로 이동
                return response.data.body;
            }
            throw new Error(response.data.result.result_message);
        },
        onSuccess: (data) => {
            navigate('/additional-info', {state: data});
          },
    });
};
// 추가 정보와 함께 최종 회원가입 hook
export const useSocialAdditionalSignup = () => {
    const login = useLogin();
    
    return useMutation({
        mutationFn: async ({ socialData, additionalInfo }: {
            socialData: any;  // 소셜 로그인 response data
            additionalInfo: {
                nickname?: string;//필수값과 선택값 구분해서 수정하기
                job?: string;
                personalHistory?: string;
                corporateForm?: string;
                myStatus?: string[];
                simpleIntroduce?: string;
                boardKeywords?: string[];
                // 기타 추가 정보들...
            }
        }) => {
            // 최종 회원가입 API 호출
            const response = await api.post('/api/v1/user', {
                ...socialData,      // 소셜 로그인에서 받은 정보
                ...additionalInfo   // 사용자가 입력한 추가 정보
            });
            
            if (response.data.result.result_code === 201) {
                // 회원가입 성공 후 자동 로그인
                await login.mutateAsync({ 
                    email: response.data.body.email,
                    password: response.data.body.password 
                });
                return response.data.body;
            }
            throw new Error(response.data.result.result_message);
        }
   
// 로그아웃 훅

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  
    return useMutation({
      mutationFn: async () => {
        await api.post('/api/v1/users/logout', {}, { withCredentials: true });
      },
      onSuccess: () => {
        setAuthToken(null);
        // 모든 쿼리 초기화
        queryClient.clear();
        navigate('/');
      },
    });
  };
  
  // 인증 상태 확인 훅
  export const useAuth = () => {
    const queryClient = useQueryClient();
  
    return useQuery({
      queryKey: ['auth'],
      queryFn: async () => {
        try {
          // 토큰이 없으면 null 반환
          if (!api.defaults.headers.common['Authorization']) {
            return null;
          }
  
          const response = await api.post('/api/v1/token/reissue', null, {
            withCredentials: true,
          });
          
          if (response.data.body?.access_token) {
            setAuthToken(response.data.body.access_token);
            
            // 토큰 갱신 성공 시 사용자 정보도 함께 갱신
            const userResponse = await api.get('/api/v1/users/me');
            const userData = userResponse.data.body;
            queryClient.setQueryData(['user'], userData);
            
            return response.data.body;
          }
          return null;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            return null;
          }
          throw error;
        }
      },
      retry: false,
      staleTime: 5 * 60 * 1000, // 5분
    });
  };
// useUser hook 수정
export const useUser = () => {
    return useQuery<UserInfo | null>({
      queryKey: ['user'],
      queryFn: async () => {
        try {
          if (!api.defaults.headers.common['Authorization']) {
            return null;
          }
          const response = await api.get('/api/v1/users/me');
          return response.data.body;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            return null;
          }
          throw error;
        }
      },
      staleTime: Infinity,
      retry: false,
    });
  };

  //탈퇴 훅
  export const useSecession = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  
    return useMutation({
      mutationFn: async () => {
        const response = await api.delete('/api/v1/users');
        if (response.data.result.result_code !== 200) {
          throw new Error(response.data.result.result_message);
        }
        return response.data.result;
      },
      onSuccess: () => {
        // 로그아웃과 동일한 처리
        setAuthToken(null);
        // 모든 쿼리 초기화
        queryClient.clear();
        // 홈으로 이동
        navigate('/');
      },
      onError: (error) => {
        if (error instanceof Error) {
          console.error('회원탈퇴 실패:', error.message);
        }
      }
    });
  };