import { ReceivedJoinRequest, RequestAction } from '../types/memberRequest';
import { SendJoinRequestRequest } from '../types/apis/request';
import authApiClient from './clients/authApiClient';

export const sendJoinRequest = async (data: SendJoinRequestRequest) => {
  try {
    const res = await authApiClient.post('/join-requests', data);
    if (res.data.code === 20001) {
      return {
        isPending: true,
        pendingInvitationId: res.data.result.invitationId,
      };
    } else {
      return {
        isPending: false,
        sentJoinRequestId: res.data.result.joinRequestId,
      };
    }
  } catch (error) {
    throw new Error('Network error. Please try again.');
  }
};

export const fetchReceivedJoinRequests = async (
  roomId: number
): Promise<ReceivedJoinRequest[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/join-requests`);
  return res.data.result.joinRequestList;
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
