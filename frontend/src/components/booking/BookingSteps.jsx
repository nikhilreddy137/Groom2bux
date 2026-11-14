import { useMemo } from "react";
import { Check, CalendarCheck, MessageCircle } from "lucide-react";
import { OCCASIONS, CATEGORIES, WHATSAPP_URL, slug } from "@/lib/content";
import { MODES, TIMES, nextDays, prettyDate } from "./bookingData";

const Tick = ({ on }) => (
  <span
    className={`absolute top-2 right-2 h-6 w-6 inline-flex items-center justify-center transition-[opacity,transform] duration-300 bg-[var(--gold-light)] text-[var(--ink)] ${
      on ? "opacity-100 scale-100" : "opacity-0 scale-50"
    }`}
  >
    <Check size={14} strokeWidth={2.5} />
  </span>
);

const ImageTile = ({ item, on, onClick, testid }) => (
  <button type="button" data-testid={testid} aria-pressed={on} onClick={onClick} className="pick group relative text-left overflow-hidden bg-[var(--bone)]">
    <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden">
      <img src={item.img} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
    </div>
    <p className="px-3 py-3 font-display text-xl leading-none">{item.name}</p>
    <Tick on={on} />
  </button>
);

export const StepOccasion = ({ data, set }) => (
  <div data-testid="booking-step-occasion" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {OCCASIONS.map((o) => (
      <ImageTile key={o.name} item={o} on={data.occasion === o.name} onClick={() => set({ occasion: o.name })} testid={`booking-occasion-${slug(o.name)}`} />
    ))}
  </div>
);

export const StepOutfits = ({ data, set }) => {
  const toggle = (name) =>
    set({ outfits: data.outfits.includes(name) ? data.outfits.filter((x) => x !== name) : [...data.outfits.filter((x) => x !== "Not sure yet"), name] });
  const unsure = data.outfits.includes("Not sure yet");
  return (
    <div data-testid="booking-step-outfits">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map((c) => (
          <ImageTile key={c.name} item={c} on={data.outfits.includes(c.name)} onClick={() => toggle(c.name)} testid={`booking-outfit-${slug(c.name)}`} />
        ))}
        <button
          type="button"
          data-testid="booking-outfit-not-sure"
          aria-pressed={unsure}
          onClick={() => set({ outfits: unsure ? [] : ["Not sure yet"] })}
          className="pick relative flex flex-col justify-end p-4 text-left min-h-[120px]"
        >
          <p className="font-display text-2xl leading-none">Not sure yet</p>
          <p className="text-xs mt-2 opacity-70">Let my stylist guide me</p>
          <Tick on={unsure} />
        </button>
      </div>
    </div>
  );
};

const Label = ({ children }) => <p className="eyebrow text-[var(--crimson)] mb-3">{children}</p>;

export const StepMeet = ({ data, set }) => {
  const days = useMemo(() => nextDays(14), []);
  return (
    <div data-testid="booking-step-meet" className="space-y-8">
      <div>
        <Label>How would you like to meet?</Label>
        <div className="grid sm:grid-cols-3 gap-3">
          {MODES.map((m) => (
            <button key={m.id} type="button" data-testid={`booking-mode-${slug(m.id)}`} aria-pressed={data.mode === m.id} onClick={() => set({ mode: m.id })} className="pick relative p-4 text-left flex sm:flex-col gap-4 sm:gap-6 items-center sm:items-start">
              <m.icon size={20} className="shrink-0 text-[var(--gold)]" />
              <span>
                <span className="block font-display text-2xl leading-none">{m.id}</span>
                <span className="block text-xs mt-1.5 opacity-70">{m.sub}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>Pick a day</Label>
        <div data-testid="booking-date-rail" className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 lg:-mx-10 lg:px-10 pb-1">
          {days.map((d) => (
            <button key={d.iso} type="button" data-testid={`booking-date-${d.iso}`} aria-pressed={data.date === d.iso} onClick={() => set({ date: d.iso })} className="pick shrink-0 w-[68px] py-3 flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">{d.weekday}</span>
              <span className="font-display text-3xl leading-tight">{d.day}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">{d.month}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>Preferred time</Label>
        <div className="flex flex-wrap gap-2">
          {TIMES.map((t, i) => (
            <button key={t} type="button" data-testid={`booking-time-${i}`} aria-pressed={data.time === t} onClick={() => set({ time: t })} className="pick px-4 py-3 text-sm font-semibold tracking-wide">
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Summary = ({ data }) => (
  <dl data-testid="booking-summary" className="grid grid-cols-2 gap-x-6 gap-y-4 border border-[rgba(31,7,13,0.15)] bg-[var(--bone)] p-5 text-sm">
    {[
      ["Occasion", data.occasion],
      ["Outfits", data.outfits.join(", ")],
      ["Meeting", data.mode],
      ["Requested slot", `${prettyDate(data.date)} · ${data.time}`],
    ].map(([k, v]) => (
      <div key={k}>
        <dt className="eyebrow text-[var(--stone)] !text-[10px]">{k}</dt>
        <dd className="mt-1 font-medium">{v}</dd>
      </div>
    ))}
    {data.interest && (
      <div className="col-span-2">
        <dt className="eyebrow text-[var(--stone)] !text-[10px]">Outfit you liked</dt>
        <dd className="mt-1 font-medium">{data.interest}</dd>
      </div>
    )}
  </dl>
);

export const StepDetails = ({ data, set }) => {
  const bind = (k) => ({ value: data[k], onChange: (e) => set({ [k]: e.target.value }) });
  return (
    <div data-testid="booking-step-details" className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-x-6">
        <input data-testid="booking-name-input" className="field" placeholder="Full name *" autoComplete="name" {...bind("name")} />
        <input data-testid="booking-phone-input" className="field" placeholder="Phone / WhatsApp number *" inputMode="tel" autoComplete="tel" {...bind("phone")} />
        <input data-testid="booking-email-input" className="field sm:col-span-2" type="email" placeholder="Email (optional)" autoComplete="email" {...bind("email")} />
        <textarea data-testid="booking-notes-input" className="field sm:col-span-2 resize-none" rows={2} placeholder="Wedding date, colours you love, anything else" {...bind("notes")} />
      </div>
      <Summary data={data} />
    </div>
  );
};

export const BookingSuccess = ({ data, onClose }) => (
  <div data-testid="booking-success" className="flex flex-col justify-center h-full py-6">
    <span className="h-14 w-14 bg-[var(--ink)] text-[var(--gold-light)] inline-flex items-center justify-center mb-8">
      <CalendarCheck size={24} />
    </span>
    <p className="eyebrow text-[var(--crimson)] mb-3">Request received</p>
    <h3 className="font-display text-4xl sm:text-5xl font-light leading-[1.02]">
      You're in good hands, <span className="italic">{data.name.trim().split(" ")[0]}.</span>
    </h3>
    <p className="mt-4 text-[var(--stone)] max-w-md">
      Your stylist will confirm this slot on WhatsApp at {data.phone} within a few working hours.
    </p>
    <div className="mt-8">
      <Summary data={data} />
    </div>
    <div className="mt-8 flex flex-wrap gap-3">
      <button type="button" data-testid="booking-done-btn" onClick={onClose} className="btn-ink">
        <span>Done</span>
      </button>
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" data-testid="booking-success-whatsapp-link" className="btn-outline border-[rgba(31,7,13,0.25)] hover:bg-[var(--ink)] hover:text-[var(--ivory)]">
        <MessageCircle size={16} /> Chat on WhatsApp
      </a>
    </div>
  </div>
);
