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
    const res = await axios.post(`${apiUrl}/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Signup failed!');
  }
};

// export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
//   try {
//     const res = await axios.post(`${apiUrl}/login`, data);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw new Error('Login failed!');
//   }
// };
