import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface SignupResponse {
  userId: string;
  token: string;
}

export const signupApi = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  try {
    const res = await axios.post(`${apiUrl}/api/signup`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Sign-up failed');
    }
    throw new Error('Sign-up failed: unknown error');
  }
};
