import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

type TopbarProps = {
  user: User;
  title?: string;
  subtitle?: string;
};

export default function Topbar({ user, title, subtitle }: TopbarProps) {
  const fullName =
    user?.user_metadata?.full_name || user?.user_metadata?.name || "Admin";

  const avatar =
    user?.user_metadata?.avatar_url || "https://via.placeholder.com/120?text=A";

  return (
    <header className="flex flex-col gap-4 border-b border-white/10 bg-[#081120] px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src="/akilo_logo.png" alt="AKILO Logo" className="h-8 w-8 rounded-lg" />
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                {title || "Dashboard"}
              </h2>
            </Link>
          </div>
          <p className="text-sm text-white/50">
            {subtitle || "Manage your real estate activities"}
          </p>
        </div>

        <Link
          to="/"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span>← Back to Homepage</span>
        </Link>
      </div>

      <div className="flex items-center justify-between md:justify-end">
        <Link
          to="/"
          className="md:hidden inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <span>← Home</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-medium text-white">{fullName}</div>
            <div className="text-sm text-white/50">{user?.email}</div>
          </div>

          <img
            src={avatar}
            alt="avatar"
            className="h-10 w-10 md:h-12 md:w-12 rounded-2xl object-cover"
          />
        </div>
      </div>
    </header>
  );
}
