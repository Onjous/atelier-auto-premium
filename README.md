# ATELIER AUTO — Premium Detailing Studio (frontend demonstration)

A multi-page, art-directed website for a premium automotive detailing studio: paint protection film, ceramic coating, paint correction, detailing and maintenance. Built as a complete, working frontend demonstration with local data. No backend is required.

> **Demonstration content.** "Atelier Auto" is a provisional brand. Prices are sample values in PLN, testimonials are fictional, case studies use licensed stock photography with illustrative narratives, and the booking and contact forms send nothing. All of this is labelled on the site.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start            # http://localhost:3000
```

Requires Node ≥ 20.9 (developed on Node 24).

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` / `npm start` | Production build (all 47 routes static) / serve it |
| `npm run typecheck` | `tsc --noEmit` (strict) |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript) |
| `npm test` | Vitest unit and data-integrity tests |
| `npm run test:e2e` | Playwright journeys + axe accessibility checks (builds must exist; starts `next start` on :3100) |
| `npm run check` | typecheck → lint → test → build |
| `npm run images` | Download (once) and optimise photography into `public/images`, regenerate `media.generated.json` |
| `npm run docs:assets` | Regenerate `docs/asset-manifest.md` |
| `npm run qa:screens -- <outDir> <baseUrl> <paths> <widths>` | Full-page responsive screenshots with overflow and console-error report |

### Browsers for E2E

Playwright browsers are kept inside the workspace (gitignored):

```bash
PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright npx playwright install webkit
PLAYWRIGHT_BROWSERS_PATH=.cache/ms-playwright npm run test:e2e
```

WebKit is used because Chromium's headless shell could not capture screenshots on the development machine (see `docs/testing-report.md`).

## Stack

Next.js 16.4 (App Router, static generation) · React 19.3 · TypeScript 5.9 (strict) · Tailwind CSS 4.3 · GSAP 3.15 + ScrollTrigger (lazy-loaded) · Motion 14 (gallery and booking only) · lucide-react · Vitest · Playwright + axe-core. Fonts: Manrope and Cormorant Garamond (italic), self-hosted via `next/font`.

All dependencies are pinned to exact versions.

## Project structure

```
src/
  app/                 routes (home, services, portfolio, pricing, about, journal, faq, contact, book,
                       privacy, terms, credits, 404), sitemap, robots, manifest, route template
  components/
    layout/            Header (+ mobile menu), Footer, NewsletterForm, PageHero, Logo
    ui/                Button, Img/Picture, Accordion, Eyebrow, RevealHeading, Gauge, DemoNotice, Breadcrumbs, JsonLd
    motion/            RevealObserver, Parallax (GSAP), MotionProvider
    sections/          home/, services/, portfolio/, pricing/, journal/, booking/, contact/, legal/, shared/
  data/                site config, navigation, services, pricing, portfolio, journal, faqs, testimonials,
                       process, vehicles, media manifest
  lib/                 pricing, search, portfolio and journal filters, booking (types, validation, persistence,
                       gateway), seo, url-state, format
  styles/globals.css   design tokens, typography, components, motion primitives
  types/content.ts     domain types (MediaId is derived from processed images, so typos fail type checking)
scripts/               image pipeline, asset manifest generator, responsive QA capture
tests/unit, tests/e2e
docs/                  research, plan, motion, assets, testing report, production tasks
```

## Editing content

Content is separate from presentation. Change a price, service, project or article in `src/data/*`; the UI, metadata, sitemap, structured data, filters, calculator and booking flow all update. `tests/unit/data-integrity.test.ts` catches broken relations (unknown package ids, missing images, duplicate slugs).

- **Brand and contact details:** `src/data/site.ts` (or set `NEXT_PUBLIC_SITE_URL`).
- **Prices and calculator rules:** `src/data/pricing.ts`. Base prices are for a compact vehicle in well-kept condition and must sit on the 50 PLN grid.
- **New image:** add an entry to `src/data/media-manifest.json`, run `npm run images`, then reference its id.

## Integrating a backend later

- Booking: implement `InquiryGateway` in `src/lib/booking/gateway.ts`. The payload type (`InquiryPayload`) is the CRM contract; reuse `validateDraft` server-side.
- CMS: each `src/data` module maps to a collection; keep `src/types/content.ts` as the schema.
- See `docs/production-tasks.md` for the full list.

## Documentation

- `docs/design-research.md` — references, direction, typography, colour, motion principles
- `docs/implementation-plan.md` — architecture, routes, schemas, progress checklist
- `docs/motion-system.md` — motion primitives and rules
- `docs/asset-manifest.md` — every image, its licence, photographer and usage
- `docs/testing-report.md` — what was tested and the measured results
- `docs/production-tasks.md` — what remains before launch
