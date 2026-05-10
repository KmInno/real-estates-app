import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { supabase } from "../lib/supabase";
import { getPropertyImageUrl } from "../lib/storage";
import { getAuctionByProperty } from "../lib/auctionApi";

import { HomeNavbar } from "../components/home/HomeNavbar";
import { HomeFooter } from "../components/home/HomeFooter";

import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

type PropertyItem = {
  id: string;
  title: string;
  location: string | null;
  price: number | null;
  image_url: string | null;
  type: string | null;
  status: string | null;
  description: string | null;
  created_at: string;
};

type PropertyWithAuction = PropertyItem & {
  auction?: {
    id: string;
    current_bid: number | null;
    starting_price: number | null;
    status: string | null;
    end_time: string | null;
  } | null;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export function Properties() {
  const [properties, setProperties] = useState<PropertyWithAuction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Properties error:", error.message);
          setProperties([]);
          return;
        }

        const propertyRows = (data ?? []) as PropertyItem[];

        const propertiesWithAuctions = await Promise.all(
          propertyRows.map(async (property) => {
            const auction = await getAuctionByProperty(property.id);

            return {
              ...property,
              auction,
            };
          })
        );

        setProperties(propertiesWithAuctions);
      } catch (error) {
        console.error("loadProperties crashed:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <HomeNavbar />

      {/* HERO */}
      <section className="border-b border-white/10 bg-gradient-to-b from-emerald-500/10 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl"
          >
            <div className="text-sm uppercase tracking-[0.25em] text-emerald-400">
              AKILO Real Estate Agencies
            </div>

            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              Browse Properties, Auctions & Investment Opportunities
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/65">
              Explore houses, buildings, farmland, commercial spaces, and
              auction-ready investment properties from AKILO Real Estate
              Agencies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROPERTIES */}
      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-white/60">Loading properties...</div>
          </div>
        ) : properties.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No properties available
            </h2>

            <p className="mt-3 text-white/60">
              Add properties from the admin dashboard.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-10 flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-white/45">
                  Property Listings
                </div>

                <h2 className="mt-2 text-3xl font-semibold">
                  Available Properties
                </h2>
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/60">
                {properties.length} Listings
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            >
              {properties.map((property) => {
                const currentBid =
                  property.auction?.current_bid ||
                  property.auction?.starting_price;

                return (
                  <motion.div
                    key={property.id}
                    variants={cardVariants}
                  >
                    <Card className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0d1625] text-white transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-[#111d31]">
                      {/* IMAGE */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={getPropertyImageUrl(property.image_url)}
                          alt={property.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                        <div className="absolute left-4 top-4 flex gap-2">
                          <Badge>
                            {property.type || "Property"}
                          </Badge>

                          {property.auction && (
                            <Badge>
                              Auction
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* CONTENT */}
                      <CardContent className="space-y-5 p-5">
                        <div>
                          <div className="text-sm text-white/50">
                            {property.location || "Location unavailable"}
                          </div>

                          <h3 className="mt-2 text-2xl font-semibold leading-snug">
                            {property.title}
                          </h3>
                        </div>

                        <p className="line-clamp-3 text-sm leading-7 text-white/60">
                          {property.description ||
                            "No description available for this property."}
                        </p>

                        {/* PRICE */}
                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                          <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-white/45">
                              Listed Price
                            </div>

                            <div className="mt-1 text-xl font-bold text-emerald-400">
                              {property.price
                                ? `$${Number(
                                    property.price
                                  ).toLocaleString()}`
                                : "N/A"}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs uppercase tracking-[0.2em] text-white/45">
                              Current Bid
                            </div>

                            <div className="mt-1 text-lg font-semibold text-white">
                              {currentBid
                                ? `$${Number(
                                    currentBid
                                  ).toLocaleString()}`
                                : "No bids"}
                            </div>
                          </div>
                        </div>

                        {/* AUCTION INFO */}
                        {property.auction && (
                          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs uppercase tracking-[0.2em] text-white/45">
                                  Auction Status
                                </div>

                                <div className="mt-1 font-semibold capitalize text-emerald-300">
                                  {property.auction.status}
                                </div>
                              </div>

                              {property.auction.end_time && (
                                <div className="text-right">
                                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">
                                    Ends
                                  </div>

                                  <div className="mt-1 text-sm text-white/75">
                                    {new Date(
                                      property.auction.end_time
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* BUTTON */}
                        <Link
                          to={`/property/${property.id}`}
                          className="block rounded-2xl bg-emerald-400 px-5 py-4 text-center font-semibold text-black transition hover:bg-emerald-300"
                        >
                          View Property & Bid
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </main>

      <HomeFooter />
    </div>
  );
}