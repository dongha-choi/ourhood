import { SendInvitationRequest } from '../types/apis/request';
import { RequestAction } from '../types/request';
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
