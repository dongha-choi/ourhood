import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useAuthStore from '../../stores/useAuthStore';
import { redirect } from 'react-router-dom';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = import.meta.env.VITE_API_URL;

const authApiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const refresh = async (): Promise<void> => {
  const { setToken } = useAuthStore.getState();
  const res = await authApiClient.post('/reissue');
  const newAccessToken = res.headers.accesstoken;
  setToken(newAccessToken);
};

authApiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    config.headers['accessToken'] = token;
    return config;
  },
  (error) => Promise.reject(error)
);

authApiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError | Error) => {
    const { clearAuth } = useAuthStore.getState();
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
          return authApiClient(originalRequest);
        } catch (reissueError) {
          if (axios.isAxiosError(reissueError) && reissueError.response) {
            return Promise.reject(
              new Error(reissueError.response.data.message || 'Re-issue failed')
            );
          }
          return Promise.reject(new Error('Re-issue failed'));
        }
      } else if (status === 401 && data.code === '0302') {
        await authApiClient.post('/logout');
        clearAuth();
        alert('Your login session has expired. Please login again!');
        redirect('/login');
      }
    }
    return Promise.reject(new Error('Auth API failed: unknown error'));
  }
);

export default authApiClient;
