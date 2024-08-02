import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  token: string;
  nickname: string;
}

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const res = await axios.post(`${apiUrl}/api/login`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Login failed: unknown error');
  }
};
