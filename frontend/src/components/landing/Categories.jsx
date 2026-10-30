import { Reveal, SectionHead } from "./Reveal";
import { CATEGORIES } from "@/lib/content";

export const Categories = () => (
  <section id="categories" data-testid="categories-section" className="bg-[var(--bone)] py-28 lg:py-36 overflow-hidden">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12 mb-14">
      <SectionHead
        eyebrow="Shop by category"
        title={["Masterfully crafted,", "head to hem."]}
      />
    </div>
    <div className="pl-6 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] flex gap-4 overflow-x-auto pb-6 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CATEGORIES.map((c, i) => (
        <Reveal key={c.name} delay={i * 0.06} className="snap-start shrink-0 w-[240px] lg:w-[300px]">
          <a href="#contact" data-testid={`category-card-${c.name.toLowerCase().replace(/\s/g, "-")}`} className="group block img-zoom">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--ivory)]">
              <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 flex items-baseline justify-between border-b border-[rgba(18,16,16,0.2)] pb-3">
              <h3 className="font-display text-2xl font-light">{c.name}</h3>
              <span className="eyebrow text-[var(--stone)] group-hover:text-[var(--crimson)] transition-colors">Explore</span>
            </div>
          </a>
        </Reveal>
      ))}
      <div className="shrink-0 w-6" />
    </div>
  </section>
);
