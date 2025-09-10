import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import useAuthStore from '../../features/auth/store/useAuthStore';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = import.meta.env.VITE_API_URL;

const authApiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const refresh = async (): Promise<void> => {
  try {
    const res = await authApiClient.post('/auth/refresh');
    const newAccessToken = res.data.result.accessToken;
    if (!newAccessToken) {
      throw new Error('새로운 액세스 토큰이 없습니다.');
    }

    useAuthStore.getState().actions.setToken(newAccessToken);

    return newAccessToken;
  } catch (error) {
    useAuthStore.getState().actions.logout();
    window.location.href = '/login';
    // 에러를 다시 던져서 원래 요청의 Promise 체인이 reject 되도록 합니다.
    throw new Error('세션이 만료되어 재로그인이 필요합니다.');
  }
};

authApiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      // 3. Bearer 인증 방식 적용
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authApiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError | Error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const response = error.response as AxiosResponse;

    if (response && originalRequest) {
      const { data } = response;
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
        useAuthStore.getState().actions.logout();
        alert('Your login session has expired. Please login again!');
        window.location.href = '/login';
      }
    }
  }
);

export default authApiClient;
