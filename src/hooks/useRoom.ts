import axios from 'axios';
import apiClient from '../api/clients/apiClient';
import authApiClient from '../api/clients/authApiClient';
import {
  SearchParams,
  RoomPayload,
  FetchRoomInfoReqeust,
  FetchRoomInfoResponse,
} from '../types/apis/room';
import createFormData from '../utils/createFormData';

const useRoom = () => {
  const fetchMockRooms = async () => {
    return axios
      .get('/mocks/rooms.json') //
      .then((res) => {
        return res.data.rooms;
      })
      .catch(console.error);
  };
  const searchRooms = async (searchParams: SearchParams) => {
    const params = Object.fromEntries(
      Object.entries(searchParams).filter(([, value]) => value !== '')
    );
    const res = await apiClient.get('/rooms', { params });
    return res.data.result.rooms;
  };
  const createRoom = async (data: RoomPayload) => {
    const formData = createFormData(data);
    const res = await authApiClient.post('/rooms', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.result.roomId;
  };
  const fetchRoomInfo = async (
    roomId: number,
    data: FetchRoomInfoReqeust
  ): Promise<FetchRoomInfoResponse> => {
    const res = await authApiClient.post(`/rooms/${roomId}`, data);
    return res.data.result;
  };
  const editRoom = async (roomId: number, data: RoomPayload) => {
    const formData = createFormData(data);
    await authApiClient.put(`/rooms/${roomId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return { fetchMockRooms, searchRooms, createRoom, fetchRoomInfo, editRoom };
};

export default useRoom;
