# GROOM2B — New Homepage UX: Developer Handoff Spec

Live reference build: see the preview URL shared in chat. Screenshots in this folder are 2x (desktop, 1440px) and 3x (mobile, 390px).

---

## 1. Design tokens

| Token | Value | Used for |
|---|---|---|
| Ivory (page bg) | `#F3EEE4` | Default section background |
| Bone (alt bg) | `#E9E2D3` | Alternate light sections (Categories, Occasions) |
| Ink (dark bg / text) | `#121010` | Dark sections (Hero, Try-On, Reviews, Contact card, Footer), body text, primary buttons |
| Ink 2 | `#1B1816` | Cards on dark sections |
| Crimson (accent) | `#9C1B2C` | Announcement bar, eyebrow labels, hover fill on buttons, active occasion |
| Gold | `#B8893A` | Logo "2", hairline dividers, quote marks |
| Gold light | `#E2C483` | Eyebrows on dark sections, hero italic word gradient, Try-On CTA |
| Stone (muted text) | `#6B645C` | Paragraph copy on light sections |
| Muted on dark | `#BDB5A8` / `#A69D8F` | Paragraph / captions on dark sections |

Border radius: **0** everywhere (sharp edges). Borders: 1px, `rgba(18,16,16,0.12–0.25)` on light, `rgba(255,255,255,0.10–0.30)` on dark.

## 2. Typography (Google Fonts)

- **Display:** Cormorant Garamond — weights 300/400 (+ italic 300/400). All headings, product names, stats, quotes.
- **Body:** Manrope — weights 300–700. Paragraphs, nav, buttons, labels.

| Element | Spec |
|---|---|
| Hero H1 | Cormorant 300, `clamp(3.4rem, 10.5vw, 10.5rem)`, line-height 0.9, letter-spacing -0.02em. Last word italic 400 with gold gradient |
| Section H2 | Cormorant 300, 36px mobile → 48px tablet → 60px desktop, line-height 0.98 |
| Card title | Cormorant 300, 28–36px |
| Eyebrow label | Manrope 500, 11px, uppercase, letter-spacing 0.32em |
| Body | Manrope 400, 16px (18px large), line-height 1.6 |
| Button | Manrope 600, 12px, uppercase, letter-spacing 0.22em, padding 16px 28px |
| Nav link | Manrope 500, 12px, uppercase, letter-spacing 0.22em |

## 3. Layout

- Max content width **1440px**, side padding 24px mobile / 48px desktop.
- Section vertical padding: **112px mobile / 160px desktop**.
- Grid gap in image grids: 12px. Cards: no radius, no shadow (except the Try-On floating label: `shadow-2xl`).
- Left-aligned headings; CTA/secondary links sit right-aligned on the same row (desktop).

## 4. Section order & behaviour (top → bottom)

1. **Announcement bar** (32px, crimson) — "Wedding season 2026 · Book a free stylist consultation · Hyderabad & California".
2. **Nav** (fixed, 76px) — transparent on hero; after 40px scroll becomes ivory at 82% opacity with 20px backdrop blur. Logo "GROOM2B" (Cormorant, letter-spacing 0.18em, "2" in gold). Links: Collections · Categories · Try On · Occasions · Stores. Right: WhatsApp icon (wa.me/919515100372) + "Book a stylist" button → scrolls to contact form. Mobile: hamburger → full-screen ink menu.
3. **Hero** (100vh, ink) — full-bleed image (`ChatGPT_Image_Sep_10_2026…png` from your CDN), left-to-right dark gradient on desktop, bottom-to-top on mobile. Eyebrow "Bespoke groomswear · Est. Hyderabad". H1 "The man of the moment." Sub-copy, 2 CTAs (ivory solid "Explore collections", outlined "See it on you"). Stats strip pinned to bottom: 1,00,000+ Outfits created · 20,000+ Grooms served · 6+ Years of craft · 4.8 Rated on Google & Justdial. Parallax: image moves 18% down, text 30% up on scroll.
4. **Marquee** — continuous left-scrolling text (38s loop, pauses on hover): Custom sherwanis · Pattu pancha · Indo-westerns · Designer suits & tuxedos · Jodhpuri · Sadris · Virtual try-on · Worldwide shipping, separated by small crimson diamonds.
5. **Signature Collections** (ivory) — bento grid, 4 columns × 2 rows of 380px on desktop. Swarnalayam spans 2×2; Designer Suits spans 2×1; others 1×1. Each card: image, bottom gradient, number "01…", title, one-line description, arrow square that fills ivory on hover. Image zooms 6% on hover (1.2s ease).
6. **Shop by Category** (bone) — horizontal scroll rail, cards 240px mobile / 300px desktop, 3:4 images, title + "Explore" under a hairline. Pattu Pancha · Sherwani · Designer Suits · Indo Western · Jodhpuri · Kurta · Sadris.
7. **Virtual Try-On** (ink) — 5/7 split. Left: heading "See it on you, before the first stitch.", 3 steps with outlined gold icons, gold "Try now" button. Right: try-on image with slow parallax and a floating ivory "Live preview" card overlapping bottom-left.
8. **Latest Arrivals** (ivory) — heading "New this season." + filter tabs (Sherwani / Pattu Pancha / Suits). 3-col product grid, 3:4 images, "Made to measure" tag, hover reveals "+" quick-view button. Product title (Cormorant) left, price right in INR.
9. **Shop by Occasion** (bone) — left column sticky with heading + 4:5 image that crossfades; right column is a numbered list in 60px Cormorant: Dhoti Ceremony · Wedding · Reception · Sangeet · Haldi · Festive. Hovered item turns crimson, arrow slides in.
10. **Reviews** (ink) — heading "Loved by twenty thousand grooms." + two rating blocks (4.8 Google · 374 reviews; 4.8 Justdial · 369 reviews). 3 quote cards (customer photo fades in behind on hover). Below: 8-tile client gallery, greyscale → colour on hover.
11. **Stores + Contact** (ivory) — heading "Two studios. One standard." Left: Hyderabad & California cards (image, tag, address, phone, hours). Right: ink contact card "Tell us about your day." Fields: Full name, Phone, Email, Occasion (select), Message; underline-only inputs; button "Request a call back". Success state: check icon, "Thank you, {first name}." + "Send another request".
12. **Footer** (ink) — gold hairline top. Big CTA "Let's dress *your* moment." with arrow → contact. Columns: Explore (nav links), Connect (WhatsApp, Instagram, email). Bottom: oversized watermark "GROOM2B" at 8% white + copyright.

## 5. Motion rules

- Easing everywhere: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Headings: masked line reveal (slide up from 110%), 1s, 0.1s stagger per line, triggered when 10% into viewport, once.
- Blocks: fade + 32px rise, 0.9s, 0.08s stagger between sibling cards.
- Buttons: crimson fill wipes up from bottom on hover (0.5s). Links: 1px underline grows left→right.
- Smooth scrolling (Lenis, lerp 0.09). Anchor links scroll with −72px header offset.

## 6. Copy (final)

All copy is in `frontend/src/lib/content.js` in the codebase and visible in the screenshots. Contact form posts to a backend endpoint; on Shopify, wire the same fields to your existing "Get a call back" contact form.

## 7. Assets

All images are your existing Shopify CDN files (`groom2b.in/cdn/shop/files/…`); filenames are listed in `content.js`. No new assets are required.
