import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { signOut } from "../lib/auth";
import { getUserInbox } from "../lib/messageApi";
import Topbar from "../components/dashboard/Topbar";

type BuyerDashboardProps = {
  user: User;
};

type Conversation = {
  id: string;
  property_id: string;
  properties?: {
    title: string;
    image_url: string;
    location: string;
  };
  buyer?: {
    full_name: string;
    avatar_url: string;
    email: string;
  };
  seller?: {
    full_name: string;
    avatar_url: string;
    email: string;
  };
  latest_message?: {
    id: string;
    message: string;
    created_at: string;
    sender_id: string;
    profiles?: {
      full_name: string;
      avatar_url: string;
    };
  } | null;
  created_at: string;
};

export default function BuyerDashboard({ user }: BuyerDashboardProps) {
  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "User";

  const avatar =
    user?.user_metadata?.avatar_url ||
    "https://via.placeholder.com/120?text=U";

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConversations() {
      try {
        setLoading(true);
        const data = await getUserInbox(user.id);
        setConversations(data || []);
      } catch (error) {
        console.error("Load conversations error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadConversations();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <Topbar
        user={user}
        title="Buyer Dashboard"
        subtitle="Manage conversations, bids, and saved properties"
      />

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* PROFILE */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <img
                src={avatar}
                alt={fullName}
                className="h-16 w-16 rounded-2xl object-cover"
              />
              <div>
                <h1 className="text-2xl font-semibold">{fullName}</h1>
                <p className="text-sm text-white/60">{user?.email}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-white/70">
              <div className="rounded-2xl bg-black/20 p-4">
                <div className="text-white/45">Role</div>
                <div className="mt-1 font-medium text-emerald-400">Buyer</div>
              </div>

              <div className="rounded-2xl bg-black/20 p-4">
                <div className="text-white/45">Account status</div>
                <div className="mt-1 font-medium text-emerald-300">Active</div>
              </div>
            </div>

            <button
              onClick={signOut}
              className="mt-6 w-full rounded-full bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-white/90"
            >
              Logout
            </button>
          </section>

          {/* MAIN CONTENT */}
          <section className="grid gap-6">
            {/* STATS */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
                <div className="text-sm text-white/50">Conversations</div>
                <div className="mt-2 text-2xl md:text-3xl font-semibold">{conversations.length}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
                <div className="text-sm text-white/50">Saved properties</div>
                <div className="mt-2 text-2xl md:text-3xl font-semibold">0</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
                <div className="text-sm text-white/50">Active bids</div>
                <div className="mt-2 text-2xl md:text-3xl font-semibold">0</div>
              </div>
            </div>

            {/* CONVERSATIONS */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Conversations</h2>
                <Link
                  to="/properties"
                  className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                  Browse properties
                </Link>
              </div>

              {loading ? (
                <div className="text-white/60">Loading conversations...</div>
              ) : conversations.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-white/60">
                  No conversations yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {conversations.map((conv) => {
                    const senderName =
                      conv.latest_message?.profiles?.full_name ||
                      conv.seller?.full_name ||
                      "Unknown";

                    const senderAvatar =
                      conv.latest_message?.profiles?.avatar_url ||
                      conv.seller?.avatar_url ||
                      "https://via.placeholder.com/60";

                    return (
                      <Link
                        key={conv.id}
                        to={`/messages/${conv.id}`}
                        className="group block rounded-3xl border border-white/10 bg-black/20 p-4 transition hover:-translate-y-1 hover:bg-black/30"
                      >
                        <div className="flex gap-4">
                          <img
                            src={conv.properties?.image_url || "https://via.placeholder.com/80"}
                            alt={conv.properties?.title || "Property"}
                            className="h-20 w-20 rounded-2xl object-cover"
                          />

                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {conv.properties?.title || "Property Conversation"}
                                </h3>
                                <p className="text-sm text-white/50">
                                  {conv.properties?.location || "Location unavailable"}
                                </p>
                              </div>

                              <div className="text-xs text-white/40">
                                {new Date(conv.created_at).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                              <img
                                src={senderAvatar}
                                alt={senderName}
                                className="h-9 w-9 rounded-full object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="text-sm text-white/60">
                                  {senderName}
                                </div>
                                <div className="truncate text-sm text-white/80">
                                  {conv.latest_message?.message || "No messages yet"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold">Quick actions</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/properties"
                  className="rounded-full bg-emerald-400 px-5 py-3 font-medium text-slate-950 hover:bg-emerald-300"
                >
                  Browse Properties
                </Link>
                <button className="rounded-full border border-white/15 bg-white/5 px-5 py-3 font-medium text-white hover:bg-white/10">
                  View Bids
                </button>
                <button className="rounded-full border border-white/15 bg-white/5 px-5 py-3 font-medium text-white hover:bg-white/10">
                  Edit Profile
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}