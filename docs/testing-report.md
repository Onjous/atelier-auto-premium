# Testing & Performance Report

Final verification run: 25 October 2026, on macOS (Darwin 27), Node 24.21, against the production build (`next build` + `next start`).

## Summary

| Check | Command | Result |
|---|---|---|
| Type checking (strict) | `npm run typecheck` | ✅ Pass, 0 errors |
| Linting (next/core-web-vitals + TS) | `npm run lint` | ✅ Pass, 0 errors, 0 warnings |
| Unit & data tests | `npm test` | ✅ 54 / 54 in 6 files |
| Production build | `npm run build` | ✅ 47 / 47 routes prerendered as static HTML |
| E2E journeys | `npm run test:e2e` | ✅ 27 / 27 (+1 mobile-only test skipped on desktop) |
| Accessibility (axe-core, WCAG 2.0/2.1/2.2 A & AA) | `npm run test:e2e` | ✅ 14 routes × 2 viewports, 0 violations |
| Dependency audit | `npm audit` | ✅ 0 vulnerabilities (after upgrading Next 16.4.0 → 16.4.1; see below) |

## Unit tests (`tests/unit`)

- **pricing.test.ts** — rounding, size and condition scaling, size-insensitive packages, add-on availability, the full estimate (sum, 12 % upper bound, line order), unknown or inapplicable ids, the human-readable formula, determinism, starting prices.
- **search.test.ts** — normalisation (case, diacritics, punctuation), AND semantics, accent-insensitive matching.
- **portfolio.test.ts** — combined filters, search across marque/model/service labels, empty results, facet counts, related projects.
- **journal.test.ts** — category filter, full-text body search, the ≥ 3-minute reading-time floor for every article, related articles exclude self, unique table-of-contents ids.
- **booking.test.ts** — lead time, Sunday closure, six-month horizon, every step's validation (including date windows and phone-preference rules), package consistency, payload shaping (trimming, consent flag omitted, deselected packages dropped), deterministic demo reference, persistence that **never stores contact details**, URL prefill merge and sanitisation.
- **data-integrity.test.ts** — content volume (6 services, ≥ 12 projects, ≥ 6 articles), unique ids and URL-safe slugs, every package, service, add-on, comparison and testimonial relation, every referenced image resolving with alt text and existing on disk, no project using its own hero as a "representative" image, the simulated image flagged, base prices on the 50 PLN rounding grid.

## End-to-end journeys (`tests/e2e/journeys.spec.ts`)

Run in WebKit at 1440 × 900 (Desktop Safari profile) and on an iPhone 14 profile.

Home hero renders with no console errors · before/after slider keyboard control (Home/End/arrows → `aria-valuenow`) · FAQ accordion `aria-expanded` · primary navigation (desktop nav and mobile menu) to a service page · mobile menu closes on Escape · real 404 status and custom page · portfolio marque + service filters, URL sync, search, empty state and reset · filters restored from URL · lightbox open, next, Escape · case-study "next study" link · pricing calculator line items, size change, formula text, reset · pricing preselection from URL · full booking flow with prefill, validation errors, back navigation that keeps data, calendar selection, review, demonstration confirmation with reference · journal category filter, body-text search and article TOC.

**Why WebKit:** Chromium's headless shell installed by Playwright hangs on `Page.captureScreenshot` on this macOS build (reproduced on a blank page with several GPU flags). Traces and visual QA need screenshots, so WebKit is used for E2E. Chromium was still used for Lighthouse, with screenshot audits skipped.

## Accessibility

- axe-core 4.13 via `@axe-core/playwright` on 14 representative routes at desktop and mobile widths, with reduced motion and all reveal states applied: **0 violations**.
- Issues found and fixed during QA: contrast of inactive process steps (opacity dimming replaced with a colour that passes), upcoming booking-step numbers, social placeholders, the decorative footer wordmark (now `aria-hidden` SVG), keyboard access to horizontally scrollable tables (now focusable, labelled regions), heading order on `/portfolio`.
- Implemented beyond automated checks: skip link, visible focus rings, WAI-ARIA accordion, native `<dialog>` lightbox, mobile menu with focus trap, Escape and scroll lock, ARIA slider for the comparison, keyboard-navigable calendar (arrows, Home/End, PageUp/PageDown), error summaries with focus management and field-level `aria-describedby`, `aria-live` result counts, reduced-motion mode.
- **Not verified:** manual screen-reader testing (VoiceOver/NVDA) and manual keyboard-only walkthroughs of every page. Automated tools catch only part of WCAG; a manual audit is listed in `production-tasks.md`.

