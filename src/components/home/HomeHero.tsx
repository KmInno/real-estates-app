"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/* ---------------- Countdown ---------------- */
const pad2 = (n: number) => String(n).padStart(2, "0");

function useCountdown(endAtMs: number) {
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const total = Math.max(0, Math.floor((endAtMs - now) / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return { h, m, s };
}

function CountdownText({ endAtMs }: { endAtMs: number }) {
  const { h, m, s } = useCountdown(endAtMs);
  return (
    <span className="tabular-nums">
      {pad2(h)}:{pad2(m)}:{pad2(s)}
    </span>
  );
}

/* ---------------- Animated Counter ---------------- */
function AnimatedCounter({ value, suffix = "", compact }: { value: number; suffix?: string; compact?: boolean }) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 120, damping: 18 });

  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.2 });
    return () => controls.stop();
  }, [inView, value, mv]);

  React.useEffect(() => {
    return spring.on("change", (v) => {
      const rounded = Math.round(v);
      const formatted = compact
        ? new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(rounded)
        : rounded.toLocaleString();
      setDisplay(formatted);
    });
  }, [spring, compact]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/* ---------------- Stats ---------------- */
const heroStats = [
  { value: 250, suffix: "+", label: "Real estate listings" },
  { value: 24, label: "Countries served" },
  { value: 8500, label: "Verified buyers", compact: true },
  { value: 1200, suffix: "+", label: "Successful deals", compact: true },
];

function HeroStat({ value, label, suffix, compact }: { value: number; label: string; suffix?: string; compact?: boolean }) {
  return (
    <Card className="rounded-2xl border-white/10 bg-white/5 text-white backdrop-blur-md">
      <div className="p-5">
        <div className="text-3xl font-semibold">
          <AnimatedCounter value={value} suffix={suffix} compact={compact} />
        </div>
        <div className="mt-1 text-sm text-white/65">{label}</div>
      </div>
    </Card>
  );
}

/* ---------------- Hero ---------------- */
export default function HomeHero() {
  const [auctionEnd] = React.useState(() => Date.now() + 48 * 60 * 60 * 1000);

  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(13,148,136,0.16),transparent_24%)]" />

      <div className="relative mx-auto grid max-w-7xl items-stretch gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
            Buy, sell, auction, and lease property with confidence.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
            AKILO Real Estate Agencies helps clients market houses, commercial farmland, residential land, and premium properties locally and internationally.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button className="h-12 rounded-full bg-white px-6 text-slate-950 hover:bg-white/90" onClick={() => window.location.href = '/properties'}>Browse Properties</Button>
            <Button variant="outline" className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-white hover:bg-white/10">Contact Us</Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {heroStats.map((s) => (
              <HeroStat key={s.label} {...s} />
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
          <Card className="h-full overflow-hidden rounded-[2rem] border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
            <div className="relative h-full min-h-[420px] md:min-h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80"
                alt="Luxury property"
                className="h-full w-full object-cover"
              />F              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

              <div className="absolute left-5 top-5 rounded-full bg-black/35 px-4 py-2 text-sm backdrop-blur-md">
                Featured real estate listing
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-3xl border border-white/10 bg-slate-950/80 p-5 backdrop-blur-xl sm:grid-cols-3">
                <div>
                  <div className="text-xs text-white/50">Starting price</div>
                  <div className="text-xl font-semibold">$1,800,000</div>
                </div>
                <div>
                  <div className="text-xs text-white/50">Auction ends</div>
                  <div className="text-xl font-semibold">
                    <CountdownText endAtMs={auctionEnd} />
                  </div>
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
