# Bellwood Public Works

A fictional municipal government website, built as a portfolio piece to demonstrate that an
accessible public sector site can be plain, fast, and genuinely usable at the same time.

**Bellwood is not a real city and this is not a real government website.** Every page carries a
demonstration notice, and the whole site is served with `noindex, nofollow`.

[![Build, audit, and deploy](https://github.com/Alectronic-Solutions/Bellwood-Public-Works/actions/workflows/deploy.yml/badge.svg)](https://github.com/Alectronic-Solutions/Bellwood-Public-Works/actions/workflows/deploy.yml)

## The point of the project

Most sites claim accessibility in a statement nobody verifies. This one is built so the claim is
checked on every commit, and the [accessibility statement](app/accessibility/page.tsx) names the
things that are still imperfect instead of glossing over them.

The target is **WCAG 2.1 Level AA and Section 508**. What enforces it:

- **axe-core runs against the real static export** in a browser, at desktop and mobile widths,
  across every page template and both dynamic routes.
- **Interactive states are audited too**, not just first paint: the mobile menu opened, a
  navigation dropdown expanded, and the contact form after a failed submit.
- **Structural assertions** beyond what axe checks, including exactly one `main` landmark per
  page, a heading outline that starts at `h1` with no skipped levels, and a skip link that really
  moves focus.
- **Link integrity**, so every internal link resolves to a file that exists and every advertised
  document download is a real, non-truncated PDF.
- **`plugin:jsx-a11y/recommended`** in the lint config, rather than the small subset that
  `next/core-web-vitals` turns on by default.

A single violation fails the build and blocks the deploy.

## Stack

| | |
|---|---|
| Framework | Next.js 14, App Router, `output: 'export'` |
| Language | TypeScript, strict |
| Styling | Tailwind CSS, no component library |
| Icons | lucide-react |
| Type | Public Sans, self-hosted via `next/font/local` |
| Testing | Playwright and `@axe-core/playwright` |
| Hosting | GitHub Pages, static files only |

No Framer Motion, no shadcn/ui, no CSS-in-JS. Components are handcoded so there is no third party
markup to audit around.

## How it is put together

**Content is separate from presentation.** Everything readable lives in typed data files under
[`/content`](content), so a whole variant of the site can be swapped without touching a component.
That includes both languages: [`en.ts`](content/en.ts) and [`es.ts`](content/es.ts) are key-for-key
translations covering not just visible copy but the accessible names of landmarks and controls, so
a Spanish screen reader user is not read English page structure.

**Dates keep themselves current.** A demo whose "Upcoming Meetings" list is empty looks abandoned.
Content dates are stored against a fixed anchor and shifted forward at build time by whole weeks,
so recurring meetings keep their weekday and the schedule always has genuinely upcoming entries.
Prose that names a date, such as a bid deadline, uses a `{date:YYYY-MM-DD}` token so the sentence
moves with the notice rather than contradicting it. See [`lib/dates.ts`](lib/dates.ts). A weekly
scheduled rebuild keeps the deployed site current without anyone touching the repo.

**Downloads are real.** The site advertises 60+ agendas, minutes, and forms with a file type and
size beside each one. [`scripts/generate-documents.mjs`](scripts/generate-documents.mjs) reads the
built HTML and writes a real PDF for every one of them, so no download is a dead link.

**Search runs in the browser.** There is no server, so [`lib/search.ts`](lib/search.ts) indexes the
content files directly and matches accent-folded terms across services, notices, meetings, forms,
projects, and departments.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

Note that `npm run dev` will not serve the generated PDFs until you have run a build at least
once, since they are written during the build.

## Checks

```bash
npm run lint         # ESLint, including plugin:jsx-a11y/recommended
npm run typecheck    # tsc --noEmit
npm run build        # static export to out/, then generate the PDFs
npm run test:a11y    # Playwright and axe against the export
npm test             # all of the above in order
```

`test:a11y` needs a browser once: `npx playwright install chromium`.

The accessibility suite serves `out/` with a small dependency-free static server
([`scripts/serve-static.mjs`](scripts/serve-static.mjs)) so the audit sees exactly the files that
ship, not a dev server approximation.

## What automated testing does not cover

axe catches perhaps a third of real accessibility barriers. Before any meaningful change, this
site is also checked by hand:

- Keyboard only, from the skip link through the footer, watching that the focus ring stays visible
  against both the light page background and the navy header and footer.
- A screen reader landmark and heading pass, in English and in Spanish.
- 200 percent browser zoom combined with the in-page text size control.
- The operating system set to reduced motion, confirming no content becomes unreadable.

## Design

Institutional rather than stylish, in the spirit of the U.S. Web Design System without copying its
assets. Light background, high contrast, restrained. The palette is defined once as CSS variables
in [`app/globals.css`](app/globals.css) and wired into Tailwind, including a dedicated control
border token that clears the 3:1 non-text contrast requirement, which the softer divider color
does not.

## License and attribution

Built by [Alectronic Solutions](https://alectronicsolutions.com) as a portfolio demonstration.
The city, its departments, staff, notices, meetings, and documents are entirely fictional.
