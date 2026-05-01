import { BadgeCheck, Globe2, ShieldCheck, Wallet } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Trusted listings",
    text: "We present clear property details, strong visuals, and transparent auction status.",
  },
  {
    icon: Globe2,
    title: "International reach",
    text: "Built for local and overseas buyers who want a premium cross-border experience.",
  },
  {
    icon: Wallet,
    title: "Auction-ready",
    text: "Designed to support bidding, countdowns, and serious high-value transactions.",
  },
  {
    icon: BadgeCheck,
    title: "Professional support",
    text: "Reliable communication and guided property handling from first view to final bid.",
  },
];

function TrustCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
      return (
    <Card className="h-full rounded-3xl border-white/10 bg-white/5 shadow-xl">
      <CardContent className="p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-5 text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
      </CardContent>
    </Card>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why-us" className="border-y border-white/10 bg-white/3 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl">
          <div className="text-sm uppercase tracking-[0.25em] text-white/45">Why choose us</div>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
            We deliver a trusted and professional real estate journey
          </h2>
          <p className="mt-4 text-white/65">
            This section builds confidence quickly, just like a serious property brand should.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => (
            <TrustCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}