import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { PRODUCTS, PRODUCT_TABS, formatINR } from "@/lib/content";

export const Arrivals = () => {
  const [tab, setTab] = useState(PRODUCT_TABS[0]);
  const items = PRODUCTS.filter((p) => p.cat === tab);

  return (
    <section id="arrivals" data-testid="arrivals-section" className="bg-[var(--ivory)] py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <SectionHead eyebrow="Latest arrivals" title={["New this season."]} />
          <Reveal delay={0.2}>
            <div data-testid="arrivals-category-filter-tabs" className="flex gap-2 flex-wrap">
              {PRODUCT_TABS.map((t) => (
                <button
                  key={t}
                  data-testid={`arrivals-tab-${t.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={() => setTab(t)}
                  className={`relative px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] font-semibold border transition-colors duration-300 ${
                    tab === t ? "bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]" : "border-[rgba(18,16,16,0.2)] hover:border-[var(--ink)]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div data-testid="arrivals-product-grid" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.article
                key={p.name}
                layout
                data-testid={`product-card-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bone)] img-zoom">
                  <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                  <button
                    data-testid={`product-quickview-btn-${i}`}
                    className="absolute bottom-4 right-4 h-11 w-11 bg-[var(--ivory)] text-[var(--ink)] inline-flex items-center justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[opacity,transform] duration-500 hover:bg-[var(--crimson)] hover:text-[var(--ivory)]"
                    aria-label="Quick view"
                  >
                    <Plus size={18} />
                  </button>
                  <span className="absolute top-4 left-4 eyebrow bg-[var(--ivory)] px-3 py-1.5 text-[var(--ink)]">Made to measure</span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl leading-tight font-light max-w-[18ch]">{p.name}</h3>
                  <p data-testid={`product-price-${i}`} className="text-sm font-semibold tracking-wide whitespace-nowrap pt-1.5">
                    {formatINR(p.price)}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
