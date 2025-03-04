import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialUserValue = {
  id: '',
  email: '',
  nickname: '',
  profileUrl: null
};

export const useAuthStore = create((set) => {
  //로그인 유지를 위해서 zustand/middleware persist사용용
  return {
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    clearUser: () => set({ user: initialUserValue, isAuthenticated: false })
  };
});
