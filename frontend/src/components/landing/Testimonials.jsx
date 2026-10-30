import { Star } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { TESTIMONIALS, GALLERY } from "@/lib/content";

const Stars = () => (
  <span className="flex gap-1 text-[var(--gold-light)]">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={12} fill="currentColor" />
    ))}
  </span>
);

export const Testimonials = () => (
  <section id="reviews" data-testid="testimonials-section" className="relative bg-[var(--ink)] text-[var(--ivory)] py-28 lg:py-40 overflow-hidden grain">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12 relative z-10">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
        <SectionHead dark eyebrow="Real grooms, real moments" title={["Loved by", "twenty thousand grooms."]} />
        <Reveal delay={0.2}>
          <div data-testid="rating-badges" className="flex gap-10">
            {[
              ["Google", "4.8", "374 reviews"],
              ["Justdial", "4.8", "369 reviews"],
            ].map(([src, score, n]) => (
              <div key={src}>
                <p className="font-display text-5xl font-light leading-none">{score}</p>
                <Stars />
                <p className="eyebrow text-[#a69d8f] mt-2">
                  {src} · {n}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div data-testid="client-reviews-grid" className="grid lg:grid-cols-3 gap-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1} className="group relative bg-[var(--ink-2)] border border-white/[0.06] p-8 lg:p-10 flex flex-col justify-between min-h-[420px] overflow-hidden">
            <img src={t.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top opacity-0 group-hover:opacity-25 transition-opacity duration-700" />
            <div className="relative">
              <span className="font-display text-7xl leading-none text-[var(--gold)]">“</span>
              <p className="font-display text-2xl lg:text-[1.7rem] leading-snug font-light -mt-6">{t.quote}</p>
            </div>
            <div className="relative mt-10 flex items-center gap-4">
              <img src={t.img} alt={t.name} loading="lazy" className="h-12 w-12 object-cover object-top" />
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-[#a69d8f]">{t.meta}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div data-testid="client-gallery" className="mt-20 grid grid-cols-4 lg:grid-cols-8 gap-2">
        {GALLERY.map((g, i) => (
          <Reveal key={g} delay={i * 0.04} className="aspect-[3/4] overflow-hidden img-zoom">
            <img src={g} alt="GROOM2B client" loading="lazy" className="h-full w-full object-cover object-top grayscale hover:grayscale-0 transition-[filter,transform] duration-700" />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
