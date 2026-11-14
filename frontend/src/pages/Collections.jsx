import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { CollectionHero, CollectionRail } from "@/components/shop/CollectionHero";
import { Filters } from "@/components/shop/Filters";
import { ProductCard } from "@/components/shop/ProductCard";
import { QuickView } from "@/components/shop/QuickView";
import { Modal } from "@/components/common/Modal";
import { useBooking } from "@/context/BookingContext";
import { scrollToTop } from "@/hooks/useLenis";
import { PRICE_BANDS, SORTS, activeFilterCount, filterProducts, readFilters } from "@/lib/catalog";

const PAGE = 12;

const Chips = ({ f, update, clear }) => {
  const chips = [
    ...f.category.map((v) => ({ key: "category", v, label: v })),
    ...f.occasion.map((v) => ({ key: "occasion", v, label: v })),
    ...f.price.map((v) => ({ key: "price", v, label: PRICE_BANDS.find((b) => b.id === v)?.label })),
  ];
  if (!chips.length && !f.q) return null;
  return (
    <div data-testid="active-filter-chips" className="flex flex-wrap items-center gap-2 mb-8">
      {chips.map((c) => (
        <button key={c.key + c.v} type="button" onClick={() => update({ [c.key]: f[c.key].filter((x) => x !== c.v) })} className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--ivory)] pl-3 pr-2 py-1.5 text-xs hover:bg-[var(--crimson)] transition-colors">
          {c.label} <X size={13} />
        </button>
      ))}
      {f.q && (
        <button type="button" onClick={() => update({ q: "" })} className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--ivory)] pl-3 pr-2 py-1.5 text-xs hover:bg-[var(--crimson)] transition-colors">
          “{f.q}” <X size={13} />
        </button>
      )}
      <button type="button" data-testid="clear-filters-btn" onClick={clear} className="link-underline text-xs uppercase tracking-[0.2em] font-semibold ml-2">
        Clear all
      </button>
    </div>
  );
};

