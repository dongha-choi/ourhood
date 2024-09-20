import axios from 'axios';
import apiClient from '../api/clients/apiClient';
import authApiClient from '../api/clients/authApiClient';
// import useAuthApiClient from './useAuthApiClient';
import {
  SearchParams,
  CreateRoomRequest,
  FetchRoomInfoReqeust,
  FetchRoomInfoResponse,
} from '../types/apis/rooms';
const useRooms = () => {
  // const authApiClient = useAuthApiClient();
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
  const createRoom = async (data: CreateRoomRequest) => {
    const res = await authApiClient.post('/rooms', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.result.roomId;
  };
  const fetchRoomInfo = async (
    roomId: string,
    data: FetchRoomInfoReqeust
  ): Promise<FetchRoomInfoResponse> => {
    const res = await authApiClient.post(`/rooms/${roomId}`, data);
    return res.data.result;
  };

  return { fetchMockRooms, searchRooms, createRoom, fetchRoomInfo };
};

export default useRooms;
