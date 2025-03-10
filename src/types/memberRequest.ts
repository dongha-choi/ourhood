export interface Member {
  userId: number;
  nickname: string;
}

export interface ReceivedJoinRequest {
  joinRequestId: number;
  nickname: string;
  createdAt: string;
}
export interface SentJoinRequest {
  joinRequestId: number;
  roomName: string;
  createdAt: string;
}

export type RequestAction = 'accept' | 'reject';

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

export type RequestType = 'join-request' | 'invitation';
