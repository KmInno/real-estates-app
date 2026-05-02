import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchProperty() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-15 pb-8 md:px-8">
      <Card className="rounded-3xl border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
        <CardContent className="p-5 md:p-8">
          <form
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Location
              </label>
              <select
                required
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 text-white outline-none focus:border-white/30"
              >
                <option>Ajman</option>
                <option>Sharjah</option>
                <option>Al Ain</option>
                <option>Umm Al Quwain</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Property Type
              </label>
              <select
                required
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 text-white outline-none focus:border-white/30"
              >
                <option>Modern House</option>
                <option>Apartment</option>
                <option>Office & Apartment</option>
                <option>Smart Town</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Price Range
              </label>
              <select
                required
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 text-white outline-none focus:border-white/30"
              >
                <option>$85,000</option>
                <option>$100,000</option>
                <option>$130,000</option>
                <option>$150,000</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Your Name
              </label>
              <Input
                placeholder="John Doe"
                className="h-12 rounded-2xl border-white/10 bg-slate-950/80 text-white placeholder:text-white/40"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="+971 xxx xxx xxx"
                className="h-12 rounded-2xl border-white/10 bg-slate-950/80 text-white placeholder:text-white/40"
              />
            </div>

            {/* Submit */}
            <div className="flex items-end">
              <Button className="h-12 w-full rounded-full bg-emerald-400 px-6 text-slate-950 hover:bg-emerald-300">
                Search Properties
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}