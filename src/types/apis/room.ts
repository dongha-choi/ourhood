import { RoomInfo } from '../room';

export interface SearchParams {
  q?: string;
  condition: 'room' | 'host';
  order: 'date_desc' | 'date_asc';
}

export type CreateRoomRequest = FormData;
export interface CreateRoomResponse {
  roomId: number;
}

export interface FetchRoomInfoReqeust {
  userId: number | null;
}
export type FetchRoomInfoResponse = RoomInfo;

// export interface FetchRoomInfoResponse {
//   roomId: string | undefined;
// }
