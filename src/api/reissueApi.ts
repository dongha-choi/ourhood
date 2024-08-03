import axios from 'axios';
import { apiAuth } from './axios';

export const reissueApi = async (): Promise<string> => {
  try {
    const res = await apiAuth.post(`/reissue`); // with user id?
    return res.data.headers.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Re-issue failed');
    }
    throw new Error('Re-issue failed: unknown error');
  }
};
