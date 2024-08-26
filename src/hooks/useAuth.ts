import apiClient from '../api/clients/apiClient';
import useAuthApiClient from './useAuthApiClient';
import useAuthStore from '../stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { LoginRequest, SignupRequest } from '../types/apis/auth';

const useAuth = () => {
  const authApiClient = useAuthApiClient();
  const { setToken, setUser, clearAuth } = useAuthStore();
  const { mutateAsync: signup } = useMutation<
    void, //
    Error,
    SignupRequest
  >({
    mutationFn: async (data) => {
      await apiClient.post('/signup', data);
    },
    onSuccess: () => {
      console.log('Sign-up success!');
    },
    onError: () => {},
  });
  const { mutateAsync: login } = useMutation<void, Error, LoginRequest>({
    mutationFn: async (data) => {
      const res = await authApiClient.post('/login', data);
      setToken(res.headers.accesstoken);
      setUser({
        id: res.data.result.user.userId,
        name: res.data.result.user.nickname,
        email: res.data.result.user.email,
      });
    },
    onSuccess: (data) => {
      console.log('data in login mutation: ', data);
    },
    onError: () => {},
  });
  const logout = async () => {
    clearAuth();
    await authApiClient.post('/logout');
  };
  return { signup, login, logout };
};

export default useAuth;
