import { RoomCardInfo } from '../../types';

export interface SearchRoomsParams {
  q?: string;
  condition?: 'room' | 'host';
  order?: null | 'date_desc' | 'date_asc';
}
export interface SearchRoomsResponse {
  roomList: RoomCardInfo[];
}
