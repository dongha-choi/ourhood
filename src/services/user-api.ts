import axios from 'axios';
import { SignUpData } from '../types/auth';

const apiUrl = import.meta.env.VITE_API_URL;

export const signUp = async ({ nickname, email, password }: SignUpData) => {
  try {
    const res = await axios.post(`${apiUrl}/signup`, {
      nickname,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Signup failed!');
  }
};
