import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number | null;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User;
}

interface AuthActions {
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

const initialState: AuthState = {
  token: null,
  user: {
    id: null,
    name: '',
    email: '',
  },
};

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,
      setToken: (token: string) => set({ token }),
      setUser: (user: User) => set({ user }),
      clearAuth: () => set(initialState),
    }),
    {
      name: 'authStore',
    }
  )
);

export default useAuthStore;
