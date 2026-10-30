import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { OCCASIONS, SADRI_IMG } from "@/lib/content";

export const Occasions = () => {
  const [active, setActive] = useState(1);
  const img = OCCASIONS[active]?.img ?? SADRI_IMG;

  return (
    <section id="occasions" data-testid="occasions-section" className="bg-[var(--bone)] py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-6 lg:sticky lg:top-32 self-start">
          <SectionHead eyebrow="Shop by occasion" title={["Every ceremony,", "dressed right."]} copy="From the quiet dignity of a dhoti ceremony to the full colour of sangeet night — hover a moment to see how we dress it." />
          <Reveal delay={0.3} className="mt-12 relative aspect-[4/5] max-w-md overflow-hidden bg-[var(--ivory)]">
            <AnimatePresence mode="wait">
              <motion.img
                key={img}
                src={img}
                alt={OCCASIONS[active].name}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </AnimatePresence>
          </Reveal>
        </div>

        <ul data-testid="occasions-list" className="lg:col-span-6 lg:pt-24 divide-y divide-[rgba(18,16,16,0.15)] border-y border-[rgba(18,16,16,0.15)]">
          {OCCASIONS.map((o, i) => (
            <Reveal key={o.name} delay={i * 0.05}>
              <li>
                <a
                  href="#contact"
                  data-testid={`occasion-item-${o.name.toLowerCase().replace(/\s/g, "-")}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group flex items-center justify-between py-7 lg:py-9 transition-colors duration-300 ${active === i ? "text-[var(--crimson)]" : "text-[var(--ink)]"}`}
                >
                  <div className="flex items-baseline gap-6">
                    <span className="eyebrow text-[var(--stone)] w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-4xl lg:text-6xl font-light leading-none">{o.name}</span>
                  </div>
                  <ArrowRight size={22} className={`transition-transform duration-500 ${active === i ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-30"}`} />
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
