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
  <div data-testid="stats-marquee" className="bg-[var(--crimson)] py-5 overflow-hidden">
    <div className="marquee-track">
      {[...ITEMS, ...ITEMS].map((t, i) => (
        <span key={i} className="flex items-center gap-8 pr-8 font-display text-2xl lg:text-3xl font-light text-[var(--ivory)] whitespace-nowrap">
          {t}
          <span className="h-1.5 w-1.5 rotate-45 bg-[var(--gold-light)]" />
        </span>
      ))}
    </div>
  </div>
);
