import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = !scrolled;

  return (
    <>
      <div
        data-testid="announcement-bar"
        className="fixed top-0 inset-x-0 z-50 h-8 bg-[var(--crimson)] text-[var(--ivory)] text-[11px] tracking-[0.22em] uppercase flex items-center justify-center"
      >
        Wedding season 2026 · Book a free stylist consultation · Hyderabad & California
      </div>
      <motion.header
        data-testid="main-nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-8 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
          scrolled
            ? "bg-[rgba(243,238,228,0.82)] backdrop-blur-xl border-[rgba(18,16,16,0.08)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div
          className={`mx-auto max-w-[1440px] px-6 lg:px-12 h-16 lg:h-[76px] flex items-center justify-between ${
            dark ? "text-[var(--ivory)]" : "text-[var(--ink)]"
          }`}
        >
          <a href="#top" data-testid="nav-logo" className="font-display text-2xl lg:text-3xl tracking-[0.18em] font-medium">
            GROOM<span className="text-[var(--gold)]">2</span>B
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                className="link-underline text-[12px] uppercase tracking-[0.22em] font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919515100372"
              data-testid="nav-whatsapp-btn"
              className={`hidden sm:inline-flex h-10 w-10 items-center justify-center border transition-colors duration-300 ${
                dark ? "border-white/30 hover:bg-white hover:text-[var(--ink)]" : "border-black/20 hover:bg-[var(--ink)] hover:text-[var(--ivory)]"
              }`}
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="#contact"
              data-testid="nav-book-consultation-btn"
              className={`hidden sm:inline-flex items-center px-5 h-10 text-[11px] uppercase tracking-[0.22em] font-semibold transition-colors duration-300 ${
                dark ? "bg-[var(--ivory)] text-[var(--ink)] hover:bg-[var(--gold-light)]" : "bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--crimson)]"
              }`}
            >
              Book a stylist
            </a>
            <button
              data-testid="nav-menu-toggle"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden h-10 w-10 inline-flex items-center justify-center"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--ink)] text-[var(--ivory)] pt-32 px-8 flex flex-col gap-6"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="font-display text-5xl font-light"
              >
                {l.label}
              </motion.a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-ink mt-6 !bg-[var(--ivory)] !text-[var(--ink)] w-fit">
              <span>Book a stylist</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
