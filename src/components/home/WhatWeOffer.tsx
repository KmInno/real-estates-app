import { Headphones, House, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const services = [
  {
    icon: House,
    title: "Property Marketing",
    text: "Show premium homes, land, and commercial properties in a polished layout.",
  },
  {
    icon: TrendingUp,
    title: "Property Auctions",
    text: "Highlight live auctions, bid history, and closing timelines with confidence.",
  },
  {
    icon: Users,
    title: "Buyer Engagement",
    text: "Capture leads, inquiries, and serious buyers through a premium experience.",
  },
  {
    icon: Headphones,
    title: "Client Support",
    text: "Make contact easy with forms, WhatsApp, and direct consultation options.",
  },
];

function ServiceCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
     return (
    <Card className="h-full rounded-3xl border-white/10 bg-white/5 shadow-xl transition hover:-translate-y-1 hover:bg-white/[0.07]">
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

export function WhatWeOffer() {
  return (
    <section id="what-we-offer" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="max-w-2xl">
          <div className="text-sm uppercase tracking-[0.25em] text-white/45">What we offer</div>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
            Tailored property services for serious buyers and sellers
          </h2>
          <p className="mt-4 text-white/65">
            A short service overview helps the client understand what the brand actually does, beyond just showing listings.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}