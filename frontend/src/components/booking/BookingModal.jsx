import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Modal } from "@/components/common/Modal";
import { useBooking } from "@/context/BookingContext";
import { EDITORIAL_IMG } from "@/lib/content";
import { BOOKING_STEPS, EMPTY_BOOKING, stepValid } from "./bookingData";
import { StepOccasion, StepOutfits, StepMeet, StepDetails, BookingSuccess } from "./BookingSteps";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STEP_VIEWS = [StepOccasion, StepOutfits, StepMeet, StepDetails];
const PROMISES = ["Complimentary, no obligation", "30 minutes with a senior stylist", "Fabric, fit and budget — all answered"];

const Aside = ({ step, done }) => (
  <aside className="hidden lg:flex relative isolate w-[36%] shrink-0 flex-col justify-between bg-[var(--ink)] text-[var(--ivory)] p-10 overflow-hidden grain">
    <img src={EDITORIAL_IMG} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_top] opacity-35" />
    <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[rgba(31,7,13,0.7)] to-[rgba(31,7,13,0.35)]" />
    <div className="relative z-10">
      <p className="eyebrow text-[var(--gold-light)] mb-4">Private consultation</p>
      <h2 className="font-display text-5xl font-light leading-[0.98]">
        Book a <span className="italic gold-text pr-1">stylist.</span>
      </h2>
    </div>
    <ol className="relative z-10 space-y-5">
      {BOOKING_STEPS.map((s, i) => {
        const complete = done || i < step;
        return (
          <li key={s.id} data-testid={`booking-stepper-${s.id}`} className={`flex items-center gap-4 transition-opacity duration-300 ${i === step || complete ? "opacity-100" : "opacity-45"}`}>
            <span className={`h-8 w-8 shrink-0 inline-flex items-center justify-center text-xs font-semibold border ${complete ? "bg-[var(--gold-light)] text-[var(--ink)] border-[var(--gold-light)]" : "border-white/40"}`}>
              {complete ? <Check size={14} strokeWidth={2.5} /> : i + 1}
            </span>
            <span className="font-display text-2xl font-light leading-none">{s.title}</span>
          </li>
        );
      })}
    </ol>
    <ul className="relative z-10 space-y-2 text-sm text-[#d5cfc0] border-t border-white/15 pt-6">
      {PROMISES.map((p) => (
        <li key={p} className="flex gap-3">
          <Check size={15} className="mt-0.5 shrink-0 text-[var(--gold-light)]" /> {p}
        </li>
      ))}
    </ul>
  </aside>
);

export const BookingModal = () => {
  const { open, prefill, closeBooking } = useBooking();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(EMPTY_BOOKING);
  const [status, setStatus] = useState("idle");
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setData({ ...EMPTY_BOOKING, ...prefill });
    setStep(0);
    setStatus("idle");
  }, [open, prefill]);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0);
  }, [step, status]);

  const set = (patch) => setData((d) => ({ ...d, ...patch }));
  const done = status === "done";
  const last = step === BOOKING_STEPS.length - 1;
  const valid = stepValid(step, data);
  const View = STEP_VIEWS[step];

  const submit = async () => {
    setStatus("loading");
    try {
      await axios.post(`${API}/bookings`, { ...data, name: data.name.trim(), phone: data.phone.trim(), email: data.email.trim() || null });
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      toast.error(err?.response?.data?.detail?.[0]?.msg || "We couldn't send your request. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={closeBooking} testid="booking-modal" label="Book a stylist" className="flex h-[94svh] lg:h-[min(740px,92vh)] lg:max-w-[1100px] bg-[var(--ivory)] text-[var(--ink)]">
      <Aside step={step} done={done} />
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="flex items-center justify-between gap-4 px-6 lg:px-10 h-16 shrink-0 border-b border-[rgba(31,7,13,0.12)]">
          <p data-testid="booking-step-indicator" className="eyebrow text-[var(--stone)]">
            {done ? "All set" : `Step ${step + 1} of ${BOOKING_STEPS.length}`}
            <span className="lg:hidden"> · Book a stylist</span>
          </p>
          <button type="button" data-testid="booking-close-btn" onClick={closeBooking} aria-label="Close" className="h-10 w-10 -mr-2 inline-flex items-center justify-center transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--ivory)]">
            <X size={18} />
          </button>
        </header>
        <div className="h-[3px] bg-[rgba(31,7,13,0.08)] shrink-0">
          <motion.div data-testid="booking-progress" className="h-full bg-gradient-to-r from-[var(--crimson)] to-[var(--gold)]" animate={{ width: `${done ? 100 : ((step + 1) / BOOKING_STEPS.length) * 100}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
        </div>

        <div ref={bodyRef} data-lenis-prevent className="flex-1 overflow-y-auto overflow-x-hidden px-6 lg:px-10 py-7 lg:py-9">
          <AnimatePresence mode="wait">
            <motion.div key={done ? "done" : step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className={done ? "h-full" : ""}>
              {done ? (
                <BookingSuccess data={data} onClose={closeBooking} />
              ) : (
                <>
                  <h3 data-testid="booking-step-title" className="font-display text-4xl lg:text-5xl font-light leading-none">
                    {BOOKING_STEPS[step].title}
                  </h3>
                  <p className="mt-3 mb-7 text-[var(--stone)]">{BOOKING_STEPS[step].hint}</p>
                  <View data={data} set={set} />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {!done && (
          <footer className="shrink-0 flex items-center justify-between gap-4 px-6 lg:px-10 py-4 border-t border-[rgba(31,7,13,0.12)] bg-[var(--ivory)]">
            <button type="button" data-testid="booking-back-btn" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] font-semibold py-3 disabled:opacity-0 transition-opacity">
              <ArrowLeft size={16} /> Back
            </button>
            <button type="button" data-testid="booking-next-btn" disabled={!valid || status === "loading"} onClick={() => (last ? submit() : setStep((s) => s + 1))} className="btn-gold">
              {last ? (status === "loading" ? "Sending…" : "Confirm request") : "Continue"}
              <ArrowRight size={16} />
            </button>
          </footer>
        )}
      </div>
    </Modal>
  );
};
