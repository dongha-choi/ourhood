import { JoinList, RequestAction } from '../types/member';
import { SendJoinRequestRequest } from '../types/apis/request';
import authApiClient from './clients/authApiClient';

export const sendJoinRequest = async (data: SendJoinRequestRequest) => {
  await authApiClient.post('/join-requests', data);
};

export const fetchJoinRequests = async (roomId: number): Promise<JoinList> => {
  const res = await authApiClient.get(`/join-requests/${roomId}`);
  return res.data.result.joinList;
};

export const processJoinRequest = async (
  joinId: number,
  action: RequestAction
) => {
  await authApiClient.post(`/join-requests/${joinId}`, { action });
};
