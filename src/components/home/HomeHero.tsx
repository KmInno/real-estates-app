import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

const heroStats = [
  { value: "120+", label: "Luxury listings" },
  { value: "24", label: "Countries served" },
  { value: "8.5k", label: "Verified buyers" },
  { value: "1.2k+", label: "Successful auctions" },
];

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <Card className="rounded-2xl border-white/10 bg-white/5 text-white shadow-lg backdrop-blur-md">
      <div className="p-5">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        <div className="mt-1 text-sm text-white/65">{label}</div>
      </div>
    </Card>
  );
}

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(13,148,136,0.16),transparent_24%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
            <Badge className="rounded-full border border-white/10 bg-white/10 px-4 py-1 text-white hover:bg-white/10">
            <Sparkles className="mr-2 h-4 w-4" /> Premium property auction platform
          </Badge>

          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
            Elevate your real estate experience with premium auction listings.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
            Showcase luxury properties, attract serious buyers, and create a polished international marketplace for auctions and direct inquiries.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button className="h-12 rounded-full bg-white px-6 text-slate-950 hover:bg-white/90">
              Browse Properties <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {heroStats.map((item) => (
              <HeroStat key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative z-10"
                  >
          <Card className="overflow-hidden rounded-[2rem] border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
            <div className="relative h-[420px] md:h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80"
                alt="Luxury property"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full bg-black/35 px-4 py-2 text-sm text-white backdrop-blur-md">
                Featured international listing
              </div>
              <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-3xl border border-white/10 bg-slate-950/80 p-5 backdrop-blur-xl sm:grid-cols-3">
                <div>
                  <div className="text-xs text-white/50">Starting bid</div>
                  <div className="text-xl font-semibold">$1,800,000</div>
                </div>
                <div>
                  <div className="text-xs text-white/50">Auction ends</div>
                  <div className="text-xl font-semibold">48:12:09</div>
                </div>
                <div>
                  <div className="text-xs text-white/50">Verified buyers</div>
                  <div className="text-xl font-semibold">1,250+</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}