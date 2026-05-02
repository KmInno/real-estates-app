import { motion } from "framer-motion";
import { BadgeCheck, Globe2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const values = [
    {
        icon: ShieldCheck,
        title: "Trust & transparency",
        text: "We present property information clearly so buyers and sellers can make confident decisions.",
    },
    {
        icon: Globe2,
        title: "Global reach",
        text: "Our platform is designed for local and international clients who value premium presentation.",
    },
    {
        icon: Users,
        title: "Client-first service",
        text: "We focus on making every inquiry, viewing, and listing process simple and professional.",
    },
    {
        icon: BadgeCheck,
        title: "Verified quality",
        text: "We prioritize well-presented, credible listings that support serious property transactions.",
    },
];

function ValueCard({
    icon: Icon,
    title,
    text,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    text: string;
}) {
    return (
        <Card className="h-full rounded-3xl border-white/10 bg-white/5 shadow-xl transition hover:-translate-y-1 hover:bg-white/[0.07]">
            <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950">
                    <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
            </CardContent>
        </Card>
    );
}

export function AboutUs() {
    return (
        <div className="bg-[#07111f] text-white">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(13,148,136,0.14),transparent_24%)]" />
                <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-1 text-sm text-white/80">
                            <Sparkles className="mr-2 h-4 w-4" /> About AuctionPrime
                        </div>
                        <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
                            A premium property platform built for serious buyers and sellers.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                            We help showcase property in a polished, trustworthy way so clients can explore, compare, and take action with confidence.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Button className="rounded-full bg-white text-slate-950 hover:bg-white/90">
                                View Properties
                            </Button>
                            <Button variant="outline" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                                Contact Us
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Story */}
            <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                    <div>
                        <div className="text-sm uppercase tracking-[0.25em] text-white/45">Our story</div>
                        <h2 className="mt-2 text-3xl font-semibold md:text-4xl">We believe property deserves a better presentation.</h2>
                        <p className="mt-5 text-white/65 leading-8">
                            This platform was created to give property owners a modern way to present listings and auction opportunities. Our goal is to make the experience feel clear, elegant, and credible from the first click.
                        </p>
                        <p className="mt-4 text-white/65 leading-8">
                            Whether the client is local or international, the experience should inspire trust and make discovery easy on both desktop and mobile.
                        </p>
                    </div>

                    <Card className="rounded-[2rem] border-white/10 bg-white/5 shadow-2xl">
                        <CardContent className="p-8 md:p-10">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <div className="text-3xl font-semibold">01</div>
                                    <div className="mt-2 text-lg font-semibold">Present clearly</div>
                                    <p className="mt-2 text-sm text-white/65 leading-7">High-quality listings, simple layouts, and strong visuals.</p>
                                </div>
                                <div>
                                    <div className="text-3xl font-semibold">02</div>
                                    <div className="mt-2 text-lg font-semibold">Build trust</div>
                                    <p className="mt-2 text-sm text-white/65 leading-7">Transparent details and a professional feel throughout.</p>
                                </div>
                                <div>
                                    <div className="text-3xl font-semibold">03</div>
                                    <div className="mt-2 text-lg font-semibold">Drive action</div>
                                    <p className="mt-2 text-sm text-white/65 leading-7">Encourage inquiries, bids, and contact with confidence.</p>
                                </div>
                                <div>
                                    <div className="text-3xl font-semibold">04</div>
                                    <div className="mt-2 text-lg font-semibold">Scale globally</div>
                                    <p className="mt-2 text-sm text-white/65 leading-7">Designed for premium users across regions and markets.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Mission / Vision */}
            <section className="border-y border-white/10 bg-white/3 py-16">
                <div className="mx-auto max-w-7xl px-4 md:px-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="rounded-3xl border-white/10 bg-white/5 shadow-xl">
                            <CardContent className="p-6 md:p-8">
                                <h3 className="text-2xl font-semibold">Our mission</h3>
                                <p className="mt-4 text-white/65 leading-8">
                                    To help property owners and buyers connect through a premium digital experience that is easy to use, visually strong, and built on trust.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="rounded-3xl border-white/10 bg-white/5 shadow-xl">
                            <CardContent className="p-6 md:p-8">
                                <h3 className="text-2xl font-semibold">Our vision</h3>
                                <p className="mt-4 text-white/65 leading-8">
                                    To become a leading international property auction and listing platform recognized for clarity, professionalism, and excellent presentation.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
                <div className="max-w-2xl">
                    <div className="text-sm uppercase tracking-[0.25em] text-white/45">Our values</div>
                    <h2 className="mt-2 text-3xl font-semibold md:text-4xl">The principles behind the platform</h2>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {values.map((item) => (
                        <ValueCard key={item.title} {...item} />
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
                <Card className="overflow-hidden rounded-[2rem] border-white/10 bg-gradient-to-r from-white/10 to-emerald-400/10 shadow-2xl">
                    <CardContent className="grid gap-6 p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
                        <div>
                            <h2 className="text-3xl font-semibold md:text-4xl">Let’s build a stronger property brand together.</h2>
                            <p className="mt-4 max-w-2xl text-white/70 leading-8">
                                Use this page to introduce your business, your standards, and why clients should trust your platform.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                            <p className="text-sm text-white/60">Ready to continue?</p>
                            <div className="mt-4 flex gap-3">
                                <Button className="rounded-full bg-white text-slate-950 hover:bg-white/90">Contact Us</Button>
                                <Button variant="outline" className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">Properties</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>


    );
}