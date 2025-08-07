import apiClient from '../../../apis/clients/apiClient';
import authApiClient from '../../../apis/clients/authApiClient';
import { RoomDetail } from '../../../types/room';
import createFormData from '../../../utils/createFormData';
import {
    RoomInfoResponseDTO, RoomMembersResponseDTO, RoomMomentsResponseDTO, SearchRoomsParams,
    SearchRoomsResponseDTO
} from './types';

export const searchRooms = async ({
  q,
  condition,
  order,
}: SearchRoomsParams): Promise<SearchRoomsResponseDTO> => {
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

export const createRoom = async (
  data: RoomDetail //
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
): Promise<RoomInfoResponseDTO> => {
  const res = await authApiClient.get(`/rooms/${roomId}`);
  return res.data.result;
};
export const fetchRoomMoments = async (
  roomId: number //
): Promise<RoomMomentsResponseDTO> => {
  const res = await authApiClient.get(`/rooms/${roomId}/moments`);
  return res.data.result;
};
export const fetchRoomMembers = async (
  roomId: number //
): Promise<RoomMembersResponseDTO> => {
  const res = await authApiClient.get(`/rooms/${roomId}/members`);
  return res.data.result;
};

// export const editRoom = async (roomId: number, data: RoomPayload) => {
//   const formData = createFormData(data);
//   await authApiClient.put(`/rooms/${roomId}`, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };
export const deleteRoom = async (roomId: number) => {
  await authApiClient.delete(`/rooms/${roomId}`);
};
export const leaveRoom = async (roomId: number, userId: number) => {
  await authApiClient.post(`/rooms/${roomId}/leave`, {
    userId,
  });
};
