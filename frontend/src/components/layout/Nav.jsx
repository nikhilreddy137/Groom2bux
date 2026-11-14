import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, ChevronDown, Menu, MessageCircle } from "lucide-react";
import { NAV_LINKS, WHATSAPP_URL, slug } from "@/lib/content";
import { useBooking } from "@/context/BookingContext";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const { openBooking } = useBooking();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMega(null);
    setDrawer(false);
  }, [location]);

  useEffect(() => {
    if (!drawer) return undefined;
    window.__lenis?.stop();
    return () => window.__lenis?.start();
  }, [drawer]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMega(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || Boolean(mega);
  const book = () => {
    setMega(null);
    setDrawer(false);
    openBooking();
  };

  return (
    <>
      <div data-testid="announcement-bar" className="fixed top-0 inset-x-0 z-50 h-8 bg-[var(--crimson)] text-[var(--ivory)] text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase flex items-center justify-center px-4 whitespace-nowrap overflow-hidden">
        <button type="button" data-testid="announcement-book-btn" onClick={book} className="uppercase tracking-[inherit] hover:text-[var(--gold-light)] transition-colors">
          <span className="sm:hidden">Wedding season 2026 · Free stylist consultation</span>
          <span className="hidden sm:inline">Wedding season 2026 · Book a free stylist consultation · Hyderabad & California</span>
        </button>
      </div>

      <motion.header
        data-testid="main-nav"
        onMouseLeave={() => setMega(null)}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-8 inset-x-0 z-50 transition-[background-color,border-color] duration-500 border-b ${
          mega ? "bg-[var(--ivory)] border-transparent" : scrolled ? "bg-[rgba(247,242,232,0.88)] backdrop-blur-xl border-[rgba(31,7,13,0.08)]" : "bg-transparent border-transparent"
        }`}
      >
        <div className={`mx-auto max-w-[1440px] px-6 lg:px-12 h-16 lg:h-[76px] flex items-center justify-between transition-colors duration-300 ${solid ? "text-[var(--ink)]" : "text-[var(--ivory)]"}`}>
          <Link to="/" data-testid="nav-logo" className="font-display text-2xl lg:text-3xl tracking-[0.18em] font-medium">
            GROOM<span className="text-[var(--gold)]">2</span>B
          </Link>

          <nav className="hidden lg:flex items-stretch h-full">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                data-testid={`nav-link-${slug(l.label)}`}
                aria-expanded={l.mega ? mega === l.mega : undefined}
                onMouseEnter={() => setMega(l.mega || null)}
                onFocus={() => setMega(l.mega || null)}
                className="relative inline-flex items-center gap-1.5 px-5 text-[12px] uppercase tracking-[0.22em] font-medium"
              >
                {l.label}
                {l.mega && <ChevronDown size={13} className={`transition-transform duration-300 ${mega === l.mega ? "rotate-180" : ""}`} />}
                <span className={`absolute left-5 right-5 bottom-0 h-[2px] bg-[var(--gold)] origin-left transition-transform duration-500 ${mega && mega === l.mega ? "scale-x-100" : "scale-x-0"}`} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="nav-whatsapp-btn"
              aria-label="Chat on WhatsApp"
              className={`hidden sm:inline-flex h-10 w-10 items-center justify-center border transition-colors duration-300 ${solid ? "border-[rgba(31,7,13,0.2)] hover:bg-[var(--ink)] hover:text-[var(--ivory)]" : "border-white/30 hover:bg-white hover:text-[var(--ink)]"}`}
            >
              <MessageCircle size={16} />
            </a>
            <button
              type="button"
              onClick={book}
              data-testid="nav-book-consultation-btn"
              className={`inline-flex items-center gap-2 px-3.5 sm:px-5 h-10 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 ${
                solid ? "bg-[var(--ink)] text-[var(--ivory)] hover:bg-[var(--crimson)]" : "bg-[var(--gold-light)] text-[var(--ink)] hover:bg-[var(--ivory)]"
              }`}
            >
              <CalendarCheck size={14} className="hidden sm:block" /> Book a stylist
            </button>
            <button type="button" data-testid="nav-menu-toggle" onClick={() => setDrawer(true)} className="lg:hidden h-10 w-10 -mr-2 inline-flex items-center justify-center" aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>

        <AnimatePresence>{mega && <MegaMenu key={mega} which={mega} onBook={book} />}</AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {mega && <motion.div data-testid="mega-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[rgba(15,3,6,0.5)] hidden lg:block" onMouseEnter={() => setMega(null)} />}
      </AnimatePresence>

      <AnimatePresence>{drawer && <MobileMenu onClose={() => setDrawer(false)} onBook={book} />}</AnimatePresence>
    </>
  );
};
