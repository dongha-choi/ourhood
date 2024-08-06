import React, { createContext, ReactNode, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { LoginRequest, LoginResponse, SignupRequest } from '../types/apis/auth';
import { signup, login, logout } from '../api/auth';

interface User {
  id: string;
  nickname: string;
  email: string;
}

interface AuthContextType {
  user: User;
  signup: (data: SignupRequest) => Promise<void>;
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
  const [user, setUser] = useState<User>({
    id: '',
    nickname: '',
    email: '',
  });
  console.log(user);

  const signupMutation = useMutation<void, Error, SignupRequest>({
    mutationFn: (data) => signup(data),
    onSuccess: () => {
      console.log('Sign-up success!');
    },
    onError: () => {},
  });
  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data) => login(data),
    onSuccess: (data) => {
      console.log('data in login mutation: ', data);
      setUser(data.result);
    },
    onError: () => {},
  });
  return (
    <AuthContext.Provider
      value={{
        user,
        signup: signupMutation.mutateAsync,
        login: loginMutation.mutateAsync,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { type AuthContextType, AuthContext, AuthContextProvider };
