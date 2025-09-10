export interface SentInvitation {
  invitationId: number;
  nickname: string;
  createdAt: string;
}

export interface ReceivedInvitation {
  invitationId: number;
  roomName: string;
  hostName: string;
  createdAt: string;
}

export type InvitationAction = 'accept' | 'reject' | 'cancel';
