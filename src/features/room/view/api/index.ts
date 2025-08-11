import authApiClient from '../../../../apis/clients/authApiClient';
import createFormData from '../../../../utils/createFormData';
import { RoomDetail } from '../../types';
import {
  RoomInfoResponse,
  RoomMembersResponse,
  RoomMomentsResponse,
} from './types';

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
): Promise<RoomInfoResponse> => {
  const res = await authApiClient.get(`/rooms/${roomId}`);
  return res.data.result;
};
export const fetchRoomMoments = async (
  roomId: number //
): Promise<RoomMomentsResponse> => {
  const res = await authApiClient.get(`/rooms/${roomId}/moments`);
  return res.data.result;
};
export const fetchRoomMembers = async (
  roomId: number //
): Promise<RoomMembersResponse> => {
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
