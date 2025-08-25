import apiClient from '../../../../apis/clients/apiClient';
import { SearchRoomsParams, SearchRoomsResponse } from './dto';

export const searchRooms = async ({
  q,
  condition,
  order,
}: SearchRoomsParams): Promise<SearchRoomsResponse> => {
  const params: SearchRoomsParams = {};

  if (q) {
    params.q = q;
    if (condition) {
      params.condition = condition;
    }
  }

  if (order) {
    params.order = order;
  }
  const res = await apiClient.get('/rooms', { params });
  return res.data.result.roomList;
};
