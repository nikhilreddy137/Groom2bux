# GROOM2B — Landing Page Redesign (UX Concept)

## Original problem statement
"Build a landing page: I want to improve a website." Target: https://groom2b.in/ (Shopify store, luxury Indian groomswear, Hyderabad + Milpitas CA).
User choices: Clean & minimal · Bold & colourful · Modern & premium · AI-generated copy · Working contact form.
Key constraint (verbatim): "i just want screen shots of new ux THATS IT it is shopify site" — deliverable is the new UX design (screenshots), not a replacement store.

## What was built (30 Oct 2026)
- React 19 + Tailwind + framer-motion 11 + Lenis smooth scroll, single-page `/` (`/app/frontend/src/pages/Landing.jsx`).
- Palette: ivory `#f3eee4` / bone `#e9e2d3` base, ink `#121010`, crimson `#9c1b2c`, gold `#b8893a`. Fonts: Cormorant Garamond (display) + Manrope (body).
- Sections (components in `/app/frontend/src/components/landing/`): Nav (announcement bar, glass on scroll, mobile menu), Hero (parallax, masked word reveal, stats), Marquee, Collections bento (6 named collections), Categories rail, Virtual Try-On, Latest Arrivals (tabs + INR prices), Occasions (hover-swap image list), Testimonials + gallery + Google/Justdial ratings, Stores (Hyderabad + California) + working ContactForm, Footer.
- All imagery hotlinked from groom2b.in Shopify CDN; copy in `/app/frontend/src/lib/content.js`.
- Backend: `POST /api/contact` (validates, stores lead in Mongo `contact_leads`), `GET /api/contact`.
- Tested: testing agent iteration_1 (backend + frontend all pass), desktop + mobile screenshots verified.

## Fixed during build
- MaskedLines reveal never fired (IntersectionObserver clipped by overflow-hidden) → parent-driven variants.
- Mobile: announcement bar wrap, hero stats overlapping CTAs → static stats on mobile, shorter bar text.

## Backlog (not requested; ideas only)
- P2: Export screenshots as a shareable PDF/Figma-like board.
- P2: Light/dark alternate concept for A/B comparison.
- P2: Email notification on new contact lead (Resend).
