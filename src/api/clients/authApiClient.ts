import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { reissue } from '../auth';
import { getAccessToken } from '../../utils/accessTokenManager';

const BASE_URL = import.meta.env.VITE_API_URL;

const authApiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

authApiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

authApiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError | Error) => {
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      const { status } = error.response as AxiosResponse;
      if (
        status === 401 &&
        originalRequest.headers &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await reissue();
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return authApiClient(originalRequest);
        } catch (reissueError) {
          if (axios.isAxiosError(reissueError) && reissueError.response) {
            return Promise.reject(
              new Error(reissueError.response.data.message || 'Re-issue failed')
            );
          }
          return Promise.reject(new Error('Re-issue failed'));
        }
      }
    }
    return Promise.reject(new Error('Auth API failed: unknown error'));
  }
);

export default authApiClient;
