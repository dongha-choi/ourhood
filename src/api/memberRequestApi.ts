import {
  SentInvitation,
  JoinRequestItem,
  RequestType,
  RequestAction,
} from '../types/memberRequest';
import { camelToKebab } from '../utils/caseConverter';
import authApiClient from './clients/authApiClient';

// Room's received join-requests : member
// Room's sent invitations : member
export const fetchRoomRequests = async (
  requestType: RequestType,
  roomId: number
): Promise<JoinRequestItem[] | SentInvitation[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/${requestType}s`);
  if (requestType === 'joinRequest') {
    return res.data.result.joinList;
  } else {
    return res.data.result.invitationList;
  }
};

export const fetchSentInvitations = async (
  roomId: number
): Promise<SentInvitation[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/invitations`);
  return res.data.result.invitaionList;
};

export const processRequest = async (
  requestType: RequestType,
  requestId: number,
  action: RequestAction
) => {
  await authApiClient.post(`/${camelToKebab(requestType)}s/${requestId}`, {
    action,
  });
};

export const cancelSentRequest = async (
  requestType: RequestType,
  requestId: number
) => {
  await authApiClient.delete(`/${camelToKebab(requestType)}s/${requestId}`);
};
