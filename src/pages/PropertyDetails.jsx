import { useParams } from "react-router-dom";
import { properties } from "../data/properties";
import { Button } from "../components/ui/button";

export function PropertyDetails() {
  const { id } = useParams();

  const property = properties.find(
    (p) => p.id === Number(id)
  );

  if (!property) {
    return (
      <div className="p-10 text-white">
        Property not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      {/* Image */}
      <img
        src={property.image}
        className="w-full h-[350px] md:h-[450px] object-cover rounded-2xl"
      />

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-10 mt-8">
        
        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold">
            {property.title}
          </h1>

          <p className="text-white/60 mt-2">
            {property.location}
          </p>

          <p className="mt-6 text-white/70">
            Premium property listing with high investment value. Full description will be added later.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="bg-white/5 p-3 rounded-xl text-center">
              Beds
            </div>
            <div className="bg-white/5 p-3 rounded-xl text-center">
              Baths
            </div>
            <div className="bg-white/5 p-3 rounded-xl text-center">
              Area
            </div>
          </div>
        </div>

        {/* Right - Auction Panel */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">
            Auction Panel
          </h2>

          <div className="mt-4">
            <p className="text-white/60 text-sm">
              Starting Price
            </p>
            <p className="text-2xl font-bold">
              {property.price}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-white/60 text-sm">
              Current Bid
            </p>
            <p className="text-2xl font-bold text-green-400">
              {property.bid ?? "No bids yet"}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-white/60 text-sm">
              Auction Ends In
            </p>
            <p className="text-lg">
              48:12:09
            </p>
          </div>

          <Button className="w-full mt-6">
            Place Bid
          </Button>
        </div>
      </div>
    </div>
  );
}