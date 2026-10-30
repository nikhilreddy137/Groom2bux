import { MapPin, Phone, Clock } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { STORES } from "@/lib/content";

const StoreCard = ({ s, i }) => (
  <Reveal delay={i * 0.1} className="group">
    <div data-testid={`store-card-${s.city.toLowerCase()}`} className="relative aspect-[16/10] overflow-hidden bg-[var(--bone)] img-zoom">
      <img src={s.img} alt={`${s.city} store`} loading="lazy" className="h-full w-full object-cover" />
      <span className="absolute top-4 left-4 eyebrow bg-[var(--ivory)] px-3 py-1.5">{s.tag}</span>
    </div>
    <h3 className="font-display text-4xl font-light mt-6">{s.city}</h3>
    <ul className="mt-4 space-y-2.5 text-sm text-[var(--stone)]">
      <li className="flex gap-3">
        <MapPin size={15} className="mt-0.5 shrink-0 text-[var(--crimson)]" /> {s.address}
      </li>
      <li className="flex gap-3">
        <Phone size={15} className="mt-0.5 shrink-0 text-[var(--crimson)]" />
        <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="link-underline text-[var(--ink)]">
          {s.phone}
        </a>
      </li>
      <li className="flex gap-3">
        <Clock size={15} className="mt-0.5 shrink-0 text-[var(--crimson)]" /> {s.hours}
      </li>
    </ul>
  </Reveal>
);

export const Stores = () => (
  <section id="stores" data-testid="stores-section" className="bg-[var(--ivory)] py-28 lg:py-40">
    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
      <SectionHead eyebrow="Visit us" title={["Two studios.", "One standard."]} copy="Walk in for a consultation in Jubilee Hills or Milpitas — or let a stylist call you first." />
      <div className="mt-16 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div data-testid="store-boutiques-grid" className="lg:col-span-6 grid sm:grid-cols-2 gap-8">
          {STORES.map((s, i) => (
            <StoreCard key={s.city} s={s} i={i} />
          ))}
        </div>
        <div id="contact" className="lg:col-span-6 scroll-mt-28">
          <Reveal y={50}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
