import apiClient from './clients/apiClient';
import authApiClient from './clients/authApiClient';
import {
  RoomPayload,
  FetchRoomInfoReqeust,
  SearchParams,
  SearchRoomsResponse,
  FetchRoomInfoResponse,
} from '../types/apis/room';
import createFormData from '../utils/createFormData';

export const searchRooms = async (
  searchParams: SearchParams
): Promise<SearchRoomsResponse> => {
  const params = Object.fromEntries(
    Object.entries(searchParams).filter(([, value]) => value !== '')
  );
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
  roomId: number,
  data: FetchRoomInfoReqeust
): Promise<FetchRoomInfoResponse> => {
  const res = await authApiClient.post(`/rooms/${roomId}`, data);
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
