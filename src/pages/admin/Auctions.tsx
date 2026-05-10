import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Sidebar from "../../components/dashboard/sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { getAuctions } from "../../lib/adminApi";

type Props = {
  user: User;
};

export default function Auctions({ user }: Props) {
  const [auctions, setAuctions] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuctions() {
      const data = await getAuctions();
      setAuctions(data);
      setLoading(false);
    }

    loadAuctions();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#07111f] text-white">
      <Sidebar />
      <main className="flex-1">
        <Topbar user={user} title="Auctions" subtitle="Schedule and track bid events" />

        <div className="p-6">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <table className="w-full">
              <thead className="bg-black/20 text-left text-sm text-white/60">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Start</th>
                  <th className="px-6 py-4">End</th>
                  <th className="px-6 py-4">Starting Price</th>
                  <th className="px-6 py-4">Status</th>
                  </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-6 py-6 text-white/60" colSpan={5}>Loading auctions...</td>
                  </tr>
                ) : auctions.length === 0 ? (
                  <tr>
                    <td className="px-6 py-6 text-white/60" colSpan={5}>No auctions found.</td>
                  </tr>
                ) : (
                  auctions.map((a) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const auction = a as any;
                    return (
                    <tr key={auction.id} className="border-t border-white/5">
                      <td className="px-6 py-4">{auction.properties?.title || "No property"}</td>
                      <td className="px-6 py-4 text-white/70">{auction.start_time ? new Date(auction.start_time).toLocaleString() : "N/A"}</td>
                      <td className="px-6 py-4 text-white/70">{auction.end_time ? new Date(auction.end_time).toLocaleString() : "N/A"}</td>
                      <td className="px-6 py-4 text-emerald-300">${auction.starting_price?.toLocaleString?.() ?? auction.starting_price ?? 0}</td>
                      <td className="px-6 py-4 text-white/70">{auction.status || "upcoming"}</td>
                    </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}