import { RoomInfoResponse } from '../api/dto';

export type RoomId = number;

export interface Moment {
  momentId: number;
  momentImageUrl: string;
}

export interface Member {
  userId: number;
  nickname: string;
}

export type RoomInfo = RoomInfoResponse;
