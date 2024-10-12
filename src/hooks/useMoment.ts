import authApiClient from '../api/clients/authApiClient';
import { MomentPayload, FetchMomentInfoResponse } from '../types/apis/moment';
const useMoment = () => {
  const createMoment = async (data: MomentPayload) => {
    const res = await authApiClient.post('/moments', data, {
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

  return { createMoment, fetchMomentInfo };
};

export default useMoment;
