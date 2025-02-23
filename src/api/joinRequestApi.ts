import { JoinList, RequestAction } from '../types/memberRequest';
import { SendJoinRequestRequest } from '../types/apis/request';
import authApiClient from './clients/authApiClient';

export const sendJoinRequest = async (
  data: SendJoinRequestRequest
): Promise<number> => {
  const res = await authApiClient.post('/join-requests', data);
  return res.data.result.joinRequestId;
};
export const cancelSentJoinRequest = async () => {
  await authApiClient.delete('/join-requests');
};
export const fetchJoinRequests = async (roomId: number): Promise<JoinList> => {
  const res = await authApiClient.get(`/rooms/${roomId}/join-requests`);
  return res.data.result.joinList;
};

export const processJoinRequest = async (
  joinId: number,
  action: RequestAction
) => {
  await authApiClient.post(`/join-requests/${joinId}`, { action });
};
