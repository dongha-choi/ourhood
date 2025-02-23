import { ReceivedJoinRequest, RequestAction } from '../types/memberRequest';
import { SendJoinRequestRequest } from '../types/apis/request';
import authApiClient from './clients/authApiClient';

export const sendJoinRequest = async (
  data: SendJoinRequestRequest
): Promise<number> => {
  const res = await authApiClient.post('/join-requests', data);
  return res.data.result.joinRequestId;
};

export const fetchReceivedJoinRequests = async (
  roomId: number
): Promise<ReceivedJoinRequest[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/join-requests`);
  return res.data.result.joinList;
};

export const processJoinRequest = async (
  joinRequestId: number,
  action: RequestAction
) => {
  await authApiClient.post(`/join-requests/${joinRequestId}`, { action });
};

export const cancelSentJoinRequest = async (joinRequestId: number) => {
  await authApiClient.delete(`/join-requests/${joinRequestId}`);
};
