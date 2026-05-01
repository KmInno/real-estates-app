import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

export function SearchProperty() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 md:px-8">
      <Card className="rounded-3xl border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
        <CardContent className="grid gap-4 p-5 md:grid-cols-[1.5fr_1fr_auto] md:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              placeholder="Search by property name or location"
              className="h-12 rounded-2xl border-white/10 bg-slate-950/80 pl-11 text-white placeholder:text-white/35"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Live Auction", "Featured", "Closing Soon"].map((item) => (
              <Button
                key={item}
                variant="outline"
                className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                {item}
              </Button>
            ))}
          </div>
          <Button className="h-12 rounded-full bg-emerald-400 px-6 text-slate-950 hover:bg-emerald-300">
            Search
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}