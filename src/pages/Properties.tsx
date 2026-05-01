import { PropertyCard } from "../components/PropertyCard";
import { properties } from "../data/properties";

export function Properties() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        All Properties
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