## Responsive QA

Full-page captures with `scripts/qa-screens.mjs` (WebKit) at 1440, 768 and 390 px for all routes. The script also reports horizontal overflow and console errors.

- Final state: **0 px horizontal overflow** on every captured route, **0 console errors** (the 404 route logs its own expected 404 response).
- Fixed during QA: single-column grids expanded by scroll rows and tables (all base grids now `minmax(0, 1fr)`); header CTA showing on mobile because component CSS sat outside `@layer components`; Parallax wrapper collapsing; footer column widths; misaligned package prices; mobile hero legibility; oversized featured journal image.
- Widths 320, 375, 430, 1024 and 1920 px were **not** individually captured. The layouts are fluid (`clamp()` type, `minmax` grids), but a pass at those exact widths is recommended.

## Performance (Lighthouse 13.5, production build, localhost)

Mobile runs use Lighthouse's default simulated throttling (Moto G Power, slow 4G, 4× CPU). Screenshot audits were skipped (see above). Measured on 25 October 2026, before the last two cosmetic CSS tweaks.

| Page | Perf | A11y | BP | SEO | LCP (sim.) | TBT | CLS |
|---|---|---|---|---|---|---|---|
| Home — desktop | 100 | 100 | 100 | 100 | 0.7 s | 0 ms | 0 |
| Home — mobile | 94 | 100 | 100 | 100 | 3.1 s | 20 ms | 0 |
| Services — mobile | 92 | 100 | 100 | 100 | 3.3 s | 10 ms | 0 |
| Service detail — mobile | 96 | 100 | 100 | 100 | 2.8 s | 10 ms | 0 |
| Portfolio — mobile | 98 | 100 | 100 | 100 | 2.4 s | 10 ms | 0 |
| Case study — mobile | 91 | 100 | 100 | 100 | 3.5 s | 20 ms | 0 |
| Pricing — mobile | 96 | 100 | 100 | 100 | 2.7 s | 10 ms | 0 |
| About — mobile | 95 | 100 | 100 | 100 | 2.9 s | 10 ms | 0 |
| Journal — mobile | 96 | 100 | 100 | 100 | 2.8 s | 10 ms | 0 |
| Article — mobile | 96 | 100 | 100 | 100 | 2.8 s | 10 ms | 0 |
| FAQ — mobile | 99 | 100 | 100 | 100 | 2.2 s | 10 ms | 0 |
| Contact — mobile | 99 | 100 | 100 | 100 | 2.0 s | 10 ms | 0 |
| Book — mobile | 98 | 100 | 100 | 100 | 2.5 s | 10 ms | 0 |

**Reading these honestly**

- Every page meets the ≥ 90 target in all four categories. CLS is 0 everywhere and TBT ≤ 30 ms (a good proxy for INP).
- **Simulated mobile LCP exceeds 2.5 s on 8 of 12 mobile runs.** The *observed* (unthrottled, localhost) LCP was 48–118 ms; the simulated figure models every byte requested before LCP on slow 4G (≈ 335 KB on the home page: framework JS, CSS, fonts and the hero image). Lab simulation is not field data; real p75 LCP must be measured with RUM after deployment on a CDN.
- Changes made in response: hero headline animation shortened (shorter still on small screens), `fetchPriority="high"` with eager loading on hero images (Next 16 deprecates `priority`), the unneeded `latin-ext` font preload dropped.
- Remaining opportunities are listed in `production-tasks.md`: deployment on a CDN edge with 103 Early Hints, fewer client islands on image-heavy pages, smaller hero image variants for mobile, and checking whether Next's idle link prefetching (flagged as "unused JavaScript") should be limited on mobile.

## Security note

`next@16.4.0` (initially pinned to stay at least two weeks behind the latest release) was flagged by the Next.js CLI and confirmed by `npm audit` with three advisories, including a **critical unauthenticated RCE in the Image Optimization API** (GHSA-2464-fhr4-w9xw). The project was upgraded to **16.4.1**, the earliest release that fixes all three.
