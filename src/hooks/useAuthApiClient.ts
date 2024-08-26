import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from '../api/clients/apiClient';
import useAuthStore from '../stores/useAuthStore';
import { useCallback, useEffect } from 'react';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
const useAuthApiClient = () => {
  const { token, setToken } = useAuthStore();

  const refresh = useCallback(async (): Promise<void> => {
    const res = await apiClient.post('/reissue');
    const newAccessToken = res.headers.accessToken;
    setToken(newAccessToken);
  }, [setToken]);

  useEffect(() => {
    apiClient.defaults.withCredentials = true;
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (!config.headers['accessToken'] && token) {
          console.log('interceptor: ', token);
          config.headers['accessToken'] = token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = apiClient.interceptors.response.use(
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
              await refresh();
              return apiClient(originalRequest);
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

    return () => {
      apiClient.defaults.withCredentials = false;
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [token, setToken, refresh]);

  return apiClient;
};

export default useAuthApiClient;
