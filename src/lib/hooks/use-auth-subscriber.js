import { useEffect } from 'react';
import { supabase } from '@/lib/apis/supabase.api';
import { useAuthStore } from '@/stores/auth.store';

export default function useAuthSubScriber() {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        useAuthStore.getState().setUser({
          id: session.user.id,
          email: session.user.email,
          nickname: session.user.user_metadata.nickname,
          profileUrl: session.user.user_metadata.profile_url
        });
      } else {
        useAuthStore.getState().clearUser();
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return null;
}
