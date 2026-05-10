// src/lib/auth.ts
import { supabase } from "./supabase";

export async function signInWithGoogle() {
  const redirectTo = `${window.location.origin}/dashboard`;
  
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });
}

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
};

export async function signOut() {
  await supabase.auth.signOut();
}