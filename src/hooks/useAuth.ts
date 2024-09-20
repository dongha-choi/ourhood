import apiClient from '../api/clients/apiClient';
import authApiClient from '../api/clients/authApiClient';
import useAuthStore from '../stores/useAuthStore';
// import { useMutation } from '@tanstack/react-query';
import { LoginRequest, SignupRequest } from '../types/apis/auth';

const useAuth = () => {
  const { setToken, setUser, clearAuth } = useAuthStore();
  const signup = async (data: SignupRequest) => {
    await apiClient.post('/signup', data);
  };
  const login = async (data: LoginRequest) => {
    const res = await authApiClient.post('/login', data);
    setToken(res.headers.accesstoken);
    setUser({
      id: res.data.result.user.userId,
      name: res.data.result.user.nickname,
      email: res.data.result.user.email,
    });
  };
  // const { mutateAsync: signup } = useMutation<
  //   void, //
  //   Error,
  //   SignupRequest
  // >({
  //   mutationFn: async (data) => {
  //     await apiClient.post('/signup', data);
  //   },
  //   onSuccess: () => {
  //     console.log('Sign-up success!');
  //   },
  //   onError: () => {},
  // });

  // const { mutateAsync: login } = useMutation<void, Error, LoginRequest>({
  //   mutationFn: async (data) => {
  //     const res = await authApiClient.post('/login', data);
  //     setToken(res.headers.accesstoken);
  //     setUser({
  //       id: res.data.result.user.userId,
  //       name: res.data.result.user.nickname,
  //       email: res.data.result.user.email,
  //     });
  //   },
  //   onSuccess: (data) => {
  //     console.log('data in login mutation: ', data);
  //   },
  //   onError: () => {},
  // });
  const logout = async () => {
    await authApiClient.post('/logout');
    clearAuth();
  };
  return { signup, login, logout };
};

export default useAuth;
