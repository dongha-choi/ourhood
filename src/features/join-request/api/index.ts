import authApiClient from '../../../apis/clients/authApiClient';
import {
  JoinRequestAction,
  JoinRoomState,
  ReceivedJoinRequest,
} from '../types';
import { SendJoinRequestRequest } from './dto';

export const sendJoinRequest = async (
  data: SendJoinRequestRequest
): Promise<JoinRoomState> => {
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
};
export const fetchReceivedJoinRequests = async (
  roomId: number
): Promise<ReceivedJoinRequest[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/join-requests`);
  return res.data.result.joinRequestList;
};
export const processJoinRequest = async (
  joinRequestId: number,
  action: JoinRequestAction
) => {
  await authApiClient.post(`/join-requests/${joinRequestId}/${action}`);
};
