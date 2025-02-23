import { SendInvitationRequest } from '../types/apis/request';
import { SentInvitationList, RequestAction } from '../types/memberRequest';
import authApiClient from './clients/authApiClient';

export const sendInvitation = async (data: SendInvitationRequest) => {
  await authApiClient.post('/invitations', data);
};

export const processInvitation = async (
  invitationId: number,
  action: RequestAction
) => {
  await authApiClient.post(`/invitations/${invitationId}`, { action });
};

export const fetchInvitations = async (
  roomId: number
): Promise<SentInvitationList> => {
  const res = await authApiClient.get(`/rooms/${roomId}/invitations`);
  return res.data.result.invitationList;
};
