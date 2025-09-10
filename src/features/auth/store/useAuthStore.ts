import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '../types';

// 상태와 액션의 타입을 하나의 인터페이스로 통합
interface AuthStore {
  token: string | null;
  user: User | null;
  actions: {
    authLogin: (token: string, user: User) => void;
    authLogout: () => void;
    setToken: (token: string) => void;
  };
}

const initialState = {
  token: null,
  user: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        authLogin: (token, user) => set({ token, user }),
        // 3. clearAuth 대신 logout으로 명칭 변경, 더 안전한 초기화 로직 적용
        authLogout: () => set(initialState),
        setToken: (token) => set({ token }),
      },
    }),
    {
      name: 'auth-storage',
      // state의 actions는 저장할 필요가 없으므로 제외
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);

// 4. 사용 편의성을 위한 커스텀 훅 (선택사항이지만 강력 추천)
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthUserId = () => useAuthStore((state) => state.user?.userId);
export const useAuthToken = () => useAuthStore((state) => state.token);
export const useIsLoggedIn = () => useAuthStore((state) => !!state.token);

export default useAuthStore;
