import authApiClient from '../api/clients/authApiClient';
import { MomentPayload } from '../types/apis/moment';
import { MomentInfo } from '../types/moment';
import createFormData from '../utils/createFormData';

export const createMoment = async (data: MomentPayload): Promise<number> => {
  const formData = createFormData(data);
  const res = await authApiClient.post('/moments', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data.result.momentMetadata.momentId;
};

export const fetchMomentInfo = async (
  momentId: number
): Promise<MomentInfo> => {
  const res = await authApiClient.get(`/moments/${momentId}`);
  return res.data.result;
};

export const editMoment = async (
  momentId: number,
  momentDescription: string
) => {
  await authApiClient.put(`moments/${momentId}`, {
    momentDescription,
  });
};

export const deleteMoment = async (momentId: number) => {
  await authApiClient.delete(`moments/${momentId}`);
};
