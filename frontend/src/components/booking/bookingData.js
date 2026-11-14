import { MapPin, Video, Plane } from "lucide-react";

export const BOOKING_STEPS = [
  { id: "occasion", title: "The occasion", hint: "What are we dressing you for?" },
  { id: "outfits", title: "The outfit", hint: "Pick everything you'd like to explore." },
  { id: "meet", title: "Where & when", hint: "Choose how you'd like to meet your stylist." },
  { id: "details", title: "Your details", hint: "So your stylist can confirm the slot." },
];

export const MODES = [
  { id: "Hyderabad studio", sub: "Jubilee Hills · Road No. 55", icon: MapPin },
  { id: "California boutique", sub: "Milpitas, CA · Bay Area", icon: Plane },
  { id: "Video call", sub: "From anywhere · 30 minutes", icon: Video },
];

export const TIMES = ["12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"];

export const EMPTY_BOOKING = {
  occasion: "",
  outfits: [],
  mode: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
  interest: "",
};

const pad = (n) => String(n).padStart(2, "0");

export const nextDays = (count = 14) =>
  Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      weekday: d.toLocaleDateString("en-IN", { weekday: "short" }),
      day: d.getDate(),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
    };
  });

export const prettyDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

export const stepValid = (step, d) =>
  [
    Boolean(d.occasion),
    d.outfits.length > 0,
    Boolean(d.mode && d.date && d.time),
    d.name.trim().length >= 2 && d.phone.replace(/\D/g, "").length >= 7 && (!d.email || /^\S+@\S+\.\S+$/.test(d.email)),
  ][step];
