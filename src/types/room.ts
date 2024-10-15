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
  roomId?: number | null;
  roomName?: string;
  roomDescription?: string;
  thumbnail?: File | null;
}

export interface RoomDetail {
  members: Member[];
  moments: Moment[];
  numOfNewJoinRequests: number | null;
  invitedUsers: string[];
}

export interface RoomInfo {
  isMember: boolean;
  roomId: number;
  roomName: string;
  roomDescription: string;
  thumbnail: string | null;
  userId: number;
  hostName: string;
  roomDetail?: RoomDetail;
  isJoinRequestSent?: boolean;
  createdAt: string;
}

export type RoomView = 'moments' | 'members';
