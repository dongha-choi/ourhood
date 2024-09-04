import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from '../api/clients/apiClient';
import useAuthStore from '../stores/useAuthStore';
import { useCallback, useEffect } from 'react';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
const useAuthApiClient = () => {
  const { setToken } = useAuthStore();

  const refresh = useCallback(async (): Promise<void> => {
    const res = await apiClient.post('/reissue');
    const newAccessToken = res.headers.accesstoken;
    setToken(newAccessToken);
  }, [setToken]);

  useEffect(() => {
    console.log('incep', apiClient.interceptors);
    apiClient.defaults.withCredentials = true;
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().token;
        console.log('interceptor request', token);
        config.headers['accessToken'] = token;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = apiClient.interceptors.response.use(
      (res) => res,
      async (error: AxiosError | Error) => {
        console.log(error);
        if (axios.isAxiosError(error)) {
          const originalRequest = error.config as CustomAxiosRequestConfig;
          const { status, data } = error.response as AxiosResponse;
          console.log('error.response', error.response);
          if (
            status === 401 &&
            data.code === '0301' &&
            originalRequest.url !== '/reissue' &&
            !originalRequest._retry
          ) {
            originalRequest._retry = true;
            try {
              console.log('trying refresh api...');
              await refresh();
              console.log('refreshed!');
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
      console.log('cleaning inceps');
      apiClient.defaults.withCredentials = false;
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [setToken, refresh]);

  return apiClient;
};

export default useAuthApiClient;
