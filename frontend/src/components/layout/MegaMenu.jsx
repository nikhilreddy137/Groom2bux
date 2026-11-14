import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarCheck, Camera, Globe, Ruler } from "lucide-react";
import { COLLECTIONS, CATEGORIES, OCCASIONS, SADRI_IMG, TRYON_IMG, collectionUrl, categoryUrl, occasionUrl, slug } from "@/lib/content";
import { facetCounts } from "@/lib/catalog";

const counts = facetCounts("");
const colHead = "eyebrow text-[var(--crimson)] mb-5";

const CollectionsPanel = () => (
  <div className="grid grid-cols-12 gap-10">
    <div className="col-span-3 flex flex-col justify-between">
      <div>
        <p className={colHead}>Signature collections</p>
        <p className="font-display text-4xl font-light leading-[1.02]">
          Six stories, <span className="italic">one groom.</span>
        </p>
        <p className="mt-4 text-sm text-[var(--stone)] leading-relaxed">Each collection is rooted in a different tradition — from temple gold to the grandest baraat entrance.</p>
      </div>
      <Link to="/collections" data-testid="mega-view-all-collections" className="btn-ink mt-8 w-fit">
        <span>View all collections</span>
        <ArrowRight size={16} />
      </Link>
    </div>
    <div className="col-span-9 grid grid-cols-6 gap-3">
      {COLLECTIONS.map((c, i) => (
        <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04, duration: 0.5 }}>
          <Link to={collectionUrl(c.id)} data-testid={`mega-collection-${c.id}`} className="group block img-zoom">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bone)]">
              <img src={c.img} alt={c.name} className="h-full w-full object-cover object-top" />
              <span className="absolute bottom-0 inset-x-0 h-1 bg-[var(--gold)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
            <p className="mt-3 font-display text-xl leading-tight group-hover:text-[var(--crimson)] transition-colors">{c.name}</p>
            <p className="mt-1 text-xs text-[var(--stone)] leading-snug">{c.line}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

const TextLink = ({ to, children, count, testid }) => (
  <Link to={to} data-testid={testid} className="group flex items-baseline justify-between gap-4 py-2 border-b border-[rgba(31,7,13,0.1)] hover:border-[var(--ink)] transition-colors">
    <span className="font-display text-2xl font-light leading-none group-hover:translate-x-1.5 group-hover:text-[var(--crimson)] transition-[transform,color] duration-300">{children}</span>
    {count != null && <span className="text-xs text-[var(--stone)] tabular-nums">{count}</span>}
  </Link>
);

const SERVICES = [
  { icon: Camera, label: "Virtual try-on", to: "/#tryon" },
  { icon: Ruler, label: "Made to measure", to: "/#process" },
  { icon: Globe, label: "Worldwide shipping", to: "/#stores" },
];

const Feature = ({ to, img, eyebrow, title, testid }) => (
  <Link to={to} data-testid={testid} className="group relative block overflow-hidden img-zoom bg-[var(--ink)] min-h-[240px]">
    <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(31,7,13,0.92)] via-[rgba(31,7,13,0.2)] to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5 text-[var(--ivory)] flex items-end justify-between gap-3">
      <div>
        <p className="eyebrow text-[var(--gold-light)] !text-[10px] mb-1.5">{eyebrow}</p>
        <p className="font-display text-2xl font-light leading-none">{title}</p>
      </div>
      <ArrowUpRight size={18} className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </div>
  </Link>
);

const ShopPanel = ({ onBook }) => (
  <div className="grid grid-cols-12 gap-10">
    <div className="col-span-3">
      <p className={colHead}>Shop by category</p>
      {CATEGORIES.map((c) => (
        <TextLink key={c.name} to={categoryUrl(c.name)} count={counts.category(c.name)} testid={`mega-category-${slug(c.name)}`}>
          {c.name}
        </TextLink>
      ))}
    </div>
    <div className="col-span-3">
      <p className={colHead}>Shop by occasion</p>
      {OCCASIONS.map((o) => (
        <TextLink key={o.name} to={occasionUrl(o.name)} count={counts.occasion(o.name)} testid={`mega-occasion-${slug(o.name)}`}>
          {o.name}
        </TextLink>
      ))}
    </div>
    <div className="col-span-2">
      <p className={colHead}>The GROOM2B way</p>
      <ul className="space-y-4">
        {SERVICES.map((s) => (
          <li key={s.label}>
            <Link to={s.to} className="link-underline inline-flex items-center gap-3 text-sm font-medium">
              <s.icon size={16} className="text-[var(--gold)]" /> {s.label}
            </Link>
          </li>
        ))}
        <li>
          <button type="button" data-testid="mega-book-stylist-btn" onClick={onBook} className="link-underline inline-flex items-center gap-3 text-sm font-medium">
            <CalendarCheck size={16} className="text-[var(--gold)]" /> Book a stylist
          </button>
        </li>
      </ul>
    </div>
    <div className="col-span-4 grid grid-cols-2 gap-3">
      <Feature to={occasionUrl("Wedding")} img={SADRI_IMG} eyebrow="The edit" title="Wedding day" testid="mega-feature-wedding" />
      <Feature to="/#tryon" img={TRYON_IMG} eyebrow="New" title="Try it on you" testid="mega-feature-tryon" />
    </div>
  </div>
);

export const MegaMenu = ({ which, onBook }) => (
  <motion.div
    data-testid={`mega-menu-${which}`}
    data-lenis-prevent
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="absolute inset-x-0 top-full bg-[var(--ivory)] text-[var(--ink)] border-t border-[rgba(31,7,13,0.1)] shadow-[0_40px_80px_rgba(31,7,13,0.18)] max-h-[calc(100vh-120px)] overflow-y-auto"
  >
    <div className="mx-auto max-w-[1440px] px-12 py-10">{which === "collections" ? <CollectionsPanel /> : <ShopPanel onBook={onBook} />}</div>
    <div className="hairline" />
  </motion.div>
);
