# Implementation Plan — ATELIER AUTO

## 1. Discovery summary

- Workspace was **empty** on inspection (no files, not a git repository) — nothing to preserve.
- Toolchain: Node 24.21, npm 11.19. No browsers installed system-wide; Playwright's Chromium is installed into the workspace (`.cache/ms-playwright`) for E2E and visual QA.
- Dependency policy: every package pinned to an exact version published **at least two weeks before** the build date (24 Oct 2026). TypeScript is held at 5.9 and ESLint at 9.x for ecosystem compatibility (TS 7's native compiler and ESLint 10 are newer than several plugins' tested ranges).

## 2. Stack

| Concern | Choice | Why |
|--------|--------|-----|
| Framework | Next.js 16.4 (App Router), React 19.3 | Static generation for every route; server components by default |
| Language | TypeScript 5.9, `strict` + `noUncheckedIndexedAccess` | Data-heavy site; typed content prevents broken relations |
| Styling | Tailwind CSS 4.3 (CSS-first `@theme` tokens) | Tokens live in CSS; no config file sprawl |
| Scroll motion | GSAP 3.15 + ScrollTrigger, **lazy-imported** | Parallax and scrubbed diagrams only; never in the critical path |
| Component motion | Motion 14 (`LazyMotion` + `m`) | Gallery layout transitions, booking step transitions |
| Simple motion | CSS + one `IntersectionObserver` | Reveals, hero entrance (zero JS), hovers, accordion |
| Icons | lucide-react (tree-shaken) | |
| Images | `next/image` (AVIF/WebP), local sources processed by `sharp` | |
| Tests | Vitest (logic + data integrity), Playwright (journeys) | |

No database, auth, CMS or backend. No component library.

## 3. Site map & routes

```
/                         Home (13 sections)
/services                 Services overview + goal matrix
/services/[slug]          6 service detail pages (SSG)
/portfolio                Filterable gallery + lightbox (URL-synced filters)
/portfolio/[slug]         16 case studies (SSG)
/pricing                  Price schedule, package comparison, estimate calculator
/about                    The studio
/journal                  Featured article, category filter, search
/journal/[slug]           6 articles (SSG, Article JSON-LD)
/faq                      Grouped FAQ (FAQPage JSON-LD)
/contact                  Contact details (configurable placeholders)
/book                     6-step booking inquiry (demo mode, prefill via query)
/privacy  /terms          Legal templates (flagged for legal review)
/_not-found               Custom 404
/sitemap.xml /robots.txt  Generated from data
```

## 4. Component architecture

```
src/
  app/                    routes, layout, metadata routes, template (route transition)
  components/
    layout/               Header (client island), MobileMenu, Footer, NewsletterForm, PageHero
    ui/                   Button/ButtonLink, Container, Eyebrow, Picture, Accordion, Chip,
                          DemoNotice, Field primitives, Gauge, SectionHeading, Breadcrumbs, JsonLd
    motion/               RevealObserver, Parallax, LightSweep (CSS), MotionProvider
    sections/home/        Hero … FinalCta (one file per section)
    sections/…            page-specific compositions (services, portfolio, pricing, journal, booking)
  data/                   typed content modules + media manifest (JSON)
  lib/                    pure logic: pricing, filtering, search, validation, seo, format
  types/                  shared domain types
```

Client components are islands: Header, RevealObserver, Parallax, ServicesIndex, BeforeAfter, ProcessTimeline, ProtectionLayers, Testimonials, Accordion, Gallery/Lightbox, PricingExplorer, BookingFlow, NewsletterForm, JournalBrowser, FaqBrowser. Everything else renders on the server.

## 5. Data schemas (summary — see `src/types/content.ts`)

- **Service** — id, slug, name, shortName, category, summary, description[], heroImage, gallery[], benefits[], limitations[], process[], duration, startingPackageId, packages (ids), faqs[], related (slugs), seo.
- **PricingPackage** — id, serviceId, name, basePrice (PLN, compact vehicle), sizeSensitive, conditionSensitive, duration, features[].
- **VehicleSize** — id, label, examples, multiplier. **AddOn** — id, name, price, sizeSensitive, appliesTo[].
- **Project** — id, slug, vehicle {brand, model, year?}, segment, services[], image, summary, brief, approach, result, specs[], duration.
- **Article** — slug, title, dek, category, publishedAt, author, heroImage, blocks[] (paragraph | heading | list | quote | callout | figure), related (computed).
- **Faq**, **Testimonial** (flagged `sample: true`), **SiteConfig** (brand name, placeholders, URL).

Relations are by stable id/slug and verified by `tests/unit/data-integrity.test.ts`.

## 6. Pricing rules (deterministic)

