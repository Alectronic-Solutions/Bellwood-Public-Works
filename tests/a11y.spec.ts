import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// The conformance target from CLAUDE.md: WCAG 2.1 Level AA and Section 508.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "section508"];

async function analyze(page: Page) {
  return new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
}

function describeViolations(results: Awaited<ReturnType<typeof analyze>>) {
  return results.violations
    .map((violation) => {
      const targets = violation.nodes.map((node) => `      ${node.target.join(" ")}`).join("\n");
      return `  [${violation.impact ?? "unknown"}] ${violation.id}: ${violation.help}\n${targets}`;
    })
    .join("\n");
}

// One representative page per template, plus one instance of each dynamic route.
const routes = [
  { name: "home", path: "/" },
  { name: "services index", path: "/services/" },
  { name: "service detail", path: "/services/water-sewer/" },
  { name: "notices index", path: "/notices/" },
  { name: "notice detail", path: "/notices/water-main-repair-elm/" },
  { name: "meetings", path: "/meetings/" },
  { name: "forms", path: "/forms/" },
  { name: "contact", path: "/contact/" },
  { name: "public records", path: "/public-records/" },
  { name: "accessibility", path: "/accessibility/" },
  { name: "privacy", path: "/privacy/" },
  { name: "site map", path: "/site-map/" },
  { name: "departments", path: "/departments/" },
  { name: "projects", path: "/projects/" },
  { name: "search with results", path: "/search/?q=water" },
  { name: "search with no results", path: "/search/?q=zzzznotathing" },
  { name: "not found", path: "/this-page-does-not-exist/" },
];

for (const route of routes) {
  test(`${route.name} has no WCAG 2.1 AA violations`, async ({ page }) => {
    await page.goto(route.path);
    const results = await analyze(page);
    expect(results.violations, `\n${describeViolations(results)}`).toEqual([]);
  });
}

test("every page has exactly one main landmark and starts its outline at h1", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);

    const mainCount = await page.locator("main").count();
    expect(mainCount, `${route.path} should have exactly one <main>`).toBe(1);

    const levels = await page.locator("h1, h2, h3, h4, h5, h6").evaluateAll((nodes) =>
      nodes.map((node) => Number(node.tagName.slice(1))),
    );

    expect(levels[0], `${route.path} should open its outline with an h1`).toBe(1);
    expect(levels.filter((level) => level === 1), `${route.path} should have exactly one h1`).toHaveLength(1);

    for (let i = 1; i < levels.length; i += 1) {
      expect(
        levels[i] - levels[i - 1],
        `${route.path} skips a heading level at position ${i} (h${levels[i - 1]} to h${levels[i]})`,
      ).toBeLessThanOrEqual(1);
    }
  }
});

test("skip link moves focus to the main landmark", async ({ page }) => {
  await page.goto("/services/");

  await page.keyboard.press("Tab");
  const skipLink = page.locator("a.skip-link");
  await expect(skipLink).toBeFocused();

  await page.keyboard.press("Enter");
  const focusedId = await page.evaluate(() => document.activeElement?.id);
  expect(focusedId).toBe("main-content");

  const focusedTag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
  expect(focusedTag).toBe("main");
});

test("urgent alert is fully readable with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const alert = page.getByRole("region", { name: /urgent notice|aviso urgente/i });
  await expect(alert).toBeVisible();

  // The old marquee clipped its text at the container edge when the animation was
  // suppressed. Nothing inside the alert may overflow its own box.
  const overflowing = await alert.evaluate((node) => {
    const elements = [node, ...Array.from(node.querySelectorAll("*"))];
    return elements.filter((el) => el.scrollWidth > el.clientWidth + 1).length;
  });
  expect(overflowing, "alert content is clipped horizontally").toBe(0);

  const results = await analyze(page);
  expect(results.violations, `\n${describeViolations(results)}`).toEqual([]);
});

test("scrolling alert shows one copy of each notice and never starts clipped", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const alert = page.getByRole("region", { name: /urgent notice|aviso urgente/i });
  await expect(alert).toBeVisible();

  // An earlier version tiled the list to fill the bar, which showed several copies at
  // once with the leading one cut in half. Each notice must appear exactly once.
  const links = await alert.evaluate((node) => {
    const anchors = Array.from(node.querySelectorAll("a"));
    return {
      total: anchors.length,
      tabbable: anchors.filter((a) => a.tabIndex >= 0).length,
      unique: new Set(anchors.map((a) => a.getAttribute("href"))).size,
    };
  });
  expect(links.total, "each notice should be rendered once").toBe(links.unique);
  expect(links.tabbable, "every rendered notice must be reachable").toBe(links.total);

  // The track has to be able to leave the viewport on both sides, or the notice either
  // starts already clipped or never scrolls clear of the edge.
  const travel = await alert.evaluate((node) => {
    const viewport = node.querySelector(".marquee-viewport") as HTMLElement | null;
    const track = node.querySelector(".marquee-track") as HTMLElement | null;
    if (!viewport || !track) return null;
    const span = getComputedStyle(track).getPropertyValue("--marquee-span").trim();
    return { span, viewport: viewport.clientWidth };
  });
  expect(travel, "marquee elements are missing").not.toBeNull();
  // The keyframe travels by the viewport's width, published in pixels by AlertBanner.
  // A percentage here would resolve against the track and start a short notice inside
  // the bar rather than off its right edge.
  expect(travel!.span, "marquee span should be a pixel value").toMatch(/px$/);
  expect(parseFloat(travel!.span)).toBeCloseTo(travel!.viewport, 0);
});

