import axios from 'axios';
import { apiAuth } from './axios';

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
    const res = await apiAuth.post(`/signup`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Sign-up failed');
    }
    throw new Error('Sign-up failed: unknown error');
  }
};
