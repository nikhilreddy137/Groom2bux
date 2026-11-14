# GROOM2B — UX Redesign v2 · Developer Handoff

Concept prototype for the Shopify storefront at groom2b.in. Everything here is a **design reference** — rebuild it in the Shopify theme (sections + snippets). Screens are captured at desktop 1440 px and mobile 390 px, both @2x.

File naming: `{desktop|mobile}-{NN}-{screen}.jpg` — the number groups the screens in the order below.

| No. | Screens |
|---|---|
| 01–04 | Home: above the fold, full page, each section, footer |
| 05 | Header: mega menus (desktop), drawer menu (mobile), scrolled state |
| 06 | Book a Stylist popup: steps 1–4 and success |
| 07–08 | Collections page: all collections, single collection (Swarnalayam) |
| 09 | Listing with filters applied (+ mobile filter sheet) |
| 10 | Product quick view |
| 11 | Empty state |

---

## 1. Design tokens

### Colour — "royal": black, gold and ivory, maroon as a small accent only
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#14110f` | Dark sections, primary text, primary buttons |
| `--ink-2` | `#1f1b18` | Cards on dark sections, mobile bars |
| `--ivory` | `#f7f2e8` | Page background, text on dark |
| `--bone` | `#ece4d2` | Alternate light sections, image placeholders |
| `--gold` | `#b8893a` | Hairlines, icons, logo "2" |
| `--gold-light` | `#e8cb8a` | Eyebrows on dark, selected ticks |
| Gold gradient | `#c99a47 → #ecd297 → #c99a47` (100°) | Primary CTA ("Book a stylist"), marquee band |
| `--crimson` | `#8c1c2e` | Accent only: eyebrow labels on light, hover fill, progress bar start. **Never a section background.** |
| `--stone` | `#6b5f5a` | Secondary text on light |

No green anywhere in the UI. No rounded corners (radius 0) — everything is sharp-edged.

### Type
- Display: **Cormorant Garamond** 300 (light), italic 400 for emphasis words. H1 `clamp(3.2rem, 5.3vw, 6.2rem)`, section H2 36 / 48 / 60 px (mobile / tablet / desktop), line-height 0.98.
- Body & UI: **Manrope** 400–600. Body 16–18 px.
- Eyebrow: 11 px, uppercase, letter-spacing 0.32em, weight 500.
- Buttons: 12 px, uppercase, letter-spacing 0.22em, weight 600, padding 16 × 28 px.

### Layout
- Max width 1440 px; side padding 24 px mobile, 48 px desktop.
- Section vertical padding 112 px mobile, 160 px desktop.
- Breakpoint for desktop layout: 1024 px.

### Motion
- Easing `cubic-bezier(0.22, 1, 0.36, 1)` everywhere.
- Sections fade/slide up 32 px on entering the viewport (0.9 s). Headlines reveal line-by-line from a mask.
- Images zoom to 1.04–1.06 on hover (0.7–1.2 s).
- Smooth scrolling (Lenis, lerp 0.09). Optional in Shopify.

---

## 2. Header

**Announcement bar** — 32 px, ink background, gold-light text, whole bar opens the Book a Stylist popup.

**Main bar** — 64 px mobile / 76 px desktop, fixed under the announcement bar.
- Over the hero: transparent, ivory text, gold "Book a stylist" button.
- After 40 px of scroll: ivory at 88 % with blur, ink text, ink button (crimson on hover).
- Desktop links: Collections ▾ · Shop ▾ · Virtual Try-On · Real Grooms · Stores. Right side: WhatsApp icon button, Book a stylist.
- Mobile: logo · Book a stylist · menu icon.

**Mega menu (desktop)** — opens on hover/focus, closes on mouse-leave, Escape, or hovering the dimmed page. Full-width ivory panel, header turns solid ivory, 2 px gold underline under the active link, page behind dimmed 50 %.
- *Collections*: left column (eyebrow, headline, short copy, "View all collections" button) + 6 collection tiles (3:4 image, name, one-line description, gold bar grows on hover).
- *Shop*: "By category" list with product counts · "By occasion" list with counts · "The GROOM2B way" service links (try-on, made to measure, shipping, book a stylist) · 2 feature image cards.

**Mobile menu** — full-screen ink drawer sliding in from the right.
- Accordions (one open at a time): Collections (2-column image tiles), Shop by category (thumbnail + name, 2 columns), Shop by occasion (outlined chips).
- Plain links: Virtual Try-On, Real Grooms, Stores.
- Pinned footer: gold Book a stylist button, WhatsApp, Call.

**Mobile sticky bar** — appears after 500 px of scroll on every page: WhatsApp icon + gold Book a stylist button.

---

## 3. Book a Stylist popup

Opens from every "Book a stylist" control (header, announcement bar, hero, process section, try-on section, footer, mega menu, mobile menu, sticky bar, collections page, product quick view).

- Desktop: centred 1100 × 740 px, two panes. Left 36 % ink pane with photo, title, 4-step checklist (done steps get a gold tick) and three reassurance lines. Right ivory pane with step header, 3 px progress bar (crimson → gold), scrollable content, pinned footer (Back / Continue).
- Mobile: bottom sheet at 94 % of screen height, right pane only.
- Close: X button, Escape, tap on backdrop. Page behind is locked.
- Continue stays disabled (40 % opacity) until the step is complete.

