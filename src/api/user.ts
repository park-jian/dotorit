import api from './axiosConfig';

export const validateNickname = async (nickname: string) => {
    try {
      const response = await api.get(`/api/v1/user/validate-nickname/${nickname}`);
      debugger;
      return response.data;
    } catch (error) {
      console.error('Error adding new order:', error);
      throw error;
    }
  };