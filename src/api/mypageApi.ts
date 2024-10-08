import authApiClient from './clients/authApiClient';

export const fetchMypageInfo = async (userId: number) => {
  const res = await authApiClient.get(`/users/${userId}`);
  return res.data.result;
};
