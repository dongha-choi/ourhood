import { Member } from './member';
import { Moment } from './moment';

export interface UserContext {
  isMember: boolean;
  isHost?: boolean;
  isJoinRequestSent?: boolean;
}
export interface RoomMetadata {
  roomId: number;
  hostName: string;
  createdAt: string;
  numOfMembers?: number;
}
export interface RoomDetail {
  roomName: string;
  roomDescription?: string;
  thumbnail?: File | null;
}
export interface RoomPrivate {
  members: Member[];
  moments: Moment[];
  numOfJoinRequests: number | null;
}

export interface RoomCardInfo {
  roomMetaData: RoomMetadata;
  roomDetail: RoomDetail;
}

export type RoomView = 'moments' | 'members';
