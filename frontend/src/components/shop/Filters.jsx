import { Check } from "lucide-react";
import { CATEGORIES, OCCASIONS, slug } from "@/lib/content";
import { PRICE_BANDS, facetCounts } from "@/lib/catalog";

const Option = ({ group, id, label, count, on, onClick }) => (
  <li>
    <button type="button" role="checkbox" aria-checked={on} disabled={!count && !on} data-testid={`filter-${group}-${slug(id)}`} onClick={onClick} className="group w-full flex items-center gap-3 py-2 text-left text-sm disabled:opacity-35">
      <span className={`h-[18px] w-[18px] shrink-0 inline-flex items-center justify-center border transition-colors duration-200 ${on ? "bg-[var(--ink)] border-[var(--ink)] text-[var(--gold-light)]" : "border-[rgba(31,7,13,0.35)] group-hover:border-[var(--ink)]"}`}>
        {on && <Check size={12} strokeWidth={3} />}
      </span>
      <span className={`flex-1 ${on ? "font-semibold" : ""}`}>{label}</span>
      <span className="text-xs text-[var(--stone)] tabular-nums">{count}</span>
    </button>
  </li>
);

const Group = ({ title, children }) => (
  <fieldset className="border-t border-[rgba(31,7,13,0.14)] py-6 first:border-t-0 first:pt-0">
    <legend className="eyebrow text-[var(--ink)] mb-3 float-left w-full">{title}</legend>
    <ul className="clear-both">{children}</ul>
  </fieldset>
);

export const Filters = ({ f, update }) => {
  const counts = facetCounts(f.c);
  const toggle = (key, id) => update({ [key]: f[key].includes(id) ? f[key].filter((x) => x !== id) : [...f[key], id] });

  return (
    <div data-testid="shop-filters">
      <Group title="Category">
        {CATEGORIES.map((c) => (
          <Option key={c.name} group="category" id={c.name} label={c.name} count={counts.category(c.name)} on={f.category.includes(c.name)} onClick={() => toggle("category", c.name)} />
        ))}
      </Group>
      <Group title="Occasion">
        {OCCASIONS.map((o) => (
          <Option key={o.name} group="occasion" id={o.name} label={o.name} count={counts.occasion(o.name)} on={f.occasion.includes(o.name)} onClick={() => toggle("occasion", o.name)} />
        ))}
      </Group>
      <Group title="Price">
        {PRICE_BANDS.map((b) => (
          <Option key={b.id} group="price" id={b.id} label={b.label} count={counts.price(b.id)} on={f.price.includes(b.id)} onClick={() => toggle("price", b.id)} />
        ))}
      </Group>
    </div>
  );
};
