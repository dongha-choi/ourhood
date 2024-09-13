import { Moment } from './moments';

export interface RoomInfo {
  roomId: number;
  roomName: string;
  hostName: string;
  numOfMembers: number;
  createdAt: string;
  thumbnail: string;
}

export interface RoomDetail {
  moments: Array<Moment>;
  members: Array<string>;
  numOfNewJoinRequests: number | null;
}

export type RoomView = 'moments' | 'members';
