import { supabase } from "./supabase";

export async function getConversation(propertyId: string, buyerId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("property_id", propertyId)
    .eq("buyer_id", buyerId)
    .maybeSingle();

  if (error) {
    console.error("getConversation:", error.message);
    return null;
  }

  return data;
}

export async function createConversation(
  propertyId: string,
  buyerId: string,
  sellerId: string
) {
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      property_id: propertyId,
      buyer_id: buyerId,
      seller_id: sellerId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select(`
      id,
      sender_id,
      created_at,
      message,
      profiles!sender_id(full_name, avatar_url)
    `)
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getMessages:", error.message);
    return [];
  }

  return data ?? [];
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  message: string
) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      message,
    })
    .select(); // optional but recommended

  if (error) {
    throw error;
  }

  return data;
}

export async function getUserInbox(userId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .select(`
      *,
      properties(
        id,
        title,
        image_url,
        location,
        price
      ),
      buyer:profiles!buyer_id(
        id,
        full_name,
        avatar_url,
        email
      ),
      seller:profiles!seller_id(
        id,
        full_name,
        avatar_url,
        email
      )
    `)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getUserInbox:", error.message);
    return [];
  }

  const conversations = data ?? [];

  // attach latest message to each conversation
  const enrichedConversations = await Promise.all(
    conversations.map(async (conversation) => {
      const { data: latestMessage } = await supabase
        .from("messages")
        .select(`
          id,
          message,
          created_at,
          sender_id,
          profiles!sender_id(
            full_name,
            avatar_url
          )
        `)
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      return {
        ...conversation,
        latest_message: latestMessage ?? null,
      };
    })
  );

  return enrichedConversations;
}