import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MessageCircle, Phone, Plus, X } from "lucide-react";
import { COLLECTIONS, CATEGORIES, OCCASIONS, WHATSAPP_URL, collectionUrl, categoryUrl, occasionUrl, slug } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1];

const Section = ({ id, title, open, onToggle, children }) => (
  <div className="border-b border-white/12">
    <button type="button" data-testid={`mobile-menu-section-${id}`} aria-expanded={open} onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left">
      <span className="font-display text-4xl font-light leading-none">{title}</span>
      <Plus size={22} className={`text-[var(--gold-light)] transition-transform duration-500 ${open ? "rotate-45" : ""}`} />
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
          <div className="pb-6">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const PLAIN = [
  { label: "Virtual Try-On", to: "/#tryon" },
  { label: "Real Grooms", to: "/#reviews" },
  { label: "Stores", to: "/#stores" },
];

export const MobileMenu = ({ onClose, onBook }) => {
  const [open, setOpen] = useState("collections");
  const toggle = (id) => setOpen((v) => (v === id ? null : id));

  return (
    <motion.div
      data-testid="mobile-menu"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.55, ease: EASE }}
      className="fixed inset-0 z-[60] bg-[var(--ink)] text-[var(--ivory)] flex flex-col lg:hidden"
    >
      <div className="flex items-center justify-between h-16 px-6 shrink-0 border-b border-white/12">
        <Link to="/" onClick={onClose} className="font-display text-2xl tracking-[0.18em] font-medium">
          GROOM<span className="text-[var(--gold)]">2</span>B
        </Link>
        <button type="button" data-testid="mobile-menu-close" onClick={onClose} aria-label="Close menu" className="h-10 w-10 -mr-2 inline-flex items-center justify-center">
          <X size={22} />
        </button>
      </div>

      <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 pb-6">
        <Section id="collections" title="Collections" open={open === "collections"} onToggle={() => toggle("collections")}>
          <div className="grid grid-cols-2 gap-3">
            {COLLECTIONS.map((c) => (
              <Link key={c.id} to={collectionUrl(c.id)} onClick={onClose} data-testid={`mobile-menu-collection-${c.id}`} className="relative block aspect-[4/5] overflow-hidden">
                <img src={c.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(31,7,13,0.9)] to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 font-display text-xl leading-none">{c.name}</span>
              </Link>
            ))}
          </div>
          <Link to="/collections" onClick={onClose} data-testid="mobile-menu-all-collections" className="mt-4 inline-flex items-center gap-2 eyebrow text-[var(--gold-light)]">
            View all collections <ArrowUpRight size={14} />
          </Link>
        </Section>

        <Section id="category" title="Shop by category" open={open === "category"} onToggle={() => toggle("category")}>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
            {CATEGORIES.map((c) => (
              <li key={c.name}>
                <Link to={categoryUrl(c.name)} onClick={onClose} data-testid={`mobile-menu-category-${slug(c.name)}`} className="flex items-center gap-3">
                  <img src={c.img} alt="" loading="lazy" className="h-12 w-12 object-cover object-top shrink-0" />
                  <span className="text-sm font-medium">{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="occasion" title="Shop by occasion" open={open === "occasion"} onToggle={() => toggle("occasion")}>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((o) => (
              <Link key={o.name} to={occasionUrl(o.name)} onClick={onClose} data-testid={`mobile-menu-occasion-${slug(o.name)}`} className="border border-white/25 px-4 py-2.5 text-sm">
                {o.name}
              </Link>
            ))}
          </div>
        </Section>

        {PLAIN.map((l) => (
          <Link key={l.to} to={l.to} onClick={onClose} data-testid={`mobile-menu-link-${slug(l.label)}`} className="flex items-center justify-between py-5 border-b border-white/12 font-display text-4xl font-light leading-none">
            {l.label} <ArrowUpRight size={20} className="text-[var(--gold-light)]" />
          </Link>
        ))}
      </div>

      <div className="shrink-0 p-4 border-t border-white/12 flex gap-2 bg-[var(--ink-2)]">
        <button type="button" data-testid="mobile-menu-book-btn" onClick={onBook} className="btn-gold flex-1 !px-4">
          Book a stylist
        </button>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp" data-testid="mobile-menu-whatsapp" className="h-[52px] w-[52px] border border-white/25 inline-flex items-center justify-center">
          <MessageCircle size={18} />
        </a>
        <a href="tel:+919515100372" aria-label="Call" data-testid="mobile-menu-call" className="h-[52px] w-[52px] border border-white/25 inline-flex items-center justify-center">
          <Phone size={18} />
        </a>
      </div>
    </motion.div>
  );
};
