import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { OCCASION_OPTIONS } from "@/lib/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMPTY = { name: "", email: "", phone: "", occasion: "Wedding", message: "" };

export const ContactForm = () => {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState("idle");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState("loading");
    try {
      await axios.post(`${API}/contact`, form);
      setState("done");
      toast.success("Request received — a stylist will call you shortly.");
    } catch (err) {
      setState("idle");
      toast.error(err?.response?.data?.detail?.[0]?.msg || "Something went wrong. Please try again.");
    }
  };

  return (
    <div data-testid="contact-form-wrapper" className="bg-[var(--ink)] text-[var(--ivory)] p-8 lg:p-12 relative overflow-hidden grain">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div
            key="done"
            data-testid="contact-success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 min-h-[420px] flex flex-col justify-center"
          >
            <span className="h-14 w-14 border border-[var(--gold)] text-[var(--gold-light)] inline-flex items-center justify-center mb-8">
              <Check size={22} />
            </span>
            <p className="font-display text-4xl lg:text-5xl font-light leading-tight">
              Thank you, {form.name.split(" ")[0]}.
            </p>
            <p className="mt-4 text-[#bdb5a8] max-w-sm">
              Your call-back is booked. One of our stylists will reach you at {form.phone} within a few working hours.
            </p>
            <button
              data-testid="contact-reset-btn"
              onClick={() => {
                setForm(EMPTY);
                setState("idle");
              }}
              className="link-underline eyebrow text-[var(--gold-light)] mt-10 w-fit"
            >
              Send another request
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" data-testid="contact-form" onSubmit={submit} className="relative z-10" exit={{ opacity: 0 }}>
            <p className="eyebrow text-[var(--gold-light)] mb-4">Get a call back</p>
            <h3 className="font-display text-4xl lg:text-5xl font-light leading-tight mb-10">
              Tell us about <span className="italic">your day.</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 [&_.field]:text-[var(--ivory)] [&_.field]:border-white/25 [&_.field:focus]:border-[var(--gold-light)] [&_.field::placeholder]:text-white/40">
              <input data-testid="contact-name-input" className="field" placeholder="Full name" required minLength={2} value={form.name} onChange={set("name")} />
              <input data-testid="contact-phone-input" className="field" placeholder="Phone number" required minLength={7} value={form.phone} onChange={set("phone")} />
              <input data-testid="contact-email-input" className="field sm:col-span-2" type="email" placeholder="Email address" required value={form.email} onChange={set("email")} />
              <select data-testid="contact-occasion-select" className="field sm:col-span-2 bg-[var(--ink)] [&>option]:bg-[var(--ink)]" value={form.occasion} onChange={set("occasion")}>
                {OCCASION_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <textarea data-testid="contact-message-input" className="field sm:col-span-2 resize-none" rows={3} placeholder="Date, city, and anything you have in mind" value={form.message} onChange={set("message")} />
            </div>

            <button type="submit" data-testid="contact-submit-btn" disabled={state === "loading"} className="btn-ink !bg-[var(--ivory)] !text-[var(--ink)] mt-10 disabled:opacity-60">
              <span>{state === "loading" ? "Sending…" : "Request a call back"}</span>
              <ArrowRight size={16} />
            </button>
            <p className="mt-5 text-xs text-[#8f877a]">No spam, ever. Just one call from a stylist who knows weddings.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
