import { Menu, X, Building2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#07111f]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white text-black p-2 rounded-xl">
            <Building2 size={18} />
          </div>
          <span className="font-semibold text-lg">AuctionPrime</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm text-white/70">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-white/70">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
        </div>
      )}
    </header>
  );
}