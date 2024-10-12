import { Member } from './member';
import { Moment } from './moment';

export interface RoomCardInfo {
  roomId: number;
  roomName: string;
  hostName: string;
  numOfMembers: number;
  createdAt: string;
  thumbnail: string | null;
}

export interface RoomData {
  roomName: string;
  roomDescription: string;
  thumbnail: File | null;
}

export interface RoomDetail {
  members: Member[];
  moments: Moment[];
  numOfNewJoinRequests: number | null;
  invitedUsers: string[];
}

export interface RoomInfo {
  isMember: boolean;
  roomId: string;
  roomName: string;
  roomDescription: string;
  thumbnail: string;
  userId: number;
  hostName: string;
  roomDetail?: RoomDetail;
  isJoinRequestSent?: boolean;
  createdAt: string;
}

export type RoomView = 'moments' | 'members';
