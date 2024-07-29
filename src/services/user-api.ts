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
    console.log('trying signup request...');
    const res = await axios.post(`${apiUrl}/api/signup`, data);
    console.log('signup response received!');
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
