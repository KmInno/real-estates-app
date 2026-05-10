import { supabase } from "./supabase";

export async function getAdminStats() {
  const [properties, profiles, auctions, bids, inquiries] = await Promise.all([
    supabase.from("properties").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("auctions").select("id", { count: "exact", head: true }),
    supabase.from("bids").select("id", { count: "exact", head: true }),
    supabase.from("inquiries").select("id", { count: "exact", head: true }),
  ]);

  return {
    properties: properties.count ?? 0,
    users: profiles.count ?? 0,
    auctions: auctions.count ?? 0,
    bids: bids.count ?? 0,
    inquiries: inquiries.count ?? 0,
  };
}

export async function getRecentProperties(limit = 6) {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getRecentProperties:", error.message);
    return [];
  }

  return data ?? [];
  }

export async function getUsers(limit = 50) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getUsers:", error.message);
    return [];
  }

  console.log(data);

  return data ?? [];
}

export async function getAuctions(limit = 50) {
  const { data, error } = await supabase
    .from("auctions")
    .select("*, properties(title, image_url, location, price)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getAuctions:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getInquiries(limit = 50) {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*, properties(title, image_url, location), profiles(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(limit);
     if (error) {
    console.error("getInquiries:", error.message);
    return [];
  }

  return data ?? [];
}
