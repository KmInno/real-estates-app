import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { properties } from "../../data/properties";

export function FeaturedProperties() {
  return (
    <section id="properties" className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="max-w-2xl">
        <div className="text-sm uppercase tracking-[0.25em] text-white/45">Discover more</div>
        <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Featured properties</h2>
        <p className="mt-4 text-white/65">
          A premium list of standout properties to help buyers explore quickly and confidently.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.slice(0, 3).map((property) => (
          <Link key={property.id} to={`/property/${property.id}`} className="group">
            <Card className="overflow-hidden rounded-3xl border-white/10 bg-slate-950 text-white shadow-2xl transition duration-300 group-hover:-translate-y-1 group-hover:bg-slate-900">
              <div className="relative">
                <img src={property.image} alt={property.title} className="h-72 w-full object-cover" />
                <div className="absolute left-4 top-4">
                  <Badge>{property.label ?? "Featured"}</Badge>
                </div>
              </div>
              <CardContent className="space-y-4 p-5">
                <div>
                  <p className="text-sm text-white/60">{property.location}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{property.title}</h3>
                </div>
                <div className="flex items-end justify-between border-t border-white/10 pt-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/50">Starting Price</div>
                    <div className="text-xl font-semibold">{property.price}</div>
                  </div>
                                    <div className="text-right">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/50">Top Bid</div>
                    <div className="text-xl font-semibold text-emerald-300">{property.bid ?? "No bids yet"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}