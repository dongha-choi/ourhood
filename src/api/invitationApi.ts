import { SendInvitationRequest } from '../types/apis/request';
import { RequestAction, SentInvitation } from '../types/memberRequest';
import authApiClient from './clients/authApiClient';

export const sendInvitation = async (data: SendInvitationRequest) => {
  await authApiClient.post('/invitations', data);
};

export const fetchSentInvitations = async (
  roomId: number
): Promise<SentInvitation[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/invitations`);
  return res.data.result.invitaionList;
};

export const processInvitation = async (
  invitationId: number,
  action: RequestAction
) => {
  await authApiClient.post(`/invitations/${invitationId}`, { action });
};

export const cancelSentInvitation = async (invitationId: number) => {
  await authApiClient.delete(`/invitations/${invitationId}`);
};
