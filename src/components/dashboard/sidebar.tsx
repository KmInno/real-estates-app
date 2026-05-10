import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  PlusSquare,
  Users,
  Gavel,
  MessageSquareMore,
  LogOut,
  Sparkles,
} from "lucide-react";
import { signOut } from "../../lib/auth";

type SidebarLink = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const links: SidebarLink[] = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Properties", path: "/admin/properties", icon: Building2 },
  { name: "Add Property", path: "/admin/add-property", icon: PlusSquare },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Auctions", path: "/admin/auctions", icon: Gavel },
  { name: "Add Auction", path: "/admin/add-auction", icon: Gavel },
  { name: "Messages", path: "/admin/messages", icon: MessageSquareMore },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sticky top-0 hidden h-screen w-80 flex-col border-r border-white/10 bg-[#081120]/95 backdrop-blur-xl md:flex">
      {/* Brand */}
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg">
            <img
              src="/akilo_logo.png"
              alt="AKILO Logo"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-wide text-white">
                AKILO
              </h1>
              <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Admin
              </span>
            </div>
            <p className="text-sm text-white/45">Real Estate Control Center</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
          <Sparkles size={16} className="text-emerald-300" />
          <p className="text-xs text-white/60">
            Manage properties, auctions, and user activity
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 px-4 py-6">
        <div>
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">
            Main
          </p>

          <div className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active =
                location.pathname === link.path ||
                location.pathname.startsWith(`${link.path}/`);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200 ${
                    active
                      ? "bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl transition ${
                      active
                        ? "bg-white/20"
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}
                  >
                    <Icon size={18} />
                  </span>

                  <span className="font-medium">{link.name}</span>

                  {active && (
                    <span className="ml-auto h-2.5 w-2.5 rounded-full bg-slate-950" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5">
            <LogOut size={18} />
          </span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}