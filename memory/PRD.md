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

## Developer handoff pack (30 Oct 2026)
- Script `/app/scripts/capture_handoff.py` (Playwright) → `/app/frontend/public/handoff/`: full-page + per-section PNGs at desktop 1440@2x and mobile 390@3x, contact success state, mobile menu, `README-dev-spec.md` (tokens, type, layout, section-by-section behaviour, motion), zipped as `groom2b-ux-handoff.zip` (served at `/handoff/groom2b-ux-handoff.zip`).
- Run against `http://localhost:3000` (preview URL can 502 intermittently).

## v2 redesign (14 Nov 2026)
User asks: better landing page + overall UX, great colours, Book-a-Stylist popup, properly defined Collections page, designed header + mega menu, mobile + desktop. User rejected green, then rejected red/maroon backgrounds on home -> wants "royal" with a great photo.
- Palette now royal black `#14110f` + gold (`#b8893a`, `#e8cb8a`, gold gradient CTA `.btn-gold`) + ivory `#f7f2e8`; maroon `#8c1c2e` is an accent only, never a background. No green.
- Hero: palace photo in true colour, grooms left / copy right (mobile: photo top 58svh, copy below).
- Header (`components/layout/Nav.jsx`, `MegaMenu.jsx`, `MobileMenu.jsx`, `StickyCta.jsx`): hover mega menus (Collections, Shop), mobile accordion drawer, mobile sticky CTA.
- Booking popup (`components/booking/*`, `context/BookingContext.jsx`, `components/common/Modal.jsx`): 4 steps + success, `POST /api/bookings` (Mongo `stylist_bookings`), `GET /api/bookings`.
- Collections page `/collections` (`pages/Collections.jsx`, `components/shop/*`, `lib/catalog.js`): hero + breadcrumb, collection rail, sticky toolbar (search, sort), filters (category/occasion/price; sidebar desktop, sheet mobile), chips, load more, empty state, quick view -> booking prefill. URL params: c, category, occasion, price, q, sort.
- `lib/products.json`: 103 real products pulled from groom2b.in Shopify JSON; occasion tags partly inferred from category.
- New landing section `Process.jsx` (made to measure). Layout (Nav/Footer/Lenis/hash scroll) lives in `App.js`.
- Tested: testing agent iteration_2 (backend 10/10, frontend all flows pass; preview availability 5/5 200 — earlier Bad Gateway not reproducible). Mobile drawer scroll-lock bug fixed after report.
- Handoff pack regenerated: `scripts/capture_handoff.py` -> 58 JPGs (desktop 1440@2x, mobile 390@2x) + `README-dev-spec.md` + `groom2b-ux-handoff.zip` (~24 MB) in `/app/frontend/public/handoff/`.

## Backlog (not requested; ideas only)
- P2: Export screenshots as a shareable PDF/Figma-like board.
- P2: Light/dark alternate concept for A/B comparison.
- P2: Email notification on new contact lead (Resend).
