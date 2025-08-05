import {
    FetchRoomInfoResponse, RoomPayload, SearchParams, SearchRoomsResponse
} from '../types/apis/room';
import { Member } from '../types/memberRequest';
import { Moment } from '../types/moment';
import createFormData from '../utils/createFormData';
import apiClient from './clients/apiClient';
import authApiClient from './clients/authApiClient';

export const searchRooms = async ({
  q,
  condition,
  order,
}: SearchParams): Promise<SearchRoomsResponse> => {
  const params: SearchParams = {};

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

export const createRoom = async (
  data: RoomPayload //
): Promise<number> => {
  const formData = createFormData(data);
  const res = await authApiClient.post('/rooms', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.result.roomId;
};

export const fetchRoomInfo = async (
  roomId: number
): Promise<FetchRoomInfoResponse> => {
  const res = await authApiClient.get(`/rooms/${roomId}`);
  return res.data.result;
};
export const fetchRoomMoments = async (
  roomId: number //
): Promise<Moment[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/moments`);
  return res.data.result;
};
export const fetchRoomMembers = async (
  roomId: number //
): Promise<Member[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/members`);
  return res.data.result;
};

export const editRoom = async (roomId: number, data: RoomPayload) => {
  const formData = createFormData(data);
  await authApiClient.put(`/rooms/${roomId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteRoom = async (roomId: number) => {
  await authApiClient.delete(`/rooms/${roomId}`);
};
export const leaveRoom = async (roomId: number, userId: number) => {
  await authApiClient.post(`/rooms/${roomId}/leave`, {
    userId,
  });
};
