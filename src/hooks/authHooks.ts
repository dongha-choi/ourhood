import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { signupApi, SignupRequest, SignupResponse } from '../services/user-api';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const signupMutation = useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: (data) => signupApi(data),
    onSuccess: (data) => {
      setToken(data.token);
      const expires = new Date();
      expires.setDate(expires.getDate() + 3);
      setCookie('token', data.token, {
        path: '/',
        secure: true,
        sameSite: 'strict',
        expires,
      });
    },
    onError: () => {
      setToken(null);
      removeCookie('token');
    },
  });
  useEffect(() => {
    const cookieToken = cookies.token;
    if (cookieToken && !token) {
      setToken(cookieToken);
    }
  }, [cookies, token]);

  return {
    signup: signupMutation.mutate,
  };
};
