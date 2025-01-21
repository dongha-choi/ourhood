import apiClient from '../api/clients/apiClient';
import authApiClient from '../api/clients/authApiClient';
import {
  SearchParams,
  FetchRoomInfoReqeust,
  FetchRoomInfoResponse,
  RoomMutationRequest,
  SearchRoomsResponse,
} from '../types/apis/room';
import createFormData from '../utils/createFormData';

const useRoom = () => {
  const searchRooms = async (
    searchParams: SearchParams
  ): Promise<SearchRoomsResponse> => {
    const params = Object.fromEntries(
      Object.entries(searchParams).filter(([, value]) => value !== '')
    );
    const res = await apiClient.get('/rooms', { params });
    return res.data.result.rooms;
  };
  const createRoom = async (data: RoomMutationRequest): Promise<number> => {
    const formData = createFormData(data);
    console.log(data);
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
  const editRoom = async (roomId: number, data: RoomMutationRequest) => {
    const formData = createFormData(data);
    await authApiClient.put(`/rooms/${roomId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  const deleteRoom = async (roomId: number) => {
    await authApiClient.delete(`/rooms/${roomId}`);
  };
  const leaveRoom = async (roomId: number, userId: number) => {
    await authApiClient.post(`/rooms/${roomId}/leave`, {
      userId,
    });
  };

  return {
    searchRooms,
    createRoom,
    fetchRoomInfo,
    editRoom,
    deleteRoom,
    leaveRoom,
  };
};

export default useRoom;
