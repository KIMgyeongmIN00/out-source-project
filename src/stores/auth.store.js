import { create } from 'zustand';

const initialUserValue = {
  id: '',
  email: '',
  nickname: '',
  profileUrl: null
};

export const useAuthStore = create((set) => {
  return {
    user: initialUserValue,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    clearUser: () => set({ user: initialUserValue, isAuthenticated: false })
  };
});
