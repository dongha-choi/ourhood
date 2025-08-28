export interface JoinRoomState {
  isPending: boolean;
  pendingInvitationId?: number;
  sentJoinRequestId?: number;
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

export type RequestAction = 'accept' | 'reject' | 'cancel';
