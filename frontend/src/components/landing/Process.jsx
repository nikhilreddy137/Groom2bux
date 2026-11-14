import { ArrowRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { useBooking } from "@/context/BookingContext";

const STEPS = [
  { title: "Consult", time: "In studio or on video", copy: "Sit down with a stylist — in studio or on video — and map out every ceremony, colour and budget." },
  { title: "Design", time: "Fabric & embroidery", copy: "Choose fabric, embroidery and silhouette. We sketch the look and share swatches before a single cut." },
  { title: "Craft", time: "Hand-finished", copy: "Master tailors and hand-embroiderers build your outfit on a pattern drafted to your measurements." },
  { title: "Fit & deliver", time: "Worldwide", copy: "A final fitting, last adjustments, then delivery to your door — anywhere in the world." },
];

export const Process = () => {
  const { openBooking } = useBooking();
  return (
    <section id="process" data-testid="process-section" className="relative bg-[var(--maroon-deep)] text-[var(--ivory)] py-28 lg:py-40 overflow-hidden grain">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-24">
          <SectionHead dark eyebrow="Made to measure" title={["From first chat", "to final fitting."]} copy="Four unhurried steps. One stylist with you the whole way." />
          <Reveal delay={0.2}>
            <button type="button" data-testid="process-book-btn" onClick={() => openBooking()} className="btn-gold">
              Start with a stylist <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>

        <ol data-testid="process-steps" className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-[rgba(232,203,138,0.35)]">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <li className="group relative pt-8 pb-10 lg:pr-10 h-full border-b sm:border-b-0 border-white/10">
                <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rotate-45 bg-[var(--gold-light)]" />
                <p className="font-display text-7xl lg:text-8xl font-light leading-none gold-text w-fit">{String(i + 1).padStart(2, "0")}</p>
                <p className="eyebrow text-[var(--gold-light)] mt-6">{s.time}</p>
                <h3 className="font-display text-4xl font-light mt-2">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#d9c9c4] max-w-xs">{s.copy}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};
