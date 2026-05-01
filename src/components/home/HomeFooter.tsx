import { Link } from "react-router-dom";

export function HomeFooter() {
  return (
    <footer className="border-t border-white/10 py-8 text-sm text-white/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div>© 2026 AuctionPrime. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  );
}