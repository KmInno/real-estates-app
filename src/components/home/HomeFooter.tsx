import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export function HomeFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 py-14 text-white backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* 4-column grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1 — Brand */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={columnVariants}
            className="flex flex-col gap-4"
          >
            <div className="text-2xl font-bold tracking-tight">
              AKILO <span className="text-emerald-400">Real Estate</span>
            </div>
            <p className="text-sm leading-7 text-white/55">
              A premium platform for property sales, auctions, leasing, and
              investment. Connecting serious buyers and sellers locally and
              internationally.
            </p>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={columnVariants}
            className="flex flex-col gap-4"
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
              Quick links
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-white/65">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-white">
                  Contact us
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3 — Links */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={columnVariants}
            className="flex flex-col gap-4"
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
              Links
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-white/65">
              <li>
                <Link to="/faq" className="transition-colors hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/listings" className="transition-colors hover:text-white">
                  Listings
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 4 — Find us */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={columnVariants}
            className="flex flex-col gap-4"
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
              Find us
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-white/65">
              <li>
                <a
                  href="mailto:info@akilorealestate.com"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
                  info@akilorealestate.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+256700000000"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
                  +256 700 000 000
                </a>
              </li>
            </ul>

            {/* Social icons */}
            <div className="mt-2 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/55 transition-colors hover:border-white/20 hover:text-white"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/55 transition-colors hover:border-white/20 hover:text-white"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/55 transition-colors hover:border-white/20 hover:text-white"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/35"
        >
          © 2026 AKILO Real Estate Agencies. All rights reserved.
        </motion.div>

      </div>
    </footer>
  );
}