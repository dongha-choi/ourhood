import { useMutation } from '@tanstack/react-query';

import { useAuthActions } from '../store/useAuthStore';
import { logout, oauthLogin, signup } from './';

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
  });
};

// export const useLogin = () => {
//   const { authLogin } = useAuthActions();
//   return useMutation({
//     mutationFn: login,
//     onSuccess: (res) => {
//       const token = res.data.result.token.accessToken;
//       const user = res.data.result.user;
//       authLogin(token, user);
//     },
//   });
// };

export const useOauthLogin = () => {
  const { authLogin } = useAuthActions();
  return useMutation({
    mutationFn: oauthLogin,
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
