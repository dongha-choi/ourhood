// import React, { createContext, ReactNode } from 'react';
// import { useMutation } from '@tanstack/react-query';
// import { LoginRequest, SignupRequest } from '../types/apis/auth';
// import { apiClient } from '../api/clients/apiClient';
// import useAuthStore from '../stores/useAuthStore';
// import useAuthApiClient from '../hooks/useAuthApiClient';

// interface AuthContextType {
//   signup: (data: SignupRequest) => void;
//   login: (data: LoginRequest) => void;
//   logout: () => Promise<void>;
//   refresh: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthContextProviderProps {
//   children: ReactNode;
// }

// const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
//   children,
// }) => {
//   const authApiClient = useAuthApiClient();
//   console.log(authApiClient.interceptors);

//   const { setToken, setUser, clearAuth } = useAuthStore();

//   const { mutateAsync: signup } = useMutation<
//     void, //
//     Error,
//     SignupRequest
//   >({
//     mutationFn: async (data) => {
//       await apiClient.post('/signup', data);
//     },
//     onSuccess: () => {
//       console.log('Sign-up success!');
//     },
//     onError: () => {},
//   });
//   const { mutateAsync: login } = useMutation<void, Error, LoginRequest>({
//     mutationFn: async (data) => {
//       const res = await authApiClient.post('/login', data);
//       setToken(res.headers.accesstoken);
//       setUser({
//         id: res.data.result.user.userId,
//         name: res.data.result.user.nickname,
//         email: res.data.result.user.email,
//       });
//     },
//     onSuccess: (data) => {
//       console.log('data in login mutation: ', data);
//     },
//     onError: () => {},
//   });
//   const logout = async () => {
//     clearAuth();
//     await authApiClient.post('/logout');
//     // authApiClient.interceptors.request.handlers = [];
//     // authApiClient.interceptors.response.handlers = [];
//   };

//   const refresh = async (): Promise<void> => {
//     const res = await authApiClient.post('/reissue');
//     const newAccessToken = res.headers.accessToken;
//     setToken(newAccessToken);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         signup,
//         login,
//         logout,
//         refresh,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { type AuthContextType, AuthContext, AuthContextProvider };
