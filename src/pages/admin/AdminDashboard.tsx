import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";

import Sidebar from "../../components/dashboard/sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import ActivityItem from "../../components/dashboard/ActivityItem";
import { getAdminStats, getRecentProperties } from "../../lib/adminApi";

type AdminDashboardProps = {
  user: User;
};

type DashboardStats = {
  properties: number;
  users: number;
  auctions: number;
  bids: number;
  inquiries: number;
};

type PropertyItem = {
  id: string;
  title: string;
  location: string | null;
  type: string | null;
  status: string | null;
  image_url: string | null;
  created_at: string;
  price: number | null;
};

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [stats, setStats] = useState<DashboardStats>({
    properties: 0,
    users: 0,
    auctions: 0,
    bids: 0,
    inquiries: 0,
  });

  const [recentProperties, setRecentProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const [statsData, recent] = await Promise.all([
          getAdminStats(),
          getRecentProperties(5),
        ]);

        setStats(statsData);
        setRecentProperties(recent as PropertyItem[]);
      } catch (error) {
        console.error("Dashboard load error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#07111f] text-white">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar />
      </div>

      <main className="flex-1 overflow-hidden">
        <Topbar
          user={user}
          title="AKILO Admin Dashboard"
          subtitle="Track listings, auctions, users, and inquiries in one place"
        />

        {/* Mobile menu button */}
        <div className="md:hidden p-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            <span>Menu</span>
          </button>
        </div>

        <div className="space-y-6 p-4 md:space-y-8 md:p-6">
          {/* Top stats */}
          <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            <StatCard
              title="Total Properties"
              value={String(stats.properties)}
              note="All listings in the platform"
            />
            <StatCard
              title="Active Auctions"
              value={String(stats.auctions)}
              note="Currently available for bidding"
            />
            <StatCard
              title="Registered Users"
              value={String(stats.users)}
              note="Buyers, sellers, admins"
            />
            <StatCard
              title="Total Bids"
              value={String(stats.bids)}
              note="All bid records"
            />
            <StatCard
              title="Inquiries"
              value={String(stats.inquiries)}
              note="Messages from buyers"
            />
          </section>

          {/* Main content */}
          <section className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
            {/* Recent properties */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">Recent Properties</h3>
                  <p className="mt-1 text-sm text-white/50">
                    Latest listings from Supabase
                  </p>
                </div>

                <Link
                  to="/admin/properties"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  View all
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {loading ? (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-white/60">
                    Loading recent properties...
                  </div>
                ) : recentProperties.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-white/60">
                    No properties found.
                  </div>
                ) : (
                  recentProperties.map((prop) => (
                    <Link
                      key={prop.id}
                      to={`/property/${prop.id}`}
                      className="group block overflow-hidden rounded-3xl border border-white/10 bg-black/20 transition hover:-translate-y-1 hover:bg-black/30"
                    >
                      <div className="flex gap-4 p-4">
                        <img
                          src={
                            prop.image_url ||
                            "https://via.placeholder.com/1200x800?text=Property"
                          }
                          alt={prop.title}
                          className="h-24 w-24 rounded-2xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="truncate text-lg font-semibold">
                                {prop.title}
                              </h4>
                              <p className="mt-1 text-sm text-white/50">
                                {prop.location ?? "No location"}
                              </p>
                            </div>

                            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                              {prop.status ?? "Available"}
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/60">
                            <span>{prop.type ?? "No type"}</span>
                            <span>•</span>
                            <span>
                              {prop.created_at
                                ? new Date(prop.created_at).toLocaleString()
                                : "No date"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
              <h3 className="text-2xl font-semibold">Quick Actions</h3>
              <p className="mt-1 text-sm text-white/50">
                Fast access to key admin tasks
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  to="/admin/add-property"
                  className="block w-full rounded-2xl bg-emerald-400 px-4 py-3 text-center font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  Add New Property
                </Link>

                <Link
                  to="/admin/add-auction"
                  className="block w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center font-medium text-white transition hover:bg-white/10"
                >
                  Create Auction
                </Link>

                <Link
                  to="/admin/properties"
                  className="block w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center font-medium text-white transition hover:bg-white/10"
                >
                  Review Properties
                </Link>

                <Link
                  to="/admin/messages"
                  className="block w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center font-medium text-white transition hover:bg-white/10"
                >
                  View Messages
                </Link>

                <Link
                  to="/admin/auctions"
                  className="block w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center font-medium text-white transition hover:bg-white/10"
                >
                  View Auctions
                </Link>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm uppercase tracking-[0.2em] text-white/40">
                  Admin Tip
                </div>
                <p className="mt-2 text-sm leading-7 text-white/65">
                  Create an auction for a property before expecting bidding to appear on the property details page.
                </p>
              </div>
            </div>
          </section>

          {/* Activity */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold">Recent Activity</h3>
                <p className="mt-1 text-sm text-white/50">
                  Latest platform updates
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <ActivityItem
                title="Dashboard ready"
                description="Supabase stats and recent listings are loading successfully."
                time="Just now"
              />
              <ActivityItem
                title="Auction workflow"
                description="Properties can now be linked to auctions for bidding."
                time="Today"
              />
              <ActivityItem
                title="Messaging enabled"
                description="Buyers can open conversations from property details."
                time="Today"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}