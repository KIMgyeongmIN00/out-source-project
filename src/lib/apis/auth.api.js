import { supabase } from "@api/supabase.api";

export async function signIn(email, password) {
  const response = await supabase.auth.signInWithPassword({ email, password });
  return response
}

export async function signUp(email, password, nickname) {
  const response = await supabase.auth.signUp({ email, password, nickname });
  return response;
}

export async function signOut() {
  const response = await supabase.auth.signOut();
  return response;
}