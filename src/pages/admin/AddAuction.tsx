import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Sidebar from "../../components/dashboard/sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { supabase } from "../../lib/supabase";

type Property = {
  id: string;
  title: string;
};

export default function AddAuction({ user }: { user: User }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  const [propertyId, setPropertyId] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [currentBid, setCurrentBid] = useState("");
  const [minimumIncrement, setMinimumIncrement] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    async function loadProperties() {
      const { data, error } = await supabase
        .from("properties")
        .select("id, title")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error.message);
        return;
      }

      setProperties(data || []);
    }

    loadProperties();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("auctions").insert({
      property_id: propertyId,
      starting_price: Number(startingPrice),
      current_bid: Number(currentBid || startingPrice),
      minimum_increment: Number(minimumIncrement),
      start_time: new Date().toISOString(),
      end_time: new Date(endTime).toISOString(),
      status: "active",
    });

    if (error) {
      console.error(error.message);
      alert("Failed to create auction");
    } else {
      alert("Auction created successfully");
      setPropertyId("");
      setStartingPrice("");
      setCurrentBid("");
      setMinimumIncrement("");
      setEndTime("");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-[#07111f] text-white">
      <Sidebar />
      <main className="flex-1">
        <Topbar user={user} title="Add Auction" subtitle="Create bidding access for a property" />

        <div className="p-6">
          <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div>
              <label className="mb-2 block text-sm text-white/60">Property</label>
              <select
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                required
              >
                <option value="">Select property</option>
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/60">Starting Price</label>
                <input
                  type="number"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">Current Bid</label>
                <input
                  type="number"
                  value={currentBid}
                  onChange={(e) => setCurrentBid(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">Minimum Increment</label>
                <input
                  type="number"
                  value={minimumIncrement}
                  onChange={(e) => setMinimumIncrement(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">Auction End Time</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="rounded-full bg-emerald-400 px-8 py-3 font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Auction"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}