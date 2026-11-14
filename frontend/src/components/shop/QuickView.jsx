import { useEffect, useState } from "react";
import { CalendarCheck, MessageCircle, Ruler, Scissors, Truck, X } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { useBooking } from "@/context/BookingContext";
import { formatINR, WHATSAPP_URL } from "@/lib/content";
import { shopImg } from "@/lib/catalog";

const PERKS = [
  [Ruler, "Cut to your measurements — in studio or over video"],
  [Scissors, "Fabric, colour and embroidery can be customised"],
  [Truck, "Delivered worldwide, with a final fitting before the day"],
];

export const QuickView = ({ product, onClose }) => {
  const { openBooking } = useBooking();
  const [shown, setShown] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (product) {
      setShown(product);
      setActive(0);
    }
  }, [product]);

  const p = shown;
  const imgs = p ? [p.img, p.img2].filter(Boolean) : [];
  const book = () => {
    onClose();
    openBooking({ interest: p.name, outfits: [p.category], occasion: p.occasions[0] });
  };

  return (
    <Modal open={Boolean(product)} onClose={onClose} testid="quickview-modal" label="Product quick view" className="lg:max-w-[980px] max-h-[94svh] lg:max-h-[88vh] overflow-y-auto bg-[var(--ivory)] text-[var(--ink)]">
      {p && (
        <div className="grid lg:grid-cols-2">
          <div className="relative bg-[var(--bone)]">
            <img data-testid="quickview-image" src={shopImg(imgs[active], 1000)} alt={p.name} className="w-full aspect-[4/5] lg:aspect-auto lg:h-full lg:max-h-[88vh] object-cover object-top" />
            {imgs.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                {imgs.map((src, i) => (
                  <button key={src} type="button" data-testid={`quickview-thumb-${i}`} onClick={() => setActive(i)} aria-label={`Image ${i + 1}`} className={`h-16 w-12 overflow-hidden border-2 transition-colors ${active === i ? "border-[var(--gold-light)]" : "border-white/60"}`}>
                    <img src={shopImg(src, 160)} alt="" className="h-full w-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-6 lg:p-10 flex flex-col">
            <p className="eyebrow text-[var(--crimson)]">{p.category}</p>
            <h3 data-testid="quickview-title" className="mt-3 font-display text-4xl font-light leading-[1.05]">
              {p.name}
            </h3>
            <p data-testid="quickview-price" className="mt-4 text-lg font-semibold tracking-wide">
              {formatINR(p.price)} <span className="text-xs font-normal text-[var(--stone)]">· made to measure</span>
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.occasions.map((o) => (
                <span key={o} className="border border-[rgba(20,17,15,0.2)] px-3 py-1.5 text-xs">
                  {o}
                </span>
              ))}
            </div>
            <ul className="mt-7 space-y-3 text-sm text-[var(--stone)] border-t border-[rgba(20,17,15,0.12)] pt-6">
              {PERKS.map(([Icon, text]) => (
                <li key={text} className="flex gap-3">
                  <Icon size={16} className="mt-0.5 shrink-0 text-[var(--gold)]" /> {text}
                </li>
              ))}
            </ul>
            <div className="mt-8 lg:mt-auto pt-2 flex flex-col gap-3">
              <button type="button" data-testid="quickview-book-btn" onClick={book} className="btn-gold w-full">
                <CalendarCheck size={16} /> Book a stylist for this look
              </button>
              <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi GROOM2B, I'm interested in: ${p.name}`)}`} target="_blank" rel="noreferrer" data-testid="quickview-whatsapp-link" className="btn-outline justify-center border-[rgba(20,17,15,0.25)] hover:bg-[var(--ink)] hover:text-[var(--ivory)]">
                <MessageCircle size={16} /> Ask on WhatsApp
              </a>
            </div>
          </div>
          <button type="button" data-testid="quickview-close-btn" onClick={onClose} aria-label="Close" className="absolute top-3 right-3 h-10 w-10 bg-[var(--ivory)] inline-flex items-center justify-center transition-colors hover:bg-[var(--ink)] hover:text-[var(--ivory)]">
            <X size={18} />
          </button>
        </div>
      )}
    </Modal>
  );
};
