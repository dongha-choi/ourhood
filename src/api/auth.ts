import authApiClient from './clients/authApiClient';
import { SignupRequest, LoginRequest, LoginResponse } from '../types/apis/auth';
import { removeAccessToken, setAccessToken } from '../utils/accessTokenManager';

export const signup = async (data: SignupRequest) => {
  await authApiClient.post('/signup', data);
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await authApiClient.post('/login', data);
  setAccessToken(res.headers.accesstoken);
  return res.data;
};

export const logout = async () => {
  removeAccessToken();
  await authApiClient.post('/logout');
};

export const reissue = async (): Promise<string> => {
  const res = await authApiClient.post('/reissue');
  const newAccessToken = res.headers.accessToken;
  setAccessToken(newAccessToken);
  return newAccessToken;
};
