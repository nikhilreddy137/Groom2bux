import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Ruler, Sparkles } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { TRYON_IMG } from "@/lib/content";

const STEPS = [
  { icon: Camera, title: "Upload a photo", copy: "One clear picture is all it takes." },
  { icon: Sparkles, title: "Try any outfit", copy: "See sherwanis, suits and pancha on you — instantly." },
  { icon: Ruler, title: "Book your fitting", copy: "Love it? Our stylists take it from screen to stitch." },
];

export const TryOn = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="tryon" ref={ref} data-testid="virtual-tryon-section" className="relative bg-[var(--ink)] text-[var(--ivory)] py-28 lg:py-40 overflow-hidden grain">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 grid lg:grid-cols-12 gap-14 items-center relative z-10">
        <div className="lg:col-span-5">
          <SectionHead
            dark
            eyebrow="Virtual try-on"
            title={["See it on you,", "before the", "first stitch."]}
            copy="Find your perfect look in seconds. Our try-on studio renders real GROOM2B garments onto your photo so you walk into the fitting already certain."
          />
          <div className="mt-12 space-y-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={0.1 + i * 0.1}>
                <div className="flex gap-5 items-start">
                  <span className="h-12 w-12 shrink-0 border border-[rgba(184,137,58,0.5)] text-[var(--gold-light)] inline-flex items-center justify-center">
                    <s.icon size={18} />
                  </span>
                  <div>
                    <p className="font-display text-2xl font-light">{s.title}</p>
                    <p className="text-sm text-[#a69d8f] mt-1">{s.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <a href="#contact" data-testid="launch-virtual-tryon-btn" className="btn-ink !bg-[var(--gold-light)] !text-[var(--ink)] mt-12">
              <span>Try now</span>
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7 relative">
          <Reveal y={60}>
            <div className="relative overflow-hidden aspect-[4/3] lg:aspect-[16/11]">
              <motion.img style={{ y }} src={TRYON_IMG} alt="Virtual try-on preview" className="h-[116%] w-full object-cover -mt-[8%]" />
            </div>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute -bottom-6 left-6 lg:-left-10 bg-[var(--ivory)] text-[var(--ink)] px-6 py-5 shadow-2xl"
          >
            <p className="eyebrow text-[var(--crimson)]">Live preview</p>
            <p className="font-display text-3xl font-light mt-1">Ivory Brocade Sherwani</p>
            <p className="text-sm text-[var(--stone)]">Rendered in 2.4s</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
