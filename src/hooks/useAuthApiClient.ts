import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import authApiClient from '../api/clients/authApiClient';
import useAuthStore from '../stores/useAuthStore';
import { useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
const useAuthApiClient = () => {
  const { token, setToken } = useAuthStore();
  const { refresh } = useAuthContext();

  useEffect(() => {
    const requestInterceptor = authApiClient.interceptors.request.use(
      (config) => {
        // const token = useAuthStore.getState().token;
        if (!config.headers['accessToken'] && token) {
          console.log('interceptor: ', token);
          config.headers['accessToken'] = token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = authApiClient.interceptors.response.use(
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

    return () => {
      authApiClient.interceptors.request.eject(requestInterceptor);
      authApiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [token, setToken, refresh]);

  return authApiClient;
};

export default useAuthApiClient;