test("scrolling alert can be paused", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  // WCAG 2.2.2: movement lasting over five seconds needs a way to stop it. The button
  // is located by aria-pressed rather than by name, because its accessible name flips
  // to "Resume scrolling" once it is toggled.
  const pause = page.locator("button[aria-pressed]");
  await expect(pause).toBeVisible();
  await expect(pause).toHaveAccessibleName(/pause scrolling|pausar avisos/i);
  await pause.click();
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  await expect(pause).toHaveAccessibleName(/resume scrolling|reanudar avisos/i);

  const track = page.locator(".marquee-track");
  const before = await track.evaluate((n) => n.getBoundingClientRect().x);
  await page.waitForTimeout(700);
  const after = await track.evaluate((n) => n.getBoundingClientRect().x);
  expect(Math.round(before), "track kept moving after pause").toBe(Math.round(after));
});

test("mobile menu takes focus on open and returns it on Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: /open menu|abrir menú/i });
  await toggle.click();

  const menu = page.getByRole("navigation", { name: /main menu|menú principal/i });
  await expect(menu).toBeVisible();

  // Focus must land inside the menu. It previously did not, because the ref was
  // attached only to the link branch and the first item renders a button.
  const focusInsideMenu = await menu.evaluate((node) => node.contains(document.activeElement));
  expect(focusInsideMenu, "focus should move into the mobile menu when it opens").toBe(true);

  const results = await analyze(page);
  expect(results.violations, `\n${describeViolations(results)}`).toEqual([]);

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("site search returns results and reaches the page it links to", async ({ page, viewport }) => {
  // The header search box used to be a decorative input with no submit handler and no
  // results page, so typing a query and pressing Enter did nothing at all.
  const wide = (viewport?.width ?? 0) >= 640;
  await page.goto(wide ? "/" : "/");

  const box = page.getByRole("searchbox", { name: /search this site|buscar en este sitio/i }).first();
  await box.fill("pothole");
  await box.press("Enter");

  await expect(page).toHaveURL(/\/search\/\?q=pothole/);

  const results = page.getByRole("main").getByRole("listitem");
  await expect(results.first()).toBeVisible();

  // The first result must actually go somewhere real.
  const firstLink = results.first().getByRole("link").first();
  const href = await firstLink.getAttribute("href");
  expect(href).toBeTruthy();
  await firstLink.click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("contact form error summary is accessible after a failed submit", async ({ page }) => {
  await page.goto("/contact/");

  await page.getByRole("button", { name: /send message|enviar mensaje/i }).click();

  const results = await analyze(page);
  expect(results.violations, `\n${describeViolations(results)}`).toEqual([]);
});

test("primary nav dropdown is accessible when open", async ({ page, viewport }) => {
  // PrimaryNav is the desktop mega menu (hidden below the lg breakpoint). The mobile
  // equivalent is covered by the mobile menu test above.
  test.skip((viewport?.width ?? 0) < 1024, "desktop nav only renders at lg and above");

  await page.goto("/");

  const trigger = page.getByRole("navigation", { name: /^primary$|^principal$/i }).getByRole("button").first();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");

  const results = await analyze(page);
  expect(results.violations, `\n${describeViolations(results)}`).toEqual([]);
});

test("footer link groups collapse on phones and stay accessible when opened", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const footer = page.getByRole("contentinfo");
  const toggle = footer.getByRole("button", { name: /^services$|^servicios$/i });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(footer.getByRole("link", { name: /report a pothole|reportar un bache/i })).toBeHidden();

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(footer.getByRole("link", { name: /report a pothole|reportar un bache/i })).toBeVisible();

  const results = await analyze(page);
  expect(results.violations, `\n${describeViolations(results)}`).toEqual([]);
});

test("footer link groups are plain headings with visible lists on wide screens", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  // No disclosure button on desktop, so nobody hears "collapsed" for a visible list.
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("button", { name: /^services$/i })).toHaveCount(0);
  await expect(footer.getByRole("link", { name: /report a pothole/i })).toBeVisible();
});

test("past meetings archive expands and remains accessible", async ({ page }) => {
  await page.goto("/meetings/");

  // Matched on the words both states share, because the name flips to "Show fewer".
  const toggle = page.getByRole("button", { name: /past meetings/i });
  await expect(toggle).toHaveText(/show all \d+ past meetings/i);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  // Older meetings are rendered and only hidden, so their documents exist in the export.
  const hiddenRows = await page.locator("#past-meetings-table tr[hidden], #past-meetings-list li[hidden]").count();
  expect(hiddenRows).toBe(0);

  const results = await analyze(page);
  expect(results.violations, `\n${describeViolations(results)}`).toEqual([]);
});

test("every page has its own browser tab title", async ({ page }) => {
  const titles = new Map<string, string>();
  for (const route of routes.filter((item) => !item.path.includes("?") && item.name !== "not found")) {
    await page.goto(route.path);
    titles.set(route.path, await page.title());
  }
  for (const [path, title] of titles) {
    if (path === "/") continue;
    expect(title, `${path} should not reuse the home page title`).not.toBe(titles.get("/"));
    expect(title, `${path} title should name the site`).toMatch(/Bellwood Public Works$/);
  }
});

test("primary navigation marks the current section", async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) < 1024, "desktop nav only renders at lg and above");
  await page.goto("/notices/water-main-repair-elm/");

  const nav = page.getByRole("navigation", { name: /^primary$/i });
  await expect(nav.getByRole("link", { name: /^notices$/i })).toHaveAttribute("aria-current", "true");
  await expect(nav.locator('[aria-current="true"]')).toHaveCount(1);
});

test("search understands the words residents use", async ({ page }) => {
  // No page says "trash", so a literal match once returned nothing for the most common
  // query a public works site gets.
  await page.goto("/search/?q=trash");
  const first = page.getByRole("main").getByRole("listitem").first().getByRole("link");
  await expect(first).toHaveText(/waste and recycling collection/i);
});
