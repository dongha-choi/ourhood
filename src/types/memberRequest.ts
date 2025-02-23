export interface Member {
  userId: number;
  nickname: string;
}

export interface ReceivedJoinRequest {
  // joinRequestId: number;
  joinId: number;
  nickname: string;
  createdAt: string;
}

export type RequestAction = 'accept' | 'reject';

export interface SentInvitation {
  invitationId: number;
  nickname: string;
  createdAt: string;
}

export interface InvitationInfo {
  invitationId: number;
  roomId: number;
  roomName: string;
  hostName: string;
  createdAt: string;
}

export type RequestType = 'join-request' | 'invitation';
