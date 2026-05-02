import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export function HomeContact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-15 pb-16 md:px-8">
      <Card className="overflow-hidden rounded-[2rem] border-white/10 bg-gradient-to-r from-white/10 to-emerald-400/10 shadow-2xl">
        <CardContent className="grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-1 text-sm text-white/80">
              Ready to list a property?
            </div>
            <h2 className="mt-5 text-3xl font-semibold md:text-5xl">
              Let buyers discover your property the right way.
            </h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Add contact details, WhatsApp, or a booking form so potential buyers can reach you quickly.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <h3 className="text-xl font-semibold">Get in touch</h3>
            <p className="mt-2 text-sm text-white/60">Use this area for the main contact call-to-action.</p>
            <div className="mt-5 flex gap-3">
              <Button className="rounded-full bg-white text-slate-950 hover:bg-white/90">Contact Us</Button>
              <Button variant="outline" className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">
                WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
