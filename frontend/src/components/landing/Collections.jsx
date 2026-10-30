import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { COLLECTIONS } from "@/lib/content";

const Card = ({ c, i }) => (
  <Reveal delay={(i % 3) * 0.08} className={`${c.span} group relative overflow-hidden bg-[var(--bone)] img-zoom`}>
    <a href="#contact" data-testid={`collection-card-${c.id}`} className="block h-full min-h-[320px] lg:min-h-0">
      <img src={c.img} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,16,16,0.85)] via-[rgba(18,16,16,0.15)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-[var(--ivory)] flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-[var(--gold-light)] mb-2">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="font-display text-3xl lg:text-4xl font-light leading-none">{c.name}</h3>
          <p className="mt-2 text-sm text-[#cfc6b8] max-w-xs">{c.line}</p>
        </div>
        <span className="h-11 w-11 shrink-0 border border-white/30 inline-flex items-center justify-center transition-[background-color,color,transform] duration-500 group-hover:bg-[var(--ivory)] group-hover:text-[var(--ink)] group-hover:-translate-y-1">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </a>
  </Reveal>
);

export const Collections = () => (
  <section id="collections" data-testid="collections-section" className="bg-[var(--ivory)] py-28 lg:py-40">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
        <SectionHead
          eyebrow="Signature collections"
          title={["Curated for every", "wedding moment."]}
          copy="Six named collections, each rooted in a different tradition — from temple gold to the grandest baraat entrance."
        />
        <Reveal delay={0.3}>
          <a href="#contact" data-testid="collections-view-all-link" className="link-underline eyebrow text-[var(--ink)]">
            View all collections
          </a>
        </Reveal>
      </div>

      <div data-testid="collections-bento-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[380px_380px] gap-3">
        {COLLECTIONS.map((c, i) => (
          <Card key={c.id} c={c} i={i} />
        ))}
      </div>
    </div>
  </section>
);
