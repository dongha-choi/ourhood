import { SentInvitation } from '../types';

export interface SendInvitationRequest {
  roomId: number;
  nickname: string;
}

export interface SentInvitationsResponse {
  invitationlist: SentInvitation[];
}
