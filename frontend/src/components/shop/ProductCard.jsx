import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { formatINR } from "@/lib/content";
import { shopImg } from "@/lib/catalog";

export const ProductCard = ({ p, i, onQuickView }) => (
  <motion.article
    data-testid={`shop-product-card-${i}`}
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 6) * 0.05 }}
    className="group"
  >
    <button type="button" onClick={() => onQuickView(p)} data-testid={`shop-product-open-${i}`} className="relative block w-full aspect-[3/4] overflow-hidden bg-[var(--bone)] text-left">
      <img src={shopImg(p.img)} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-[transform,opacity] duration-700 group-hover:scale-[1.04]" />
      {p.img2 && <img src={shopImg(p.img2)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-700 lg:group-hover:opacity-100" />}
      <span className="absolute top-3 left-3 bg-[var(--ivory)] text-[var(--ink)] px-2.5 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold">Made to measure</span>
      <span className="absolute inset-x-3 bottom-3 hidden lg:flex items-center justify-center gap-2 h-11 bg-[var(--ivory)] text-[var(--ink)] text-[11px] uppercase tracking-[0.22em] font-semibold translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[opacity,transform] duration-500">
        <Eye size={15} /> Quick view
      </span>
    </button>
    <div className="mt-4">
      <p className="eyebrow !text-[10px] text-[var(--crimson)]">{p.category}</p>
      <h3 className="mt-1.5 font-display text-xl sm:text-2xl leading-[1.1] font-light line-clamp-2">{p.name}</h3>
      <p data-testid={`shop-product-price-${i}`} className="mt-2 text-sm font-semibold tracking-wide">
        {formatINR(p.price)}
      </p>
    </div>
  </motion.article>
);
