import React, { createContext, ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { LoginRequest, SignupRequest } from '../types/apis/auth';
// import authApiClient from '../api/clients/authApiClient';
import useAuthStore from '../stores/useAuthStore';
import useAuthApiClient from '../hooks/useAuthApiClient';

interface AuthContextType {
  signup: (data: SignupRequest) => void;
  login: (data: LoginRequest) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const authApiClient = useAuthApiClient();
  const { setToken, setUser, clearAuth } = useAuthStore();
  const { mutateAsync: signup } = useMutation<
    void, //
    Error,
    SignupRequest
  >({
    mutationFn: async (data) => {
      await authApiClient.post('/signup', data);
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
        id: res.data.result.userId,
        name: res.data.result.nickname,
        email: res.data.result.email,
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
  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { type AuthContextType, AuthContext, AuthContextProvider };
