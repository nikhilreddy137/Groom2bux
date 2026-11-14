import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, CalendarCheck } from "lucide-react";
import { EDITORIAL_IMG, STATS } from "@/lib/content";
import { useBooking } from "@/context/BookingContext";

const EASE = [0.22, 1, 0.36, 1];

const Word = ({ children, delay, className = "" }) => (
  <span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
    <motion.span
      className={`inline-block ${className}`}
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = () => {
  const ref = useRef(null);
  const { openBooking } = useBooking();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} data-testid="hero-section" className="relative min-h-[100svh] bg-[var(--ink)] text-[var(--ivory)] overflow-hidden grain">
      <motion.div style={{ y: imgY }} className="absolute inset-x-0 top-0 h-[58svh] lg:h-full">
        <motion.img
          src={EDITORIAL_IMG}
          alt="Groom in an ivory embroidered sherwani"
          className="h-full w-full object-cover object-[22%_center] lg:object-[left_14%]"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: EASE }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--ink)_0%,rgba(20,17,15,0.25)_38%,rgba(20,17,15,0)_60%)] lg:bg-[linear-gradient(270deg,var(--ink)_0%,rgba(20,17,15,0.9)_26%,rgba(20,17,15,0.35)_48%,rgba(20,17,15,0)_64%)]" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[rgba(20,17,15,0.75)] to-transparent" />
        <div className="hidden lg:block absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[var(--ink)] to-transparent" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 pt-[46svh] lg:pt-44 pb-14 lg:pb-44">
        <div className="lg:ml-auto lg:w-[45%]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="eyebrow text-[var(--gold-light)] mb-8 flex items-center gap-4"
        >
          <span className="h-px w-10 bg-[var(--gold)]" /> Bespoke groomswear · Est. Hyderabad
        </motion.p>

        <h1 className="font-display font-light leading-[0.9] tracking-[-0.02em] text-[clamp(3.2rem,5.3vw,6.2rem)]">
          <Word delay={0.6}>The man</Word> <br />
          <span className="whitespace-nowrap">
            <Word delay={0.72}>of the</Word>{" "}
            <Word delay={0.84} className="italic font-normal gold-text pr-3">
              moment.
            </Word>
          </span>
        </h1>

        <div className="mt-8 lg:mt-10 flex flex-col gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="text-base md:text-lg text-[#d8d0c2] leading-relaxed max-w-md"
          >
            Hand-embroidered sherwanis, pattu pancha and sharp designer suits — cut to your measure
            by stylists who have dressed over twenty thousand grooms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25 }}
            className="flex flex-wrap gap-3"
          >
            <button type="button" onClick={() => openBooking()} data-testid="hero-book-stylist-btn" className="btn-gold">
              <CalendarCheck size={16} /> Book a stylist
            </button>
            <Link to="/collections" data-testid="hero-explore-collections-btn" className="btn-outline border-white/40 text-[var(--ivory)] hover:bg-[var(--ivory)] hover:text-[var(--ink)]">
              Explore collections <ArrowUpRight size={16} />
            </Link>
            <a href="#tryon" data-testid="hero-virtual-tryon-btn" className="link-underline self-center text-[12px] uppercase tracking-[0.22em] font-semibold text-[var(--gold-light)] ml-2">
              See it on you
            </a>
          </motion.div>
        </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative lg:absolute lg:bottom-0 lg:inset-x-0 z-10 border-t border-white/10 bg-[var(--ink)] lg:bg-transparent"
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-white/10">
          {STATS.map((s, i) => (
            <div key={s.label} data-testid={`hero-stat-${i}`} className="py-5 lg:py-8 lg:px-4 lg:first:pl-0">
              <p className="font-display text-3xl lg:text-4xl font-light">{s.value}</p>
              <p className="eyebrow text-[#a69d8f] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute left-12 bottom-36 z-10 hidden lg:flex items-center gap-3 eyebrow text-[var(--ivory)]"
      >
        Scroll <ArrowDown size={14} />
      </motion.div>
    </section>
  );
};
