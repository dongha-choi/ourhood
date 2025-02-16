import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useAuthStore from '../../stores/useAuthStore';

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
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      const { data } = error.response as AxiosResponse;
      if (
        data.code === 40102 &&
        originalRequest.url !== '/reissue' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          await refresh();
          return authApiClient(originalRequest);
        } catch (reissueError) {
          if (axios.isAxiosError(reissueError) && reissueError.response) {
            return Promise.reject(
              new Error(reissueError.response.data.message || 'Re-issue failed')
            );
          }
          return Promise.reject(new Error('Re-issue failed'));
        }
      } else if (data.code === 40103) {
        await authApiClient.post('/logout');
        clearAuth();
        alert('Your login session has expired. Please login again!');
        window.location.href = '/login';
      }
    }
    throw error;
  }
);

export default authApiClient;
