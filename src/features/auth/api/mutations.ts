import { useMutation } from '@tanstack/react-query';

import { useAuthActions } from '../store/useAuthStore';
import { logout, oauthLogin } from './';
import { OauthLoginParams } from './dto';

export const useLogin = () => {
  const { authLogin } = useAuthActions();
  return useMutation({
    mutationFn: (params: OauthLoginParams) => oauthLogin(params),
    onSuccess: (res) => {
      const token = res.data.result.token.accessToken;
      const user = res.data.result.user;
      authLogin(token, user);
    },
  });
};

export const useLogout = () => {
  const { authLogout } = useAuthActions();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      authLogout();
    },
  });
};
