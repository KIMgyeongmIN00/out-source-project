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
          email: session.user.email,
          nickname: session.user.user_metadata.nickname,
          profileUrl: session.user.user_metadata.profile_url
        });
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