```
line = basePrice × (sizeSensitive ? sizeMultiplier : 1) × (conditionSensitive ? conditionFactor : 1)
addOn = price × (sizeSensitive ? sizeMultiplier : 1)
subtotal = Σ lines + Σ addOns           (each rounded to nearest 50 PLN)
range = [subtotal, roundTo50(subtotal × 1.12)]
```
Size multipliers: Compact/Coupé 1.00 · Sedan 1.15 · SUV 1.30 · Large SUV/Luxury 1.50.
Condition factors: Well kept 1.00 · Average 1.15 · Needs attention 1.35.
The upper bound represents typical variance found at inspection. All values are sample data.

## 7. Motion strategy

| Primitive | Tech | Where |
|-----------|------|-------|
| Hero entrance | CSS keyframes (no JS) | Home hero, page heroes |
| `data-reveal` (fade-up / mask / line / clip) | CSS + single IntersectionObserver | Everywhere |
| Light sweep | CSS pseudo-element | Hero, service stage, CTAs |
| Parallax | GSAP ScrollTrigger (lazy) | Editorial images |
| Scrubbed layers | GSAP ScrollTrigger (lazy) | Protection diagram |
| Active-step tracking | IntersectionObserver | Process timeline |
| Layout/presence | Motion (`LazyMotion`) | Gallery filtering, booking steps |
| Route transition | `template.tsx` CSS fade | All pages |

All primitives collapse to short cross-fades under `prefers-reduced-motion`; GSAP effects are not initialised at all. No element is driven by two systems. Details in `docs/motion-system.md`.

## 8. Asset strategy

- 60 photographs under the Unsplash License (free commercial use, no attribution required — credited anyway), selected for a consistent dark, low-key art direction.
- Pipeline: `npm run images` fetches sources into `.cache/` (gitignored), outputs optimised JPEGs to `public/images/`, records dimensions and blur placeholders in `src/data/media.generated.json`.
- The before/after pair is a **digitally simulated** "before" derived from the "after" photograph and is labelled as such.
- Portfolio imagery is stock photography; every case study is labelled as a demonstration and secondary images as "representative".
- No video is shipped; the hero supports an optional desktop-only video via config (see `public/videos/README.md`).

## 9. Progress checklist

- [x] Phase 1 — Discovery, research (`docs/design-research.md`)
- [x] Phase 2 — Architecture (this document)
- [x] Phase 3 — Design system: tokens and type in `globals.css`, Button, Eyebrow, RevealHeading, Gauge, Accordion, chips and fields, reveal / light-sweep / hero primitives
- [x] Phase 4 — Homepage: 13 sections (hero to footer)
- [x] Phase 5 — Services overview + 6 detail pages, filterable portfolio + 17 case studies, pricing with calculator, about
- [x] Phase 6 — Journal + 6 articles, FAQ, contact, 6-step booking, privacy, terms, credits, 404
- [x] Phase 7 — Filters, search, URL state, calculator, validation, persistence all driven by `src/data`
- [x] Phase 8 — Motion polish: CSS hero choreography, lazy GSAP parallax, Motion layout transitions, reduced-motion mode
- [x] Phase 9 — QA: typecheck, lint, 54 unit tests, 27 E2E journeys, axe on 14 routes × 2 viewports, Lighthouse on 13 page profiles (`docs/testing-report.md`)
- [x] Phase 10 — Final review (below)

## 10. Phase notes

**Decisions taken during build**

- Search-param state uses a `useSyncExternalStore` hook (`lib/url-state.ts`) instead of `useSearchParams`, so gallery, journal and FAQ content stays in the static HTML.
- Booking is a dedicated `/book` route (prefilled from service, pricing and package links); `/contact` holds contact details and a general enquiry form.
- Base prices sit on the 50 PLN rounding grid so "from" prices match on every surface.
- Next.js 16.4.0 → 16.4.1 for a critical security advisory (see testing report).
- Unused downloaded photographs were pruned (60 → 46 + 1 simulated).

**Final review by perspective**

- *Luxury customer:* prices and limits are stated plainly; booking is three minutes with prefill. A real studio still needs real photography of its own work. That is the single biggest lift in perceived credibility.
- *Creative director:* consistent instrument language (indices, hairlines, gauges, figure captions), a restrained champagne accent, alternating dark and paper rhythm, no repeated card grid. The weakest areas are the stock imagery mix (varied locations) and the roles-only team section.
- *Frontend engineer:* static generation everywhere, small client islands, typed content with integrity tests, lazy GSAP, no hydration warnings observed.
- *Mobile user:* stacked compositions, 44 px+ touch targets, scrollable chip rows, no horizontal overflow; simulated mobile LCP is the main open performance item.
- *Business owner:* clear CTAs on every page, contextual booking links, estimate-to-booking handoff; integration points documented in `production-tasks.md`.