| Step | Content | Rule |
|---|---|---|
| 1 The occasion | 6 image tiles: Dhoti Ceremony, Wedding, Reception, Sangeet, Haldi, Engagement | Pick one |
| 2 The outfit | 7 category image tiles + "Not sure yet" | Pick one or more; "Not sure yet" clears the others |
| 3 Where & when | Hyderabad studio / California boutique / Video call · next 14 days as a horizontal rail · 5 time slots | All three needed |
| 4 Your details | Name*, phone*, email (optional), notes + summary box | Name ≥ 2 chars, phone ≥ 7 digits |
| Success | Confirmation, summary, Done + WhatsApp buttons | — |

Selected tiles: ink fill, ivory text, 1 px gold inner border, gold tick top-right.
When opened from a product, the product name is carried through as "Outfit you liked" and its category is pre-selected.

For Shopify: submit to your booking/CRM tool (e.g. a Shopify Form, Calendly, or a metaobject). The time slots shown are *requested* slots confirmed by the stylist on WhatsApp — not live availability.

---

## 4. Home page (top to bottom)

1. **Hero** — full-screen palace photo shown in true colour; grooms on the left, copy on the right 45 % over a black gradient (`ink` at the right edge fading to clear by 64 %). Mobile: photo fills the top 58 % of the screen, copy below. CTAs: gold Book a stylist, outlined Explore collections, text link See it on you. Stats strip pinned to the bottom (4 columns desktop, 2 × 2 mobile).
2. **Marquee** — gold gradient band, ink serif text, diamond separators, 38 s loop, pauses on hover.
3. **Signature collections** — bento grid of 6 (first tile 2 × 2, last 2 × 1). Each tile links to its collection page.
4. **Shop by category** — horizontal snap rail, 3:4 cards (240 px mobile / 300 px desktop). Links to the listing filtered by category.
5. **Virtual try-on** — ink section, 3 steps with outlined gold icons, large image with floating "Live preview" card.
6. **Latest arrivals** — tabs (Sherwani / Pattu Pancha / Suits), 3-column product grid, "Shop all styles" button.
7. **Made to measure** (new) — ink section, 4 numbered steps on a gold hairline with diamond markers: Consult, Design, Craft, Fit & deliver.
8. **Shop by occasion** — sticky image on the left swaps as each occasion row is hovered; rows link to the listing filtered by occasion.
9. **Real grooms** — ink section, rating badges, 3 quote cards, 8-photo strip (greyscale → colour on hover).
10. **Stores + call-back form** — two studio cards and the short call-back form.
11. **Footer** — large "Let's dress your moment" CTA (opens popup), WhatsApp / Instagram, then 4 columns: brand, Collections, Shop, Visit.

---

## 5. Collections page

Shopify mapping: this is the collection template. `?c=` = collection handle, the filters = Search & Discovery filters (product type, occasion tag/metafield, price).

1. **Collection hero** — ink band, collection photo on the right 58 % with gradient. Breadcrumb (Home › Collections › Name), eyebrow, H1 = collection name, italic gold tagline, 2-line story, "N styles · made to measure".
2. **Collection rail** — bone strip, horizontally scrollable pills (thumbnail + name): All + the 6 signature collections. Active pill is ink with a gold diamond.
3. **Toolbar** — sticks under the header. Desktop: result count · search field · sort select. Mobile: Filters button (with count) · sort select.
4. **Filters** — desktop: sticky left sidebar (3 of 12 columns). Mobile: bottom sheet with Clear / "Show N styles". Groups: Category, Occasion, Price (Under ₹25,000 · ₹25,000–50,000 · ₹50,000–80,000 · ₹80,000 & above). Square checkboxes, product count per option, options with 0 results are dimmed and disabled.
5. **Active filter chips** — ink chips with ×, plus "Clear all".
6. **Product grid** — 2 columns mobile, 3 columns desktop (from 1280 px). Card: 3:4 image, "Made to measure" tag, second image fades in on hover, "Quick view" bar slides up on hover (desktop), category eyebrow, name (2 lines max), price.
7. **Pagination** — "Showing X of Y", thin progress line, "Load more styles" (12 at a time).
8. **Empty state** — message, Clear filters, Book a stylist.
9. **Closing CTA band** — "Let a stylist build your look with you" + gold button.

**Quick view** — desktop 980 px two-column modal (image left with thumbnail switcher, details right); mobile bottom sheet. Shows category, name, price, occasion chips, 3 service lines, gold "Book a stylist for this look" and outlined "Ask on WhatsApp" (pre-filled message with the product name).

---

## 6. Notes on the data in these screens

- Product names, prices and photos are pulled from the live groom2b.in catalogue (103 products across the six signature collections and seven categories).
- In the prototype, occasion tags on some products are inferred from their category. In Shopify, drive them from the real occasion collections/tags.
- Copy for collection stories, the made-to-measure steps and the popup is new draft copy — please review before publishing.
