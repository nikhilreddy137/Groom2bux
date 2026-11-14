import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { COLLECTIONS, EDITORIAL_IMG } from "@/lib/content";
import { inCollection } from "@/lib/catalog";

const ALL = {
  id: "",
  name: "All collections",
  line: "Every signature line in one place",
  story: "Sherwanis, pattu pancha, indo-westerns and tailoring from all six signature collections — every piece made to your measure.",
  img: EDITORIAL_IMG,
};

export const CollectionHero = ({ active }) => {
  const c = COLLECTIONS.find((x) => x.id === active) || ALL;
  return (
    <section data-testid="collection-hero" className="relative bg-[var(--ink)] text-[var(--ivory)] overflow-hidden grain">
      <AnimatePresence mode="wait">
        <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
          <img src={c.img} alt="" className="h-full w-full object-cover object-[center_18%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[rgba(31,7,13,0.78)] to-[rgba(31,7,13,0.55)] lg:bg-gradient-to-r lg:from-[var(--ink)] lg:via-[rgba(31,7,13,0.55)] lg:to-[rgba(31,7,13,0.1)]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 pt-36 lg:pt-48 pb-12 lg:pb-20">
        <nav data-testid="breadcrumb" aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#c9c2b3]">
          <Link to="/" className="link-underline">Home</Link>
          <ChevronRight size={12} />
          {active ? (
            <Link to="/collections" className="link-underline">Collections</Link>
          ) : (
            <span className="text-[var(--gold-light)]">Collections</span>
          )}
          {active && (
            <>
              <ChevronRight size={12} />
              <span className="text-[var(--gold-light)]">{c.name}</span>
            </>
          )}
        </nav>

        <motion.div key={c.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mt-8 max-w-2xl">
          <p className="eyebrow text-[var(--gold-light)] mb-4 flex items-center gap-4">
            <span className="h-px w-10 bg-[var(--gold)]" /> {active ? "Signature collection" : "The GROOM2B edit"}
          </p>
          <h1 data-testid="collection-title" className="font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.01em]">
            {c.name}
          </h1>
          <p className="mt-5 font-display italic text-2xl text-[var(--gold-light)]">{c.line}</p>
          <p className="mt-4 text-base text-[#d5cfc0] leading-relaxed max-w-xl">{c.story}</p>
          <p data-testid="collection-count" className="mt-8 eyebrow text-[#b5aa9c]">
            {inCollection(c.id).length} styles · made to measure
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export const CollectionRail = ({ active }) => (
  <div data-testid="collection-rail" className="bg-[var(--bone)] border-b border-[rgba(31,7,13,0.1)]">
    <div className="mx-auto max-w-[1440px] flex gap-3 lg:gap-4 overflow-x-auto no-scrollbar px-6 lg:px-12 py-5">
      {[ALL, ...COLLECTIONS].map((c) => {
        const on = c.id === active;
        return (
          <Link key={c.id || "all"} to={c.id ? `/collections?c=${c.id}` : "/collections"} data-testid={`collection-rail-${c.id || "all"}`} aria-current={on ? "page" : undefined} className={`group shrink-0 flex items-center gap-3 pr-5 border transition-colors duration-300 ${on ? "bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]" : "bg-[var(--ivory)] border-[rgba(31,7,13,0.12)] hover:border-[var(--ink)]"}`}>
            <span className="h-14 w-12 overflow-hidden shrink-0">
              <img src={c.img} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
            </span>
            <span className="font-display text-xl leading-none whitespace-nowrap">{c.id ? c.name : "All"}</span>
            {on && <span className="h-1.5 w-1.5 rotate-45 bg-[var(--gold-light)]" />}
          </Link>
        );
      })}
    </div>
  </div>
);
