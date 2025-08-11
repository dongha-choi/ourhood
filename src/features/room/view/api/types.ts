import { RoomDetail, RoomMetadata, UserContext } from '../../types';

export interface CreateRoomRequest {
  roomName: string;
  roomDescription?: string;
  thumbnailImageKey?: string;
}

export interface RoomInfoResponse {
  userContext: UserContext;
  roomMetadata: RoomMetadata;
  roomDetail: RoomDetail;
  numOfNewJoinRequests?: number;
}
export interface RoomMomentsResponse {
  moments: [
    {
      momentId: number;
      momentImageUrl: string;
    }
  ];
}
export interface RoomMembersResponse {
  members: [
    {
      userId: number;
      nickname: string;
    }
  ];
}
