import { useAuthStore } from "@/stores/auth.store";
import { supabase } from "@api/supabase.api";

const { logout } = useAuthStore();

export async function useSignIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password });
  if (!!error) return error
  return data;
  //여기 아래 알람 띄우실 로직 넣으면 될 것 같아요!
}

export async function useSignUp(email, password, nickname) {
  const { data, error } = await supabase.auth.signUp({ email: email, password: password, nickname: nickname });
  if (!!error) return error
  return data;
  //여기 아래 알람 띄우실 로직 넣으면 될 것 같아요!
}

export async function useSignOut() {
  logout()
  //여기 아래 알람 띄우실 로직 넣으면 될 것 같아요!
}