import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { signOut } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { getUserInbox } from "../lib/messageApi";
import Topbar from "../components/dashboard/Topbar";

type SellerDashboardProps = {
  user: User;
};

type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  image_url: string;
  status: string;
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
  created_at: string;
};

export default function SellerDashboard({ user }: SellerDashboardProps) {
  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "User";

  const avatar =
    user?.user_metadata?.avatar_url ||
    "https://via.placeholder.com/120?text=S";

  const [properties, setProperties] = useState<Property[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Load seller's properties
        const { data: propsData } = await supabase
          .from("properties")
          .select("*")
          .eq("created_by", user.id)
          .order("created_at", { ascending: false });

        setProperties(propsData || []);

        // Load seller's conversations
        const convData = await getUserInbox(user.id);
        setConversations(convData || []);
      } catch (error) {
        console.error("Load data error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user.id]);

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <Topbar
        user={user}
        title="Seller Dashboard"
        subtitle="Manage your listings and buyer inquiries"
      />

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
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

            <div className="mt-6 space-y-3 text-sm text-white/70">
              <div className="rounded-2xl bg-black/20 p-4">
                <div className="text-white/50">Role</div>
                <div className="mt-1 font-medium text-blue-400">Seller</div>
              </div>

              <div className="rounded-2xl bg-black/20 p-4">
                <div className="text-white/50">Account status</div>
                <div className="mt-1 font-medium text-emerald-300">Active</div>
              </div>
            </div>

            <button
              onClick={signOut}
              className="mt-6 w-full rounded-full bg-white px-4 py-3 font-semibold text-slate-950 hover:bg-white/90"
            >
              Logout
            </button>
          </section>

          <section className="grid gap-6">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
                <div className="text-sm text-white/50">Listed properties</div>
                <div className="mt-2 text-2xl md:text-3xl font-semibold">{properties.length}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
                <div className="text-sm text-white/50">Buyer inquiries</div>
                <div className="mt-2 text-2xl md:text-3xl font-semibold">{conversations.length}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
                <div className="text-sm text-white/50">Total revenue</div>
                <div className="mt-2 text-2xl md:text-3xl font-semibold">$0</div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {loading ? (
                <div className="text-white/60">Loading properties...</div>
              ) : properties.length === 0 ? (
                <div className="text-white/60">
                  No properties listed yet. <Link to="/admin/add-property" className="text-emerald-400 hover:text-emerald-300">Add one now</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {properties.map((prop) => (
                    <div
                      key={prop.id}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <img
                        src={prop.image_url || "https://via.placeholder.com/60"}
                        alt={prop.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{prop.title}</div>
                        <div className="text-sm text-white/60">{prop.location}</div>
                        <div className="text-sm text-emerald-400 mt-1">
                          ${Number(prop.price).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          prop.status === "available"
                            ? "bg-emerald-400/20 text-emerald-400"
                            : "bg-white/10 text-white/60"
                        }`}>
                          {prop.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold mb-4">Buyer Inquiries</h2>
              {loading ? (
                <div className="text-white/60">Loading inquiries...</div>
              ) : conversations.length === 0 ? (
                <div className="text-white/60">No buyer inquiries yet</div>
              ) : (
                <div className="space-y-3">
                  {conversations.map((conv) => (
                    <Link
                      key={conv.id}
                      to={`/messages/${conv.id}`}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 hover:bg-black/40 transition"
                    >
                      <img
                        src={conv.buyer?.avatar_url || "https://via.placeholder.com/60"}
                        alt={conv.buyer?.full_name || "Buyer"}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{conv.buyer?.full_name || "Buyer"}</div>
                        <div className="text-sm text-white/60">{conv.properties?.title || "Property"}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold">Quick actions</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/admin/add-property"
                  className="rounded-full bg-emerald-400 px-5 py-3 font-medium text-slate-950 hover:bg-emerald-300"
                >
                  Add Property
                </Link>
                <Link
                  to="/admin/add-auction"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 font-medium text-white hover:bg-white/10"
                >
                  Create Auction
                </Link>
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
