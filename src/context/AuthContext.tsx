import React, { createContext, ReactNode, useState } from 'react';
import { SignupRequest, SignupResponse, signupApi } from '../api/signupApi';
import { loginApi, LoginRequest, LoginResponse } from '../api/loginApi';
import { useMutation } from '@tanstack/react-query';
import { reissueApi } from '../api/reissueApi';

interface User {
  id: string;
  nickname: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

interface AuthContextType {
  authState: AuthState;
  // setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
  signup: (data: SignupRequest) => void;
  login: (data: LoginRequest) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    user: null,
  });

  const signupMutation = useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: (data) => signupApi(data),
    onSuccess: (data) => {
      setAuthState();
    },
    onError: () => {},
  });
  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data) => loginApi(data),
    onSuccess: (data) => {},
    onError: () => {},
  });
  const logout = () => {};
  const refreshToken = async () => {
    const newAccessToken = await reissueApi();
    setAuthState((prev) => ({ ...prev, accessToken: newAccessToken }));
  };
  return (
    <AuthContext.Provider
      value={{
        authState,
        signup: signupMutation.mutateAsync,
        login: loginMutation.mutateAsync,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { type AuthContextType, AuthContext, AuthContextProvider };
