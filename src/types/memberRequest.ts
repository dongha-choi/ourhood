export interface Member {
  userId: number;
  nickname: string;
}

export interface JoinRequestItem {
  joinRequestId: number;
  nickname: string;
  createdAt: string;
}
export type JoinList = JoinRequestItem[];

export type RequestAction = 'accept' | 'reject';

export interface SentInvitation {
  invitationId: number;
  nickname: string;
  createdAt: string;
}
export type SentInvitationList = SentInvitation[];

export interface InvitationInfo {
  invitationId: number;
  roomId: number;
  roomName: string;
  hostName: string;
  createdAt: string;
}

export type RequestType = 'joinRequest' | 'invitation';
