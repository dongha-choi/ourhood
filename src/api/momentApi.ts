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
  console.log();
  return res.data.result.momentId;
};

export const fetchMomentInfo = async (
  momentId: number
): Promise<MomentInfo> => {
  const res = await authApiClient.get(`/moments/${momentId}`);
  return res.data.result;
};

export interface EditMomentRequest {
  momentId: number;
  momentDescription: string;
}
export const editMoment = async ({
  momentId,
  momentDescription,
}: EditMomentRequest) => {
  await authApiClient.put(`moments/${momentId}`, {
    momentDescription,
  });
};

export interface DeleteMomentRequest {
  momentId: number;
}
export const deleteMoment = async ({ momentId }: DeleteMomentRequest) => {
  await authApiClient.delete(`moments/${momentId}`);
};
