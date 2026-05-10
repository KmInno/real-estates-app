import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import type { PostgrestError } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { getPropertyImageUrl } from "../lib/storage";
import {
  getAuctionByProperty,
  getBids,
  placeBid,
} from "../lib/auctionApi";

import { HomeNavbar } from "../components/home/HomeNavbar";
import { HomeFooter } from "../components/home/HomeFooter";
import { createConversation, getConversation } from "../lib/messageApi";

type Property = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  price: number | null;
  image_url: string | null;
  type: string | null;
  status: string | null;
  created_by: string;
};

type Auction = {
  id: string;
  property_id: string;
  current_bid: number;
  starting_price: number;
  minimum_increment: number;
  end_time: string;
  status: string;
};

type Bid = {
  id: string;
  amount: number;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  };
};

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  const [bidAmount, setBidAmount] = useState("");
  const [placingBid, setPlacingBid] = useState(false);

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("properties")
        .select("id, title, description, location, price, image_url, type, status, created_by")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error.message);
        setLoading(false);
        return;
      }

      // Ensure created_by exists before setting property
      if (data && !data.created_by) {
        console.warn("Property has no created_by");
      }

      setProperty(data);

      const auctionData = await getAuctionByProperty(id);

      if (auctionData) {
        setAuction(auctionData);

        const bidsData = await getBids(auctionData.id);
        setBids(bidsData);
      }

      setLoading(false);
    })();
  }, [id]);

  async function handleBid() {
    try {
      if (!auction) {
        alert("Auction not found");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first");
        return;
      }

      const amount = Number(bidAmount);

      if (!amount || amount <= 0) {
        alert("Enter a valid bid amount");
        return;
      }

      const minimumBid =
        Number(auction.current_bid || auction.starting_price) +
        Number(auction.minimum_increment || 0);

      if (amount < minimumBid) {
        alert(`Minimum bid is $${minimumBid.toLocaleString()}`);
        return;
      }

      setPlacingBid(true);

      await placeBid(auction.id, user.id, amount);

      alert("Bid placed successfully");

      setBidAmount("");

      // Reload auction data
      if (id) {
        const auctionData = await getAuctionByProperty(id);
        if (auctionData) {
          setAuction(auctionData);
          const bidsData = await getBids(auctionData.id);
          setBids(bidsData);
        }
      }
    } catch (error) {
      const err = error as PostgrestError | Error;
      console.error(error);

      alert((err instanceof Error ? err.message : "Failed to place bid") || "Failed to place bid");
    } finally {
      setPlacingBid(false);
    }
  }

async function handleMessageSeller() {
  try {
    // get logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // user not logged in
    if (!user) {
      alert("Please login first");
      return;
    }

    // property not loaded
    if (!property) {
      alert("Property not found");
      return;
    }

    // seller / property owner
    const sellerId = property.created_by;

    // property has no owner
    if (!sellerId || sellerId.trim() === "") {
      alert("This property has no seller information yet. Please contact support.");
      console.error("Property missing created_by:", property);
      return;
    }

    // prevent user messaging themselves
    if (sellerId === user.id) {
      alert("You cannot message yourself.");
      return;
    }

    // check existing conversation
    const existingConversation = await getConversation(
      property.id,
      user.id
    );

    let conversation;

    // reuse old conversation
    if (existingConversation) {
      conversation = existingConversation;
    } else {
      // create new conversation
      conversation = await createConversation(
        property.id,
        user.id,
        sellerId
      );
    }

    // open chat page
    navigate(`/messages/${conversation.id}`);
  } catch (error) {
    console.error("Message seller error:", error);
    alert("Failed to start conversation");
  }
}

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111f] text-white">
        Loading property...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111f] text-white">
        Property not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      <HomeNavbar />

      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <Link
          to="/properties"
          className="mb-8 inline-block text-sm text-emerald-400 hover:text-emerald-300"
        >
          ← Back to properties
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <img
              src={getPropertyImageUrl(property.image_url)}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* DETAILS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-white/45">
                {property.type || "Property"}
              </div>

              <h1 className="mt-2 text-3xl font-semibold md:text-5xl">
                {property.title}
              </h1>

              <p className="mt-4 text-white/65">
                {property.location || "Location not specified"}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm uppercase tracking-[0.2em] text-white/45">
                Listed Price
              </div>

              <div className="mt-2 text-3xl font-bold text-emerald-400">
                {property.price
                  ? `$${Number(property.price).toLocaleString()}`
                  : "Not available"}
              </div>
            </div>

            {/* AUCTION BLOCK */}
            {auction ? (
              <div className="space-y-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-white/45">
                      Current Highest Bid
                    </div>

                    <div className="mt-2 text-4xl font-bold text-emerald-400">
                      $
                      {Number(
                        auction.current_bid || auction.starting_price
                      ).toLocaleString()}
                    </div>
                  </div>

                  <div className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black">
                    {auction.status}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm text-white/50">
                      Minimum Increment
                    </div>

                    <div className="mt-1 text-xl font-semibold">
                      $
                      {Number(
                        auction.minimum_increment
                      ).toLocaleString()}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm text-white/50">
                      Auction Ends
                    </div>

                    <div className="mt-1 text-xl font-semibold">
                      {new Date(auction.end_time).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* BID INPUT */}
                <div className="space-y-3">
                  <label className="block text-sm text-white/65">
                    Enter your bid amount
                  </label>

                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 text-white outline-none transition focus:border-emerald-400"
                  />

                  <button
                    onClick={handleBid}
                    disabled={placingBid}
                    className="w-full rounded-2xl bg-emerald-400 px-6 py-4 font-semibold text-black transition hover:bg-emerald-300 disabled:opacity-50"
                  >
                    {placingBid ? "Placing Bid..." : "Place Bid"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-6 text-yellow-200">
                This property currently has no active auction.
              </div>
            )}

            {/* DESCRIPTION */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold">
                Property Description
              </h2>

              <p className="mt-4 leading-8 text-white/70">
                {property.description ||
                  "No description has been added for this property yet."}
              </p>
            </div>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/256704857019"
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-5 text-center font-semibold text-emerald-300 transition hover:bg-emerald-400/20"
            >
              Contact AKILO Real Estate on WhatsApp
            </a>
            <button
              onClick={handleMessageSeller}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-medium transition hover:bg-white/10"
            >
              Message Seller
            </button>
          </motion.div>
        </div>

        {/* BID HISTORY */}
        {auction && (
          <section className="mt-16">
            <div className="mb-6">
              <div className="text-sm uppercase tracking-[0.25em] text-white/45">
                Auction Activity
              </div>

              <h2 className="mt-2 text-3xl font-semibold">
                Bid History
              </h2>
            </div>

            {bids.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/60">
                No bids have been placed yet.
              </div>
            ) : (
              <div className="space-y-4">
                {bids.map((bid) => (
                  <div
                    key={bid.id}
                    className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          bid.profiles?.avatar_url ||
                          "https://ui-avatars.com/api/?name=User"
                        }
                        alt="User"
                        className="h-12 w-12 rounded-full object-cover"
                      />

                      <div>
                        <div className="font-semibold">
                          {bid.profiles?.full_name || "Anonymous User"}
                        </div>

                        <div className="text-sm text-white/50">
                          {new Date(
                            bid.created_at
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="text-2xl font-bold text-emerald-400">
                      ${Number(bid.amount).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <HomeFooter />
    </div>
  );
}