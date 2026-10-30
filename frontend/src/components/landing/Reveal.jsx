import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 32, className = "", once = true }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-10% 0px" }}
    transition={{ duration: 0.9, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

export const MaskedLines = ({ lines, className = "", delay = 0, stagger = 0.1, as = "h2" }) => {
  const Tag = motion[as];
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export const SectionHead = ({ eyebrow, title, copy, dark = false, align = "left" }) => (
  <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    <Reveal>
      <p className={`eyebrow mb-5 ${dark ? "text-[var(--gold-light)]" : "text-[var(--crimson)]"}`}>{eyebrow}</p>
    </Reveal>
    <MaskedLines
      lines={title}
      className={`font-display font-light text-4xl sm:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.01em] ${
        dark ? "text-[var(--ivory)]" : "text-[var(--ink)]"
      }`}
    />
    {copy && (
      <Reveal delay={0.2}>
        <p className={`mt-6 text-base md:text-lg leading-relaxed ${dark ? "text-[#bdb5a8]" : "text-[var(--stone)]"}`}>
          {copy}
        </p>
      </Reveal>
    )}
  </div>
);
