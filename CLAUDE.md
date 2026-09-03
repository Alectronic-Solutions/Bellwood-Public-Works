# Project: Bellwood Public Works Demo Site

## What this is
A fictional municipal government website built as a portfolio demonstration piece.
It is NOT a real government site and must never be mistaken for one.

## Non-negotiable rules
- Accessibility is the primary requirement. WCAG 2.1 AA and Section 508.
  Every component must pass: keyboard navigation, visible focus states,
  4.5:1 text contrast minimum, semantic landmarks, real alt text, correct
  heading order with no skipped levels.
- A persistent demo disclosure must appear on every page. It lives in the footer
  copyright line (footer.copyright in /content), which reads "This is a
  demonstration website and does not represent a real municipality." The separate
  header and footer notice banners were removed on request, so this line is now the
  only disclosure on the site and must not be removed as well.
- All pages must carry noindex, nofollow meta tags.
- No em dashes anywhere in copy or content.
- No lorem ipsum. Write plausible municipal content.
- Motion is minimal and always respects prefers-reduced-motion.

## Stack
Next.js 14 App Router, TypeScript, Tailwind CSS, lucide-react.
Static export (output: 'export') deployed to GitHub Pages under /Bellwood-Public-Works.
The base path comes from the BASE_PATH env var, set only by the deploy job.
No Framer Motion. No shadcn/ui. Components are handcoded.

## Verification
Accessibility is enforced, not just asserted. CI runs lint (including
plugin:jsx-a11y/recommended), tsc --noEmit, the static export, and a Playwright plus
axe-core audit of every page template at desktop and mobile widths. A single violation
blocks the deploy. Run the whole set locally with `npm test`.
Never add a link to a page or document that does not exist; tests/links.spec.ts fails
the build for dead internal links and missing downloads.

## Dates
Content dates in /content are written against the anchor in lib/dates.ts and shifted
forward at build time in whole weeks, so meetings keep their weekday and the site never
shows an empty "Upcoming Meetings" list. Prose that names a date must use a
{date:YYYY-MM-DD} token so the sentence moves with the record.

## Design direction
This is a government site, not a premium agency site. Light background,
high contrast, plain and institutional. Restrained and legible over stylish.
Reference the U.S. Web Design System patterns in spirit, do not copy its assets.

Palette (CSS variables, defined once in globals.css):
--gov-navy: #1B3A5C      primary
--gov-blue: #2E5C8A      links and interactive
--gov-slate: #4A5568     body text
--gov-border: #D6DBE1    rules and dividers
--gov-bg: #FFFFFF        page background
--gov-surface: #F4F6F8   cards and secondary surfaces
--gov-alert: #B45309     notices and warnings
--gov-success: #15803D   confirmations

Typography: Public Sans for everything, self-hosted, not loaded from a CDN.
It is the open source font used across US federal government sites.

## Content architecture
All content lives in typed data files under /content so it can be swapped
per variant. No hardcoded content inside components.
- /content/services.ts
- /content/notices.ts
- /content/meetings.ts
- /content/forms.ts
- /content/en.ts and /content/es.ts for UI strings

## Working style
Provide complete file replacements. Never partial edits, snippets, or
find-and-replace instructions.