export default function CollectionsPage() {
  const [params, setParams] = useSearchParams();
  const f = useMemo(() => readFilters(params), [params]);
  const items = useMemo(() => filterProducts(f), [f]);
  const [shown, setShown] = useState(PAGE);
  const [quick, setQuick] = useState(null);
  const [sheet, setSheet] = useState(false);
  const { openBooking } = useBooking();
  const nActive = activeFilterCount(f);

  useEffect(() => setShown(PAGE), [params]);
  useEffect(() => scrollToTop(), [f.c]);

  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      const val = Array.isArray(v) ? v.join(",") : v;
      if (val && val !== "featured") next.set(k, val);
      else next.delete(k);
    });
    setParams(next, { replace: true });
  };
  const clear = () => setParams(f.c ? { c: f.c } : {}, { replace: true });
  const visible = items.slice(0, shown);

  return (
    <main data-testid="collections-page" className="bg-[var(--ivory)]">
      <CollectionHero active={f.c} />
      <CollectionRail active={f.c} />

      <div data-testid="shop-toolbar" className="sticky top-24 lg:top-[108px] z-30 bg-[rgba(247,242,232,0.94)] backdrop-blur-xl border-b border-[rgba(31,7,13,0.1)]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 h-14 lg:h-16 flex items-center gap-3 lg:gap-6">
          <button type="button" data-testid="open-filters-btn" onClick={() => setSheet(true)} className="lg:hidden inline-flex items-center gap-2 h-10 px-3 border border-[rgba(31,7,13,0.2)] text-[11px] uppercase tracking-[0.2em] font-semibold">
            <SlidersHorizontal size={14} /> Filters{nActive ? ` (${nActive})` : ""}
          </button>
          <p data-testid="shop-result-count" className="hidden sm:block text-sm text-[var(--stone)] whitespace-nowrap">
            <span className="font-semibold text-[var(--ink)]">{items.length}</span> styles
          </p>
          <label className="hidden md:flex flex-1 max-w-sm items-center gap-2 border-b border-[rgba(31,7,13,0.25)] focus-within:border-[var(--ink)] transition-colors">
            <Search size={15} className="text-[var(--stone)]" />
            <input data-testid="shop-search-input" value={f.q} onChange={(e) => update({ q: e.target.value })} placeholder="Search sherwani, tuxedo, pancha…" className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-[rgba(31,7,13,0.4)]" />
          </label>
          <label className="ml-auto flex items-center gap-2 text-sm">
            <span className="hidden sm:inline text-[var(--stone)]">Sort</span>
            <select data-testid="shop-sort-select" value={f.sort} onChange={(e) => update({ sort: e.target.value })} className="h-10 bg-transparent border border-[rgba(31,7,13,0.2)] px-3 text-sm font-medium outline-none focus:border-[var(--ink)]">
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-10 lg:py-16 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <aside className="hidden lg:block lg:col-span-3">
          <div data-lenis-prevent className="sticky top-[196px] max-h-[calc(100vh-220px)] overflow-y-auto no-scrollbar pr-2">
            <Filters f={f} update={update} />
          </div>
        </aside>

        <section className="lg:col-span-9 min-w-0">
          <Chips f={f} update={update} clear={clear} />
          {items.length === 0 ? (
            <div data-testid="shop-empty-state" className="border border-[rgba(31,7,13,0.14)] bg-[var(--bone)] p-10 lg:p-16 text-center">
              <p className="font-display text-4xl font-light">Nothing matches — yet.</p>
              <p className="mt-3 text-[var(--stone)] max-w-md mx-auto">Every GROOM2B outfit is made to order, so a stylist can create exactly what you have in mind.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={clear} className="btn-outline border-[rgba(31,7,13,0.25)] hover:bg-[var(--ink)] hover:text-[var(--ivory)]">
                  Clear filters
                </button>
                <button type="button" data-testid="empty-book-btn" onClick={() => openBooking()} className="btn-gold">
                  Book a stylist
                </button>
              </div>
            </div>
          ) : (
            <div data-testid="shop-product-grid" className="grid grid-cols-2 xl:grid-cols-3 gap-x-3 sm:gap-x-5 gap-y-10 lg:gap-y-14">
              {visible.map((p, i) => (
                <ProductCard key={p.id} p={p} i={i} onQuickView={setQuick} />
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-14 lg:mt-20 flex flex-col items-center">
              <p data-testid="shop-progress-text" className="text-sm text-[var(--stone)]">
                Showing {visible.length} of {items.length}
              </p>
              <div className="mt-3 h-[2px] w-56 bg-[rgba(31,7,13,0.12)]">
                <div className="h-full bg-[var(--crimson)] transition-[width] duration-500" style={{ width: `${(visible.length / items.length) * 100}%` }} />
              </div>
              {shown < items.length && (
                <button type="button" data-testid="shop-load-more-btn" onClick={() => setShown((n) => n + PAGE)} className="btn-ink mt-8">
                  <span>Load more styles</span>
                </button>
              )}
            </div>
          )}
        </section>
      </div>

      <section data-testid="collections-cta" className="relative bg-[var(--maroon-deep)] text-[var(--ivory)] overflow-hidden grain">
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 py-20 lg:py-28 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-2xl">
            <p className="eyebrow text-[var(--gold-light)] mb-5">Can't decide?</p>
            <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl leading-[0.98]">
              Let a stylist build <span className="italic gold-text pr-2">your look</span> with you.
            </h2>
          </div>
          <button type="button" data-testid="collections-cta-book-btn" onClick={() => openBooking()} className="btn-gold w-fit">
            Book a stylist <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Modal open={sheet} onClose={() => setSheet(false)} testid="filters-sheet" label="Filters" className="lg:hidden flex flex-col h-[86svh] bg-[var(--ivory)] text-[var(--ink)]">
        <header className="flex items-center justify-between h-14 px-6 shrink-0 border-b border-[rgba(31,7,13,0.12)]">
          <p className="eyebrow">Filters{nActive ? ` · ${nActive} applied` : ""}</p>
          <button type="button" data-testid="filters-sheet-close" onClick={() => setSheet(false)} aria-label="Close filters" className="h-10 w-10 -mr-2 inline-flex items-center justify-center">
            <X size={18} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Filters f={f} update={update} />
        </div>
        <footer className="shrink-0 flex gap-3 p-4 border-t border-[rgba(31,7,13,0.12)]">
          <button type="button" onClick={clear} className="btn-outline flex-1 justify-center !px-3 border-[rgba(31,7,13,0.25)]">
            Clear
          </button>
          <button type="button" data-testid="filters-sheet-apply" onClick={() => setSheet(false)} className="btn-gold flex-[2] !px-3">
            Show {items.length} styles
          </button>
        </footer>
      </Modal>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </main>
  );
}
