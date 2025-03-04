import { useEffect } from 'react';
import { supabase } from '@/lib/apis/supabase.api';
import { useAuthStore } from '@/stores/auth.store';

export default function useAuthSubScriber() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email
        });
        async function setAuth() {
          const { data } = await supabase.from('users').select().eq('id', session.user.id).single();
          setUser({
            id: session.user.id,
            email: session.user.email,
            nickname: data.nickname,
            profileUrl: data.profile_url
          });
        }
        setAuth();
      } else {
        clearUser();
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [setUser, clearUser]);

  return null;
}
