import api from './axiosConfig';
interface UserData {
  nickname: string;
  selectedCharacter: string;
  selectedColor: string;
  job: string;
  personalHistory: string;
  corporateForm: string;
  myStatus: string[];
  boardKeywords: string[];
  profileImage: File;
}
export const validateNickname = async (nickname: string) => {//닉네임 중복
    try {
      const response = await api.get(`/api/v1/user/validate-nickname/${nickname}`);
      return response.data;
    } catch (error) {
      console.error('Error adding new order:', error);
      throw error;
    }
  };

  export const handleSignUp = async (allData: UserData) => {//회원가입
    // FormData 생성
    const formData = new FormData();
    
    // JSON 데이터를 추가
    formData.append('signInUserRequest', JSON.stringify(allData));
    
    // 프로필 이미지가 있다면 추가
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
  
    try {
      const response = await fetch('/api/v1/user', {
        method: 'POST',
        body: formData
        // Content-Type은 자동으로 설정되므로 별도 설정 불필요
      });
      
      const result = await response.json();
      // 응답 처리
    } catch (error) {
      console.error('Error:', error);
    }
  };