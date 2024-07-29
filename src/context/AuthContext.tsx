// import React, {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';
// import { SignupRequest, SignupResponse, signup } from '../services/user-api';
// import { useCookies } from 'react-cookie';
// import { useMutation } from '@tanstack/react-query';

// interface AuthContextType {
//   token: string | null;
//   signup: (data: SignupRequest) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [token, setToken] = useState<string | null>(null);
//   const [cookies, setCookie, removeCookie] = useCookies(['token']);

//   const { mutateAsync } = useMutation<SignupResponse, Error, SignupRequest>({
//     mutationFn: (data) => signup(data),
//     onSuccess: (data) => {
//       setToken(data.token);
//       const expires = new Date();
//       expires.setDate(expires.getDate() + 3);
//       setCookie('token', data.token, {
//         path: '/',
//         secure: true,
//         sameSite: 'strict',
//         expires,
//       });
//     },
//     onError: () => {
//       setToken(null);
//       removeCookie('token');
//     },
//   });
//   useEffect(() => {
//     const cookieToken = cookies.token;
//     if (cookieToken && !token) {
//       setToken(cookieToken);
//     }
//   }, [cookies, token]);

//   const handleSignup = async (data: SignupRequest) => {
//     await mutateAsync(data);
//   };
//   return (
//     <AuthContext.Provider value={{ token, signup: handleSignup }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
