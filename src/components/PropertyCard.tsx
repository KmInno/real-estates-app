type Property = {
  id: number;
  title: string;
  location: string;
  price: string;
  bid?: string;
  image: string;
};

import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link to={`/property/${property.id}`}>
      <Card className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:scale-[1.02] transition">
        <img
          src={property.image}
          className="h-52 md:h-60 w-full object-cover"
        />

        <CardContent className="p-4 md:p-5">
          <h3 className="text-lg md:text-xl font-semibold">
            {property.title}
          </h3>

          <p className="text-sm text-white/60 mt-1">
            {property.location}
          </p>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold">{property.price}</span>
            <span className="text-sm text-green-400">
              {property.bid ?? "No bids"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}