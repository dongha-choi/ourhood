export interface SendJoinRequestRequest {
  userId: number;
  roomId: number;
}

export interface SendInvitationRequest {
  roomId: number;
  nickname: string;
}
