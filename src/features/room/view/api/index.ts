import authApiClient from '../../../../apis/clients/authApiClient';
import toFormData from '../../../../utils/toFormData';
import { MomentCardInfo } from '../../../moment/types';
import { RoomInfo, RoomMember } from '../../types';
import { CreateRoomRequest, EditRoomRequest } from './dto';

export const createRoom = async (
  data: CreateRoomRequest //
): Promise<number> => {
  const formData = toFormData(data);
  const res = await authApiClient.post('/rooms', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.result.roomId;
};

export const fetchRoomInfo = async (
  roomId: number //
): Promise<RoomInfo> => {
  const res = await authApiClient.get(`/rooms/${roomId}`);
  return res.data.result;
};

export const fetchRoomMoments = async (
  roomId: number //
): Promise<MomentCardInfo[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/moments`);
  return res.data.result.moments;
};

export const fetchRoomMembers = async (
  roomId: number //
): Promise<RoomMember[]> => {
  const res = await authApiClient.get(`/rooms/${roomId}/members`);
  return res.data.result.members;
};

export const editRoom = async (
  roomId: number, //
  data: EditRoomRequest
): Promise<void> => {
  const formData = toFormData(data);
  await authApiClient.put(`/rooms/${roomId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteRoom = async (roomId: number): Promise<void> => {
  await authApiClient.delete(`/rooms/${roomId}`);
};

export const leaveRoom = async (roomId: number): Promise<void> => {
  await authApiClient.delete(`/rooms/${roomId}/leave`);
};
