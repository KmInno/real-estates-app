// src/pages/Dashboard.tsx
import type { User } from "@supabase/supabase-js";
import { signOut } from "../lib/auth";

type DashboardProps = {
  user: User;
};

export default function Dashboard({ user }: DashboardProps) {
  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "User";

  const avatar =
    user?.user_metadata?.avatar_url ||
    "https://via.placeholder.com/120?text=U";

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <div className="border-b border-white/10 bg-[#081120] px-4 py-6 md:px-8">
        <div className="flex items-center gap-3 mb-2">
          <img src="/akilo_logo.png" alt="AKILO Logo" className="h-8 w-8 rounded-lg" />
          <h1 className="text-2xl font-bold tracking-wide text-white">Dashboard</h1>
        </div>
        <p className="text-sm text-white/50">Manage your properties and bids</p>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
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
                <div className="mt-1 font-medium">Buyer / Seller / Admin</div>
              </div>

              <div className="rounded-2xl bg-black/20 p-4">
                <div className="text-white/50">Account status</div>
                <div className="mt-1 font-medium text-emerald-300">Logged in</div>
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
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/50">Saved properties</div>
                <div className="mt-2 text-3xl font-semibold">0</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/50">Active bids</div>
                <div className="mt-2 text-3xl font-semibold">0</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/50">Listed properties</div>
                <div className="mt-2 text-3xl font-semibold">0</div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold">Quick actions</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="rounded-full bg-emerald-400 px-5 py-3 font-medium text-slate-950 hover:bg-emerald-300">
                  Add property
                </button>
                <button className="rounded-full border border-white/15 bg-white/5 px-5 py-3 font-medium text-white hover:bg-white/10">
                  View bids
                </button>
                <button className="rounded-full border border-white/15 bg-white/5 px-5 py-3 font-medium text-white hover:bg-white/10">
                  Edit profile
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}