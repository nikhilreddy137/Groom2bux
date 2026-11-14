import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { WHATSAPP_URL } from "@/lib/content";

export const StickyCta = () => {
  const [show, setShow] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid="mobile-sticky-cta"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex gap-2 p-3 bg-[rgba(31,7,13,0.94)] backdrop-blur-xl border-t border-white/10"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" data-testid="sticky-whatsapp-btn" className="h-12 w-12 shrink-0 border border-white/25 text-[var(--ivory)] inline-flex items-center justify-center">
            <MessageCircle size={18} />
          </a>
          <button type="button" data-testid="sticky-book-btn" onClick={() => openBooking()} className="btn-gold flex-1 !py-0 h-12">
            <CalendarCheck size={16} /> Book a stylist
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
