import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { COLLECTIONS, CATEGORIES, STORES, WHATSAPP_URL, collectionUrl, categoryUrl, slug } from "@/lib/content";
import { useBooking } from "@/context/BookingContext";

const Col = ({ title, children }) => (
  <div>
    <p className="eyebrow text-[var(--gold-light)] mb-5">{title}</p>
    <ul className="space-y-3 text-sm text-[#ddd5c8]">{children}</ul>
  </div>
);

export const Footer = () => {
  const { openBooking } = useBooking();
  return (
    <footer data-testid="footer" className="bg-[var(--ink)] text-[var(--ivory)] relative overflow-hidden grain pb-20 lg:pb-0">
      <div className="hairline" />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-20 pb-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-16 border-b border-white/10">
          <div>
            <p className="eyebrow text-[var(--gold-light)] mb-6">Book an appointment</p>
            <button type="button" onClick={() => openBooking()} data-testid="footer-cta-link" className="group text-left font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] inline-flex items-start gap-4">
              <span>
                Let's dress <br /> <span className="italic gold-text pr-2">your</span> moment.
              </span>
              <ArrowUpRight className="mt-3 h-8 w-8 lg:h-10 lg:w-10 text-[var(--gold-light)] transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
            </button>
          </div>
          <div className="flex gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" data-testid="footer-whatsapp-link" className="btn-outline border-white/30 hover:bg-[var(--ivory)] hover:text-[var(--ink)]">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" data-testid="footer-instagram-link" aria-label="Instagram" className="btn-outline !px-4 border-white/30 hover:bg-[var(--ivory)] hover:text-[var(--ink)]">
              <Instagram size={16} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 pt-16">
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" className="font-display text-3xl tracking-[0.18em] font-medium">
              GROOM<span className="text-[var(--gold)]">2</span>B
            </Link>
            <p className="mt-5 text-sm text-[#bdb5a8] leading-relaxed max-w-xs">Bespoke groomswear, hand-finished in Hyderabad and delivered worldwide. We celebrate you.</p>
            <a href="mailto:reachgroom2b@gmail.com" className="link-underline inline-block mt-5 text-sm">
              reachgroom2b@gmail.com
            </a>
          </div>
          <div className="lg:col-span-2">
            <Col title="Collections">
              {COLLECTIONS.map((c) => (
                <li key={c.id}>
                  <Link to={collectionUrl(c.id)} data-testid={`footer-collection-${c.id}`} className="link-underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </Col>
          </div>
          <div className="lg:col-span-2">
            <Col title="Shop">
              {CATEGORIES.map((c) => (
                <li key={c.name}>
                  <Link to={categoryUrl(c.name)} data-testid={`footer-category-${slug(c.name)}`} className="link-underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </Col>
          </div>
          <div className="col-span-2 lg:col-span-4">
            <Col title="Visit">
              {STORES.map((s) => (
                <li key={s.city} className="pb-3">
                  <p className="font-display text-2xl text-[var(--ivory)]">{s.city}</p>
                  <p className="mt-1 text-[#bdb5a8] leading-relaxed">{s.address}</p>
                  <p className="mt-1">
                    <a href={`tel:${s.phone.replace(/[^+\d]/g, "")}`} className="link-underline">
                      {s.phone}
                    </a>{" "}
                    · {s.hours}
                  </p>
                </li>
              ))}
            </Col>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/10 pt-8">
          <p className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.8] tracking-[0.12em] font-light text-white/[0.07] select-none">GROOM2B</p>
          <p className="text-xs text-[#8f877a] sm:text-right">
            © 2026 GROOM2B · We celebrate you. <br /> Hyderabad · California
          </p>
        </div>
      </div>
    </footer>
  );
};
