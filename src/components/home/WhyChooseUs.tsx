import { BadgeCheck, Globe2, ShieldCheck, Wallet } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

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
    <motion.div variants={cardVariants} className="h-full">
      <Card className="h-full rounded-3xl border-white/10 bg-white/5 shadow-xl">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-xl font-semibold">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why-us" className="border-y border-white/10 bg-white/3 py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="text-sm uppercase tracking-[0.25em] text-white/45">
            Why choose us
          </div>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
            We deliver a trusted and professional real estate journey
          </h2>
          <p className="mt-4 text-white/65">
            Our focus is real estate first: houses, buildings, land, farmland, and managing property professionally.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {trustItems.map((item) => (
            <TrustCard key={item.title} {...item} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}