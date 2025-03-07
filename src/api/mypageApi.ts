import { MypageInfo } from '../types/mypage';
import authApiClient from './clients/authApiClient';

export const fetchMypageInfo = async (userId: number): Promise<MypageInfo> => {
  const res = await authApiClient.get(`/users/${userId}`);
  return res.data.result;
};
