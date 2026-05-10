import { supabase } from "./supabase";

export async function getAuctionByProperty(propertyId: string) {
  const { data, error } = await supabase
    .from("auctions")
    .select("*")
    .eq("property_id", propertyId)
    .maybeSingle();

  if (error) {
    console.error("getAuctionByProperty:", error.message);
    return null;
  }

  return data;
}

export async function getBids(auctionId: string) {
  const { data, error } = await supabase
    .from("bids")
    .select(`
      *,
      profiles(full_name, avatar_url)
    `)
    .eq("auction_id", auctionId)
    .order("amount", { ascending: false });

  if (error) {
    console.error("getBids:", error.message);
    return [];
  }

  return data ?? [];
}

export async function placeBid(
  auctionId: string,
  bidderId: string,
  amount: number
) {
  const { error } = await supabase.from("bids").insert({
    auction_id: auctionId,
    bidder_id: bidderId,
    amount,
  });

  if (error) {
    throw error;
  }

  const { error: updateError } = await supabase
    .from("auctions")
    .update({ current_bid: amount })
    .eq("id", auctionId);

  if (updateError) {
    throw updateError;
  }
}