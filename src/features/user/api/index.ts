import authApiClient from '../../../apis/clients/authApiClient';
import { MypageInfoResponse } from './dto';

export const fetchMypageInfo = async (): Promise<MypageInfoResponse> => {
  const res = await authApiClient.get(`/users/me`);
  return res.data.result;
};
