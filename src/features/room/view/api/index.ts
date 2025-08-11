import authApiClient from '../../../../apis/clients/authApiClient';
import createFormData from '../../../../utils/createFormData';
import { Member, Moment, RoomId, RoomInfo } from '../domain/models';
import { CreateRoomRequest } from './dto';

export const createRoom = async (
  data: CreateRoomRequest //
): Promise<RoomId> => {
  const formData = createFormData(data);
  const res = await authApiClient.post('/rooms', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.result.roomId;
};

export const fetchRoomInfo = async (roomId: RoomId): Promise<RoomInfo> => {
  const res = await authApiClient.get(`/rooms/${roomId}`);
  return res.data.result;
};
export const fetchRoomMoments = async (
  roomId: RoomId //
): Promise<Moment[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/moments`);
  return res.data.result.moments;
};
export const fetchRoomMembers = async (
  roomId: RoomId //
): Promise<Member[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/members`);
  return res.data.result.members;
};

// export const editRoom = async (roomId: RoomId, data: RoomPayload) => {
//   const formData = createFormData(data);
//   await authApiClient.put(`/rooms/${roomId}`, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// };
// export const deleteRoom = async (roomId: RoomId) => {
//   await authApiClient.delete(`/rooms/${roomId}`);
// };
// export const leaveRoom = async (roomId: RoomId, userId: UserId) => {
//   await authApiClient.post(`/rooms/${roomId}/leave`, {
//     userId,
//   });
// };
