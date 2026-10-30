const ITEMS = [
  "Custom sherwanis",
  "Pattu pancha",
  "Indo-westerns",
  "Designer suits & tuxedos",
  "Jodhpuri",
  "Sadris",
  "Virtual try-on",
  "Worldwide shipping",
];

export const Marquee = () => (
  <div data-testid="stats-marquee" className="bg-[var(--ivory)] border-y border-[rgba(18,16,16,0.12)] py-5 overflow-hidden">
    <div className="marquee-track">
      {[...ITEMS, ...ITEMS].map((t, i) => (
        <span key={i} className="flex items-center gap-8 pr-8 font-display text-2xl lg:text-3xl font-light text-[var(--ink)] whitespace-nowrap">
          {t}
          <span className="h-1.5 w-1.5 rotate-45 bg-[var(--crimson)]" />
        </span>
      ))}
    </div>
  </div>
);
