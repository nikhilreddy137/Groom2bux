import { useEffect } from "react";
import Lenis from "lenis";

export const scrollToEl = (el) => {
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -96, duration: 1.4 });
  else el.scrollIntoView();
};

export const scrollToTop = () => {
  window.__lenis?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
};

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (!el) return;
      e.preventDefault();
      scrollToEl(el);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
};
