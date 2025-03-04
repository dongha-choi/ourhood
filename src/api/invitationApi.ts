import { AxiosError } from 'axios';
import { SendInvitationRequest } from '../types/apis/request';
import { RequestAction, SentInvitation } from '../types/memberRequest';
import authApiClient from './clients/authApiClient';

export const sendInvitation = async (data: SendInvitationRequest) => {
  try {
    const res = await authApiClient.post('/invitations', data);
    if (res.data.code === 20002) {
      return res.data.result.joinRequestId;
    } else {
      return null;
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorCode = error.response.data.code;
      switch (errorCode) {
        case 40401:
          throw new Error(`${data.nickname} does not exist!`);
        case 40904:
          throw new Error(`${data.nickname} is already invited!`);
        case 40905:
          throw new Error(`${data.nickname} is already in your room!`);
        default:
          throw new Error('An unknown error occurred.');
      }
    } else {
      throw new Error('Network error. Please try again.');
    }
  }
};

export const fetchSentInvitations = async (
  roomId: number
): Promise<SentInvitation[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/invitations`);
  return res.data.result.invitationList;
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
