import { MomentCardInfo } from '../../../moment/types';
import { RoomInfo, RoomMember } from '../../types';

// API Req Params/Payload, Res Body

// GET
export type RoomInfoResponse = RoomInfo;

export interface RoomMomentsResponse {
  moments: MomentCardInfo[];
}
export interface RoomMembersResponse {
  members: RoomMember[];
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
