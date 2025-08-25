import authApiClient from '../../../apis/clients/authApiClient';
import toFormData from '../../../utils/toFormData';
import { MomentInfo } from '../types';
import { CreateMomentRequest, EditMomentRequest } from './dto';

export const createMoment = async (
  data: CreateMomentRequest
): Promise<number> => {
  const formData = toFormData(data);
  const res = await authApiClient.post('/moments', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.result.momentId;
};
export const fetchMomentInfo = async (
  momentId: number
): Promise<MomentInfo> => {
  const res = await authApiClient.get(`/moments/${momentId}`);
  return res.data.result;
};
export const editMoment = async (
  momentId: number,
  { momentDescription }: EditMomentRequest
): Promise<void> => {
  await authApiClient.put(`moments/${momentId}`, {
    momentDescription,
  });
};
export const deleteMoment = async (
  momentId: number //
): Promise<void> => {
  await authApiClient.delete(`moments/${momentId}`);
};
