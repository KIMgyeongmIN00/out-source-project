import { supabase } from '@api/supabase.api';
import { create } from 'zustand';

// 인증 상태 관리
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));

// 인증 상태 변경 감지
supabase.auth.onAuthStateChange(async (event, session) => {
  const { user } = session || {};
  await useAuthStore.getState().setUser({ id: user?.id, email: user?.email });
});