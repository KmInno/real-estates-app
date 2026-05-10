import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { signInWithGoogle } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";

export function HomeNavbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // check auth state on load
useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);
  });

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user ?? null);
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/akilo_logo.png" alt="AKILO Logo" className="h-15 w-15 rounded-lg" />
          <div>
            <div className="text-lg font-semibold leading-none">AKILO</div>
            <div className="text-xs text-white/50">Real Estate Agencies</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm text-white/75 md:flex">
          <a href="/properties" className="hover:text-white">Properties</a>
          <a href="/about" className="hover:text-white">Why Choose Us</a>
          <a href="/what-we-offer" className="hover:text-white">What We Offer</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </nav>

        {/* Auth Button */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <button
              onClick={signInWithGoogle}
              className="bg-white text-black px-4 py-2 rounded-xl"
            >
              Sign in with Google
            </button>
          ) : (
            <Link
              to="/dashboard"
              className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="rounded-xl border border-white/10 p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-white/75">
            <a href="/properties">Properties</a>
            <a href="/about">Why Choose Us</a>
            <a href="/what-we-offer">What We Offer</a>
            <a href="/contact">Contact</a>

            <div className="pt-3 border-t border-white/10">
              {!user ? (
                <button
                  onClick={signInWithGoogle}
                  className="bg-white text-black px-4 py-2 rounded-xl w-full"
                >
                  Sign in with Google
                </button>
              ) : (
                <Link
                  to="/dashboard"
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl block text-center"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}