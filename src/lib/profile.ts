import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  role: "admin" | "buyer" | "seller";
  created_at: string;
};

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Get profile error:", error);
      return null;
    }

    return data as Profile | null;
  } catch (err) {
    console.error("getProfile crashed:", err);
    return null;
  }
}

export async function ensureProfile(user: User) {
  if (!user?.id) return;

  try {
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (fetchError) {
      console.error("Fetch profile error:", fetchError);
      return;
    }

    if (!existingProfile) {
      const { error } = await supabase.from("profiles").insert({
        id: user.id,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
        email: user.email ?? "",
        avatar_url: user.user_metadata?.avatar_url || "",
        role: "buyer",
      });

      if (error) {
        console.error("Create profile error:", error);
      }
    }
  } catch (err) {
    console.error("ensureProfile crashed:", err);
  }
}