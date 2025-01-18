import { RoomCardInfo, RoomMetadata, RoomPrivate, UserContext } from '../room';
import { RoomDetail } from './../room';

export interface SearchParams {
  q?: string;
  condition: 'room' | 'host';
  order: 'date_desc' | 'date_asc';
}
export type SearchRoomsResponse = RoomCardInfo[];

export interface CreateRoomRequest {
  userId: number;
  roomDetail: RoomDetail;
}
export interface CreateRoomResponse {
  roomId: number;
}

export interface FetchRoomInfoReqeust {
  userId: number | null;
}
export interface FetchRoomInfoResponse {
  userContext: UserContext;
  roomMetaData: RoomMetadata;
  roomDetail: RoomDetail;
  roomPrivate: RoomPrivate;
}
