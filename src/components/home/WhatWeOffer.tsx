import { Truck, Sofa, TrendingUp, Megaphone, Trees, House } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

const services = [
  {
    icon: House,
    title: "Property Sales & Auctions",
    text: "Sell or auction houses, buildings, and commercial property with a premium presentation.",
  },
  {
    icon: Trees,
    title: "Residential Land & Farmland",
    text: "Manage and advertise residential land, commercial farmland, and other real estate plots.",
  },
  {
    icon: TrendingUp,
    title: "Leasing & Property Management",
    text: "Support leasing, managing, and marketing properties for long-term value.",
  },
  {
    icon: Truck,
    title: "Car Sale / Auctioning",
    text: "Offer vehicle sales and auctioning as a supporting business line.",
  },
  {
    icon: Sofa,
    title: "Furniture Sales",
    text: "List furniture products alongside your broader business services.",
  },
  {
    icon: Megaphone,
    title: "Advertising & Promotion",
    text: "Promote properties locally and internationally using a strong digital presence.",
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
    <motion.div variants={cardVariants} className="h-full">
      <Card className="h-full rounded-3xl border-white/10 bg-white/5 shadow-xl backdrop-blur-sm transition-colors hover:bg-white/[0.07]">
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

export function WhatWeOffer() {
  return (
    <section
      id="what-we-offer"
      className="relative py-16 text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2560&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        
      }}
    >
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 z-0 bg-slate-950/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="text-sm uppercase tracking-[0.25em] text-white/45">
            What we offer
          </div>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
            Real estate is the main line of the business
          </h2>
          <p className="mt-4 leading-8 text-white/65">
            The homepage leads with property services first, then shows supporting
            offerings like cars, furniture, and advertising.
          </p>
        </motion.div>

        {/* Highlight box */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-8 max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm leading-7 text-white/65 backdrop-blur-sm"
        >
          <p>
            <span className="font-semibold text-white">Main focus: </span>
            property sale, auctioning, leasing, land management, and commercial real estate.
          </p>
          <p className="mt-2">
            <span className="font-semibold text-white">Supporting services: </span>
            car auctioning, furniture sales, and property advertising.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}