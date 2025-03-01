import { supabase } from '@api/supabase.api';

export async function signIn({ email, password }) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signUp({ email, password, nickname }) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname }
    }
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}
