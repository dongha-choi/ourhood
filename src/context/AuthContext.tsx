import React, { createContext, ReactNode, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { SignupRequest, SignupResponse, signupApi } from '../api/signupApi';
import { loginApi, LoginRequest, LoginResponse } from '../api/loginApi';
import { useMutation } from '@tanstack/react-query';

interface AuthContextType {
  signup: (data: SignupRequest) => void;
  login: (data: LoginRequest) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [, setCookie, removeCookie] = useCookies(['token']);

  const signupMutation = useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: (data) => signupApi(data),
    onSuccess: (data) => {
      setCookie('token', data.token, {
        path: '/',
        secure: false,
        sameSite: 'strict',
      });
    },
    onError: () => {
      removeCookie('token');
    },
  });
  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data) => loginApi(data),
    onSuccess: (data) => {
      setCookie('token', data.token, {
        path: '/',
        secure: true,
        sameSite: 'strict',
      });
    },
    onError: () => {
      removeCookie('token');
    },
  });
  const logout = () => {
    removeCookie('token');
  };
  return (
    <AuthContext.Provider
      value={{
        signup: signupMutation.mutateAsync,
        login: loginMutation.mutateAsync,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
