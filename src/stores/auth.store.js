import { supabase } from '@api/supabase.api';
import { create } from 'zustand';

// 인증 상태 관리
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },
}));

// 인증 상태 변경 감지
supabase.auth.onAuthStateChange((event, session) => {
  const { user } = session || {};
  useAuthStore.getState().setUser(user);
});