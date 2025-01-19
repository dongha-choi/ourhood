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
  thumbnail?: File | string | null;
}
export interface RoomPrivate {
  members: Member[];
  moments: Moment[];
  numOfJoinRequests: number | null;
}
export interface RoomInfo {
  userContext: UserContext;
  roomMetadata: RoomMetadata;
  roomDetail: RoomDetail;
  roomPrivate: RoomPrivate;
}
export interface RoomCardInfo {
  roomMetadata: RoomMetadata;
  roomDetail: RoomDetail;
}

export type RoomView = 'moments' | 'members';
