import { RoomCardInfo, RoomDetail, RoomInfo } from '../room';

export interface SearchParams {
  q?: string;
  condition?: 'room' | 'host';
  order?: null | 'date_desc' | 'date_asc';
}
export type SearchRoomsResponse = RoomCardInfo[];

export interface RoomPayload extends RoomDetail {
  userId?: number;
}

export type FetchRoomInfoResponse = RoomInfo;
