import { Member, Moment } from '../domain/models';

// API Req Params/Payload, Res Body

// GET
export interface RoomInfoResponse {
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
export interface RoomMomentsResponse {
  moments: Moment[];
}
export interface RoomMembersResponse {
  members: Member[];
}

// POST
export interface CreateRoomRequest {
  roomName: string;
  roomDescription?: string;
  thumbnailImageKey?: string;
}
export interface CreateRoomResponse {
  roomId: number;
}

// PUT
export interface EditRoomRequest {
  roomName: string;
  roomDescription: string;
  isImageRemoved?: boolean; //optional
  newThumbnailImageKey?: string; //optional
}
