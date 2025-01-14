import authApiClient from '../api/clients/authApiClient';
import { MomentPayload, FetchMomentInfoResponse } from '../types/apis/moment';
import createFormData from '../utils/createFormData';
const useMoment = () => {
  const createMoment = async (data: MomentPayload) => {
    const formData = createFormData(data);
    const res = await authApiClient.post('/moments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.result.momentId;
  };
  const fetchMomentInfo = async (
    momentId: number
  ): Promise<FetchMomentInfoResponse> => {
    const res = await authApiClient.get(`/moments/${momentId}`);
    return res.data.result;
  };
  const editMoment = async (momentId: number, momentDescription: string) => {
    await authApiClient.put(`moments/${momentId}`, {
      momentDescription,
    });
  };
  const deleteMoment = async (momentId: number) => {
    await authApiClient.delete(`moments/${momentId}`);
  };
  return { createMoment, fetchMomentInfo, deleteMoment, editMoment };
};

export default useMoment;
