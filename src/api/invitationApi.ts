import { SendInvitationRequest } from '../types/apis/request';
import authApiClient from './clients/authApiClient';

export const sendInvitation = async (data: SendInvitationRequest) => {
  await authApiClient.post('/invitations', data);
};
