import { RoomCardInfo, RoomInfo, RoomData } from '../room';

export interface SearchParams {
  q?: string;
  condition: 'room' | 'host';
  order: 'date_desc' | 'date_asc';
}
export type SearchRoomsResponse = RoomCardInfo[];

export interface RoomPayload extends RoomData {
  userId?: number;
}

export interface CreateRoomResponse {
  roomId: number;
}

export interface FetchRoomInfoReqeust {
  userId: number | null;
}
export type FetchRoomInfoResponse = RoomInfo;
