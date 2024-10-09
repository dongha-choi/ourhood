import { Moment } from './moment';

export interface RoomCardInfo {
  roomId: number;
  roomName: string;
  hostName: string;
  numOfMembers: number;
  createdAt: string;
  thumbnail: string | null;
}
export interface RoomDetail {
  members: string[];
  moments: Moment[];
  numOfNewJoinRequests: number | null;
  invitedUsers: string[];
}

export interface RoomInfo {
  isMember: boolean;
  thumbnail: string;
  roomId: string;
  roomName: string;
  roomDescription: string;
  hostName: string;
  roomDetail?: RoomDetail;
  isJoinRequestSent?: boolean;
  createdAt: string;
}

export type RoomView = 'moments' | 'members';
