"""Captures the developer handoff screenshot pack. Usage: URL=http://localhost:3000 python3 capture_handoff.py"""
import asyncio, os, glob
from playwright.async_api import async_playwright

URL = os.environ["URL"].rstrip("/")
OUT = "/app/frontend/public/handoff"
os.makedirs(OUT, exist_ok=True)
for f in glob.glob(f"{OUT}/*.png") + glob.glob(f"{OUT}/*.jpg") + glob.glob(f"{OUT}/*.zip"):
    os.remove(f)

HOME_SECTIONS = ["top", "collections", "categories", "tryon", "arrivals", "process", "occasions", "reviews", "stores"]

# Walk the page so every scroll-triggered animation reaches its final state
FORCE_VISIBLE = """
() => new Promise(res => {
  const l = window.__lenis; let y = 0;
  const go = (v) => l ? l.scrollTo(v, {immediate: true, force: true}) : window.scrollTo(0, v);
  const step = () => { y += 450; go(y); if (y < document.body.scrollHeight) setTimeout(step, 140); else { go(0); setTimeout(res, 1200); } };
  step();
});
"""
BOX = """(sel) => { const el = document.querySelector(sel); const r = el.getBoundingClientRect();
  return {x: 0, y: r.top + window.scrollY, width: document.documentElement.clientWidth, height: Math.min(r.height, 7000)}; }"""


async def shot(page, name, clip=None, full=False):
    await page.screenshot(path=f"{OUT}/{name}.jpg", type="jpeg", quality=88, full_page=full or bool(clip), clip=clip)
    print("saved", name)


async def tid(page, t, wait=700):
    await page.click(f'[data-testid="{t}"]', force=True)
    await page.wait_for_timeout(wait)


async def load(page, path):
    await page.goto(URL + path, wait_until="networkidle", timeout=90000)
    await page.wait_for_timeout(2500)


async def home(page, d):
    await load(page, "/")
    await shot(page, f"{d}-01-home-above-fold")
    await page.evaluate(FORCE_VISIBLE)
    await page.wait_for_timeout(1000)
    await page.add_style_tag(content='[data-testid="mobile-sticky-cta"]{display:none!important}')
    await shot(page, f"{d}-02-home-full-page", full=True)
    for i, s in enumerate(HOME_SECTIONS):
        await shot(page, f"{d}-03-home-section-{i + 1:02d}-{s}", clip=await page.evaluate(BOX, f"#{s}"))
    await shot(page, f"{d}-04-footer", clip=await page.evaluate(BOX, "footer"))


async def header(page, d):
    await load(page, "/")
    if d == "desktop":
        for m in ["collections", "shop"]:
            await page.hover(f'[data-testid="nav-link-{m}"]')
            await page.wait_for_timeout(1200)
            await shot(page, f"{d}-05-mega-menu-{m}")
        await page.mouse.move(700, 880)
        await page.evaluate("window.__lenis.scrollTo(1400, {immediate: true})")
        await page.wait_for_timeout(1200)
        await shot(page, f"{d}-05-header-scrolled-state")
    else:
        await tid(page, "nav-menu-toggle", 1200)
        await shot(page, f"{d}-05-menu-collections-open")
        await tid(page, "mobile-menu-section-category", 900)
        await shot(page, f"{d}-05-menu-category-open")
        await tid(page, "mobile-menu-section-occasion", 900)
        await shot(page, f"{d}-05-menu-occasion-open")
        await tid(page, "mobile-menu-close")
        await page.evaluate("window.__lenis.scrollTo(1400, {immediate: true})")
        await page.wait_for_timeout(1500)
        await shot(page, f"{d}-05-header-scrolled-with-sticky-cta")


async def booking(page, d):
    await load(page, "/")
    await tid(page, "nav-book-consultation-btn", 1300)
    await shot(page, f"{d}-06-booking-step-1-occasion-empty")
    await tid(page, "booking-occasion-wedding")
    await shot(page, f"{d}-06-booking-step-1-occasion-selected")
    await tid(page, "booking-next-btn", 900)
    await tid(page, "booking-outfit-sherwani", 200)
    await tid(page, "booking-outfit-pattu-pancha")
    await shot(page, f"{d}-06-booking-step-2-outfits")
    await tid(page, "booking-next-btn", 900)
    await tid(page, "booking-mode-hyderabad-studio", 200)
    await page.locator('[data-testid^="booking-date-2"]').nth(3).click(force=True)
    await tid(page, "booking-time-2")
    await shot(page, f"{d}-06-booking-step-3-where-when")
    await tid(page, "booking-next-btn", 900)
    await page.fill('[data-testid="booking-name-input"]', "Arjun Reddy")
    await page.fill('[data-testid="booking-phone-input"]', "+91 98765 43210")
    await page.fill('[data-testid="booking-email-input"]', "arjun@example.com")
    await page.fill('[data-testid="booking-notes-input"]', "Wedding in February, ivory and gold palette.")
    await page.wait_for_timeout(400)
    await shot(page, f"{d}-06-booking-step-4-details")
    await tid(page, "booking-next-btn", 200)
    await page.wait_for_selector('[data-testid="booking-success"]', timeout=15000)
    await page.wait_for_timeout(900)
    await shot(page, f"{d}-06-booking-step-5-success")


async def collections(page, d):
    await load(page, "/collections")
    await shot(page, f"{d}-07-collections-all-above-fold")
    await page.evaluate(FORCE_VISIBLE)
    await page.add_style_tag(content='[data-testid="mobile-sticky-cta"]{display:none!important}')
    await shot(page, f"{d}-07-collections-all-full-page", full=True)
    await load(page, "/collections?c=swarnalayam")
    await shot(page, f"{d}-08-collection-swarnalayam-above-fold")
    await page.evaluate(FORCE_VISIBLE)
    await page.add_style_tag(content='[data-testid="mobile-sticky-cta"]{display:none!important}')
    await shot(page, f"{d}-08-collection-swarnalayam-full-page", full=True)
    await load(page, "/collections?category=Sherwani&occasion=Wedding&price=50-80&sort=price-asc")
    y = await page.evaluate("document.querySelector('[data-testid=\"shop-toolbar\"]').getBoundingClientRect().top + window.scrollY - 110")
    await page.evaluate(f"window.__lenis.scrollTo({y}, {{immediate: true}})")
    await page.wait_for_timeout(1500)
    await shot(page, f"{d}-09-collections-filters-applied")
    if d == "mobile":
        await tid(page, "open-filters-btn", 1200)
        await shot(page, f"{d}-09-collections-filter-sheet")
        await tid(page, "filters-sheet-close")
    await tid(page, "shop-product-open-0", 1800)
    await shot(page, f"{d}-10-product-quick-view")
    await load(page, "/collections?c=suits&category=Kurta")
    y = await page.evaluate("document.querySelector('[data-testid=\"shop-toolbar\"]').getBoundingClientRect().top + window.scrollY - 110")
    await page.evaluate(f"window.__lenis.scrollTo({y}, {{immediate: true}})")
    await page.wait_for_timeout(1200)
    await shot(page, f"{d}-11-collections-empty-state")


async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for d, w, h in [("desktop", 1440, 900), ("mobile", 390, 844)]:
            ctx = await browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=2, has_touch=d == "mobile")
            for fn in [home, header, booking, collections]:
                page = await ctx.new_page()
                try:
                    await fn(page, d)
                except Exception as e:
                    print("FAILED", d, fn.__name__, e)
                await page.close()
            await ctx.close()
        await browser.close()


asyncio.run(run())
