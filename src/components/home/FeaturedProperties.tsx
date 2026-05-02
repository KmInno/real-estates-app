import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

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

const categories = [
  {
    id: "cars",
    title: "Luxury & Commercial Cars",
    location: "International Market",
    tag: "Trending",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "buildings",
    title: "Modern Buildings & Offices",
    location: "Urban & Commercial Zones",
    tag: "Featured",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "farmland",
    title: "Agricultural & Farmland",
    location: "Rural & Investment Areas",
    tag: "High Demand",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "furniture",
    title: "Premium Furniture & Interiors",
    location: "Residential & Commercial",
    tag: "New Arrivals",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
  },
];

export function FeaturedCategories() {
  return (
    <section className="mx-auto px-4 py-12 md:px-8 md:py-16">
      {/* Header — centered, full-width */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-10 max-w-2xl text-center"
      >
        <div className="text-sm uppercase tracking-[0.25em] text-white/45">
          Featured categories
        </div>
        <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
          Cars, buildings, farmland & furniture
        </h2>
        <p className="mt-4 text-white/65">
          Explore our major asset categories available for sale, lease, and investment.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {categories.map((item) => (
          <motion.div key={item.id} variants={cardVariants} className="flex">
            <Link to={`/${item.id}`} className="group flex w-full">
              <Card className="flex w-full flex-col overflow-hidden rounded-3xl border-white/10 bg-slate-950 text-white shadow-2xl transition-colors group-hover:bg-slate-900">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <Badge>{item.tag}</Badge>
                  </div>
                </div>

                {/* Content — centered */}
                <CardContent className="flex flex-grow flex-col items-center justify-between p-5 text-center">
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-white/60">{item.location}</p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-6 w-full border-t border-white/10 pt-4 text-center text-sm font-medium text-emerald-300">
                    View listings →
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}