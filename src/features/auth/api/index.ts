import apiClient from '../../../apis/clients/apiClient';
import { OauthType } from '../types';
import { OauthLoginParams, SignupRequest } from './dto';

export const getOauthUrl = async (oauthType: OauthType): Promise<string> => {
  const res = await apiClient.get(`/auth/${oauthType}`);
  return res.data.result.url;
};

export const oauthLogin = async ({ oauthType, code }: OauthLoginParams) => {
  return await apiClient.post(`/auth/login/${oauthType}?code=${code}`);
};

export const logout = async () => {
  await apiClient.post(`/auth/logout`);
};

export const signup = async (data: SignupRequest) => {
  return await apiClient.post('/signup', data);
};
