export interface Member {
  userId: number;
  nickname: string;
}

export type JoinList = JoinRequest[];

export interface JoinRequest {
  joinId: number;
  nickname: string;
}

export type RequestAction = 'accept' | 'reject';

export interface InvitationInfo {
  invitationId: number;
  roomId: number;
  roomName: string;
  hostName: string;
  createdAt: string;
}
