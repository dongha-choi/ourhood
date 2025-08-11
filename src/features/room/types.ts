// api
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

//
