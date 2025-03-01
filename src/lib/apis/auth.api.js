import { useAuthStore } from '@/stores/auth.store';
import { supabase } from '@api/supabase.api';

export async function signIn(email, password) {
  const response = await supabase.auth.signInWithPassword({ email, password });
  return response;
}

export async function signUp(email, password, nickname) {
  const response = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        nickname: nickname,
        profile_url: '기본 프로필' // 이부분은 나중에 기본 프로필 지정 했을 때에 바꿔야 합니다!
      }
    }
  });
  return response;
}

export async function signOut() {
  const response = await supabase.auth.signOut();
  return response;
}

supabase.auth.onAuthStateChange(async (event, session) => {
  const { user } = session || {};
  await useAuthStore
    .getState()
    .setUser(
      user
        ? {
            id: user.id,
            email: user.email,
            nickname: user.user_metadata.nickname,
            profile_url: user.user_metadata.profile_url
          }
        : { id: 'ff09f687-c53f-4c6d-a7b6-c92b330d68e4', email: '', nickname: '', profile_url: '' }
    );
});
