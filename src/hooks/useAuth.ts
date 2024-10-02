import apiClient from '../api/clients/apiClient';
import authApiClient from '../api/clients/authApiClient';
import useAuthStore from '../stores/useAuthStore';
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
  const logout = async () => {
    clearAuth();
    await authApiClient.post('/logout');
  };
  return { signup, login, logout };
};

export default useAuth;
