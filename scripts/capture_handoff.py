import asyncio, os, sys
from playwright.async_api import async_playwright

URL = os.environ["URL"]
OUT = "/app/frontend/public/handoff"
os.makedirs(OUT, exist_ok=True)

SECTIONS = ["top", "collections", "categories", "tryon", "arrivals", "occasions", "reviews", "stores"]

# Force all whileInView animations to their final state so full-page shots are complete
FORCE_VISIBLE = """
() => new Promise(res => {
  const h = document.body.scrollHeight; let y = 0;
  const step = () => { y += 500; window.scrollTo(0, y); if (y < h) setTimeout(step, 120); else { window.scrollTo(0,0); setTimeout(res, 1200); } };
  step();
});
"""

async def shoot(page, name, full=True, clip=None):
    path = f"{OUT}/{name}.png"
    await page.screenshot(path=path, full_page=full, clip=clip)
    print("saved", path)

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for label, w, h, scale in [("desktop", 1440, 900, 2), ("mobile", 390, 844, 3)]:
            ctx = await browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=scale)
            page = await ctx.new_page()
            await page.goto(URL, wait_until="networkidle", timeout=90000)
            await page.wait_for_timeout(2500)
            await page.evaluate(FORCE_VISIBLE)
            await page.wait_for_timeout(1500)
            await shoot(page, f"{label}-full-page")
            # per-section crops
            for s in SECTIONS:
                box = await page.evaluate(f"""() => {{ const el = document.getElementById('{s}'); const r = el.getBoundingClientRect(); return {{x:0, y:r.top + window.scrollY, width: document.documentElement.clientWidth, height: r.height}}; }}""")
                box["height"] = min(box["height"], 6000)
                await shoot(page, f"{label}-section-{s}", full=True, clip=box)
            # footer
            box = await page.evaluate("""() => { const el = document.querySelector('footer'); const r = el.getBoundingClientRect(); return {x:0, y:r.top + window.scrollY, width: document.documentElement.clientWidth, height: r.height}; }""")
            await shoot(page, f"{label}-section-footer", full=True, clip=box)
            # contact success state
            await page.fill('[data-testid="contact-name-input"]', "Arjun Reddy")
            await page.fill('[data-testid="contact-phone-input"]', "9876543210")
            await page.fill('[data-testid="contact-email-input"]', "arjun@example.com")
            await page.click('[data-testid="contact-submit-btn"]', force=True)
            await page.wait_for_selector('[data-testid="contact-success"]', timeout=10000)
            await page.wait_for_timeout(800)
            el = await page.query_selector('[data-testid="contact-form-wrapper"]')
            await el.screenshot(path=f"{OUT}/{label}-contact-success-state.png")
            print("saved contact success", label)
            if label == "mobile":
                await page.click('[data-testid="nav-menu-toggle"]', force=True)
                await page.wait_for_timeout(900)
                await page.screenshot(path=f"{OUT}/mobile-menu-open.png")
                print("saved mobile menu")
            await ctx.close()
        await browser.close()

asyncio.run(run())
