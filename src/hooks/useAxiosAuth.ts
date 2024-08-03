import { apiAuth } from '../api/axios';
import { useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

const useAxiosAuth = () => {
  const { authState, refreshToken } = useAuthContext();

  useEffect(() => {
    const requestIntercept = apiAuth.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authState.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = apiAuth.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error?.config;
        if (error?.reponse?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newAccessToken = await refreshToken();
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return apiAuth(originalRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      apiAuth.interceptors.request.eject(requestIntercept);
      apiAuth.interceptors.response.eject(responseIntercept);
    };
  }, [authState, refreshToken]);

  return apiAuth;
};

export default useAxiosAuth;
