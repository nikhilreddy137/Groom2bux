import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";

export const Footer = () => (
  <footer data-testid="footer" className="bg-[var(--ink)] text-[var(--ivory)] relative overflow-hidden grain">
    <div className="hairline" />
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-20 pb-10 relative z-10">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6">
          <p className="eyebrow text-[var(--gold-light)] mb-6">Book an appointment</p>
          <a href="#contact" data-testid="footer-cta-link" className="group font-display font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.95] inline-flex items-start gap-4">
            <span>
              Let's dress <br /> <span className="italic">your</span> moment.
            </span>
            <ArrowUpRight className="mt-3 h-8 w-8 lg:h-10 lg:w-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
          </a>
        </div>
        <div className="lg:col-span-3 lg:col-start-8">
          <p className="eyebrow text-[#8f877a] mb-5">Explore</p>
          <ul className="space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-underline text-sm">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="eyebrow text-[#8f877a] mb-5">Connect</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="https://wa.me/919515100372" data-testid="footer-whatsapp-link" className="link-underline inline-flex items-center gap-2">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </li>
            <li>
              <a href="https://instagram.com" data-testid="footer-instagram-link" className="link-underline inline-flex items-center gap-2">
                <Instagram size={14} /> Instagram
              </a>
            </li>
            <li>
              <a href="mailto:reachgroom2b@gmail.com" className="link-underline">
                reachgroom2b@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-24 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/10 pt-8">
        <p className="font-display text-[clamp(3rem,9vw,9rem)] leading-[0.8] tracking-[0.12em] font-light text-white/[0.08] select-none">GROOM2B</p>
        <p className="text-xs text-[#8f877a] text-right">
          © 2026 GROOM2B · We celebrate you. <br /> Hyderabad · California
        </p>
      </div>
    </div>
  </footer>
);
