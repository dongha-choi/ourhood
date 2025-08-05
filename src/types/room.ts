export interface UserContext {
  isMember: boolean;
  isHost: boolean;
  sentJoinRequestId?: number | null;
}
export interface RoomMetadata {
  roomId: number;
  hostName: string;
  createdAt: string;
}
export interface RoomDetail {
  roomName: string;
  roomDescription?: string;
  thumbnailUrl: string | null;
}
export interface RoomInfo {
  userContext: UserContext;
  roomMetadata: RoomMetadata;
  roomDetail: RoomDetail;
  numOfNewJoinRequests?: number;
}
export interface RoomCardInfo {
  roomMetadata: RoomMetadata;
  roomDetail: RoomDetail;
}

export type RoomView = 'moments' | 'members';
