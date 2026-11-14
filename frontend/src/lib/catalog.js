import PRODUCTS from "./products.json";

export { PRODUCTS };

export const shopImg = (src, w = 700) => `${src}?width=${w}`;

export const PRICE_BANDS = [
  { id: "under-25", label: "Under ₹25,000", min: 0, max: 25000 },
  { id: "25-50", label: "₹25,000 – ₹50,000", min: 25000, max: 50000 },
  { id: "50-80", label: "₹50,000 – ₹80,000", min: 50000, max: 80000 },
  { id: "80-plus", label: "₹80,000 & above", min: 80000, max: Infinity },
];

export const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Name: A to Z" },
];

const list = (v) => (v ? v.split(",").filter(Boolean) : []);

export const readFilters = (params) => ({
  c: params.get("c") || "",
  category: list(params.get("category")),
  occasion: list(params.get("occasion")),
  price: list(params.get("price")),
  q: params.get("q") || "",
  sort: params.get("sort") || "featured",
});

export const inCollection = (c) => (c ? PRODUCTS.filter((p) => p.collections.includes(c)) : PRODUCTS);

const SORTERS = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name),
};

export const filterProducts = (f) => {
  const bands = PRICE_BANDS.filter((b) => f.price.includes(b.id));
  const q = f.q.trim().toLowerCase();
  const out = inCollection(f.c).filter(
    (p) =>
      (!f.category.length || f.category.includes(p.category)) &&
      (!f.occasion.length || p.occasions.some((o) => f.occasion.includes(o))) &&
      (!bands.length || bands.some((b) => p.price >= b.min && p.price < b.max)) &&
      (!q || `${p.name} ${p.category}`.toLowerCase().includes(q))
  );
  return SORTERS[f.sort] ? [...out].sort(SORTERS[f.sort]) : out;
};

export const facetCounts = (c) => {
  const base = inCollection(c);
  const count = (fn) => base.filter(fn).length;
  return {
    category: (name) => count((p) => p.category === name),
    occasion: (name) => count((p) => p.occasions.includes(name)),
    price: (id) => {
      const b = PRICE_BANDS.find((x) => x.id === id);
      return count((p) => p.price >= b.min && p.price < b.max);
    },
  };
};

export const activeFilterCount = (f) => f.category.length + f.occasion.length + f.price.length + (f.q ? 1 : 0);
