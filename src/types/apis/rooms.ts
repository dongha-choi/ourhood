import { RoomDetail } from '../rooms';

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
export interface FetchRoomInfoResponse {
  roomId: string;
  roomName: string;
  roomDescription: string;
  hostName: string;
  thumbnail: string;
  isMember: boolean;
  roomDetail: RoomDetail;
}

// export interface FetchRoomInfoResponse {
//   roomId: string | undefined;
// }
