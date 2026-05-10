import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import Sidebar from "../../components/dashboard/sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { getUserInbox } from "../../lib/messageApi";

interface Conversation {
  id: string;
  created_at: string;
  property_id: string;
  buyer_id: string;
  seller_id: string;
  properties?: {
    title: string;
    image_url: string;
    location: string;
  };
}

export default function Messages({ user }: { user: User }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInbox() {
      if (!user?.id) return;
      const data = await getUserInbox(user.id);
      setConversations(data);
      setLoading(false);
    }

    loadInbox();
  }, [user]);

  return (
    <div className="flex min-h-screen bg-[#07111f] text-white">
      <Sidebar />

      <main className="flex-1">
        <Topbar user={user} title="Messages" subtitle="Buyer and seller conversations" />

        <div className="p-6">
          {loading ? (
            <div className="text-white/60">Loading conversations...</div>
          ) : conversations.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/60">
              No conversations yet.
            </div>
          ) : (
            <div className="space-y-4">
              {conversations.map((conv) => (
                <Link
                  key={conv.id}
                  to={`/messages/${conv.id}`}
                  className="block rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <div className="font-semibold">
                    {conv.properties?.title || "Property conversation"}
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    {conv.properties?.location || "No location"}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}