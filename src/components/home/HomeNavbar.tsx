import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Menu, X } from "lucide-react";
import { Button } from "../ui/button";

export function HomeNavbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-lg">
                        <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-lg font-semibold leading-none">AuctionPrime</div>
                        <div className="text-xs text-white/50">International property auctions</div>
                    </div>
                </Link>

                <nav className="hidden items-center gap-8 text-sm text-white/75 md:flex">
                    <a href="#properties" className="hover:text-white">Properties</a>
                    <a href="#why-us" className="hover:text-white">Why Choose Us</a>
                    <a href="#what-we-offer" className="hover:text-white">What We Offer</a>
                    <a href="#contact" className="hover:text-white">Contact</a>
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <Button variant="outline" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                        Login
                    </Button>
                    <Button className="rounded-full bg-white text-slate-950 hover:bg-white/90">
                        Register
                    </Button>
                </div>
                <button
                    className="rounded-xl border border-white/10 p-2 md:hidden"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {open && (
                <div className="border-t border-white/10 px-4 py-4 md:hidden">
                    <div className="flex flex-col gap-3 text-sm text-white/75">
                        <a href="#properties">Properties</a>
                        <a href="#why-us">Why Choose Us</a>
                        <a href="#what-we-offer">What We Offer</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>
            )}
        </header>
    );
}