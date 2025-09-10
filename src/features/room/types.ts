export interface RoomInfo {
  userContext: {
    isMember: boolean;
    isHost: boolean;
    sentJoinRequestId?: number | null;
  };
  roomMetadata: {
    roomId: number;
    hostName: string;
    createdAt: string;
  };
  roomDetail: {
    roomName: string;
    roomDescription?: string;
    thumbnailUrl: string | null;
  };
  numOfNewJoinRequests?: number;
}
export interface RoomMember {
  userId: number;
  nickname: string;
}
export interface RoomCardInfo {
  roomMetadata: {
    roomId: number;
    hostName: string;
    createdAt: string;
    numOfMembers: number;
  };
  roomDetail: {
    roomName: string;
    thumbnailUrl: string;
  };
}
export type RoomView = 'moments' | 'members';
