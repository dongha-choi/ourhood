import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import authApiClient from '../api/clients/authApiClient';
import useAuthStore from '../stores/useAuthStore';

type Token = string;

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
const useAuthApiClient = () => {
  const { token, setToken } = useAuthStore();

  authApiClient.interceptors.request.use(
    (config) => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const reissue = async (): Promise<Token> => {
    const res = await authApiClient.post('/reissue');
    const newAccessToken = res.headers.accessToken;
    setToken(newAccessToken);
    return newAccessToken;
  };

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
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;
            return authApiClient(originalRequest);
          } catch (reissueError) {
            if (axios.isAxiosError(reissueError) && reissueError.response) {
              return Promise.reject(
                new Error(
                  reissueError.response.data.message || 'Re-issue failed'
                )
              );
            }
            return Promise.reject(new Error('Re-issue failed'));
          }
        }
      }
      return Promise.reject(new Error('Auth API failed: unknown error'));
    }
  );
  return authApiClient;
};

export default useAuthApiClient;
