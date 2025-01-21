import axios from 'axios';
import apiClient from './clients/apiClient';
import authApiClient from './clients/authApiClient';
import {
  RoomMutationRequest,
  FetchRoomInfoReqeust,
  FetchRoomInfoResponse,
  SearchParams,
  SearchRoomsResponse,
} from '../types/apis/room';

export const fetchMockRooms = async () => {
  return axios
    .get('/mocks/rooms.json') //
    .then((res) => {
      return res.data.rooms;
    })
    .catch(console.error);
};

export const searchRooms = async (
  searchParams: SearchParams
): Promise<SearchRoomsResponse> => {
  const params = Object.fromEntries(
    Object.entries(searchParams).filter(([, value]) => value !== '')
  );
  const res = await apiClient.get('/rooms', { params });
  return res.data.result;
};

export const createRoom = async (
  data: RoomMutationRequest //
): Promise<number> => {
  const res = await authApiClient.post('/rooms', data, {
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
