# Design Research — ATELIER AUTO

Research conducted 24 October 2026 for the ATELIER AUTO frontend demonstration.

## Method and limitations

- Browsing was available through a text-extraction fetch tool and a web search tool. **The fetch tool returns page text and markup summaries, not rendered pixels.** Observations about typography, motion and layout below are therefore drawn from page structure, copy, Awwwards metadata and published case notes — not from watching the sites run. Where a quality is inferred rather than observed, it is marked *(inferred)*.
- `aesop.com` returned HTTP 403 and could not be inspected. Rimac's homepage exposed only navigation text.
- No design was reproduced. References informed principles, not layouts.

## 1. References inspected

| # | Reference | URL | Accessed via |
|---|-----------|-----|--------------|
| 1 | Forge Automotive (Awwwards Honorable Mention, 19 Sep 2026) | https://forgeautomotive.co.uk/ · https://www.awwwards.com/sites/forge-automotive | Live page text + Awwwards entry |
| 2 | Singer Vehicle Design | https://singervehicledesign.com/ | Live page text |
| 3 | Porsche International | https://www.porsche.com/international/ | Live page text |
| 4 | ESR Bespoke (Awwwards SOTD, 23 Oct 2026) | https://www.esrbespoke.au/ | Live page text + Awwwards luxury listing |
| 5 | S-2K by zuji studio (Awwwards SOTD) | https://www.awwwards.com/sites/s-2k | Awwwards entry (scores, tags) |
| 6 | Rimac Automobili | https://www.rimac-automobili.com/ | Navigation text only |
| 7 | Luxe Auto Studio (typical detailing competitor) | https://www.luxeautostudio.com/ | Live page text |
| 8 | Awwwards — Luxury category | https://www.awwwards.com/websites/luxury/ | Listing |
| 9 | Industry roundup of detailing sites | https://mojo-agency.com/auto-detailing-website-designs/ | Search result summary |
| 10 | web.dev — Core Web Vitals | https://web.dev/articles/vitals | Article text |
| 11 | Unsplash License | https://unsplash.com/license | Licence text |

## 2. What each reference does well

**Forge Automotive.** Positions itself as a "performance atelier", not a workshop. Copy is built on a single tension ("We don't modify vehicles / We build them for you", "For Those Who Refuse Ordinary") and service descriptions are written with restraint ("Not noise for the sake of noise"). Awwwards lists GSAP, Next.js and WebGL, a scroll-scrubbed introduction, a clip-path menu transition and a near-black `#0C0C0C` palette with a deep maroon secondary. Lesson: one strong verbal idea, repeated with discipline, does more than many slogans.

**Singer Vehicle Design.** A philosophy-led site: sections are named as beliefs ("Everything is Important", "Luxury Through Choice") rather than features. Headlines are broken across lines for rhythm. Calls to action are quiet ("Inquire Now", "Connect"). Imagery is organised as full vehicle → interior → component detail. Lesson: sequence imagery from the whole to the macro detail; let section titles carry a point of view.

**Porsche.** Extremely short, period-terminated headlines ("Mission S."), single CTA per banner ("Discover more", "Explore"), consistent aspect ratios per module (9:16 hero on mobile, 5:4 cards, 16:9 tiles) and mobile-specific image variants. Lesson: rigid ratio discipline and art-directed mobile crops are what make a site feel engineered.

**ESR Bespoke.** Measured long-form body copy beneath short declarative headlines ("Exceptional is our standard"); services presented as a numbered list rather than cards. Lesson: a numbered index reads as more considered than a card grid.

**S-2K.** Two-colour palette (`#efefef` / `#0e0e0e`), "gauge cluster" loading animation and a blueprint reveal. Its Awwwards Dev scores are notably lower for accessibility (6.6) than for animation (7.6). Lesson: an automotive *instrument* metaphor is effective — and accessibility is where showcase sites typically lose points.

**Rimac.** Zero-padded numbered primary navigation ("01 Nevera & Nevera R", "02 Development"). Lesson: numbering adds a technical, catalogued tone at almost no cost.

## 3. What to avoid (observed in typical detailing sites)

From the Luxe Auto Studio page and the industry roundup:

- Repeated stock superlatives ("flawless", "showroom", "unleash brilliance") that say nothing specific.
- "$0.00 — Add to cart" service cards and vague "upfront pricing" claims with no numbers.
- The same estimate CTA after every section — reads as pushy, not premium.
- Badge walls (rating badges, dealer logos) used as a substitute for evidence.
- Contradictory operational claims (mobile vs. studio-only work).
- Template card grids repeated for every content type.

## 4. Recommended visual direction — "Instrument & Reflection"

The studio sells *measured* perfection: paint is gauged in microns before it is touched. The identity combines two ideas:

1. **Instrument** — hairline rules, tick-mark gauges, zero-padded indices (`01 — 06`), figure captions (`Fig. 04`), tabular numerals. Precision is expressed through typography and line work, not decoration.
2. **Reflection** — dark, low-key photography where light describes the bodywork; a slow specular "light sweep" used sparingly as the brand's signature motion, echoing a highlight travelling across a panel under inspection lamps.

Composition principles: asymmetric editorial grids, generous negative space, imagery sequenced from whole car → process → macro detail, a small number of bone-coloured "paper" sections to break the dark rhythm.

## 5. Typography

| Family | Assessment | Licence |
|--------|-----------|---------|
| **Manrope** | Geometric-grotesque hybrid with open apertures and excellent tabular figures; light weights hold up at very large sizes; variable (200–800) so one file covers all weights. Strong fit for "precision". | SIL Open Font License 1.1 |
| **Cormorant Garamond** | High-contrast display Garamond; the italic is expressive and editorial at large sizes, weak at small sizes. Fit for accents and pull quotes only. | SIL Open Font License 1.1 |
| Sora | Wide geometric sans with a strong tech/fintech association; competes with Manrope rather than complementing it. Rejected. | SIL Open Font License 1.1 |

**Decision:** Manrope (variable) for everything structural — display set uppercase in weight 300 with tight tracking, UI and body in 400/500. Cormorant Garamond **italic** used only as an editorial accent inside headlines and for quotations ("BEYOND THE *surface*."). Both are self-hosted at build time via `next/font` (no runtime requests to Google), subset to Latin.

## 6. Colour

Starting palette refined after contrast checks (WCAG relative luminance):

| Token | Value | Role | Contrast vs `#101113` |
|-------|-------|------|------|
| `ink-900` | `#101113` | Primary background | — |
| `ink-950` | `#0A0B0C` | Footer, deepest surfaces | — |
| `ink-800` | `#1B1D21` | Raised surfaces | — |
| `ink-700` | `#202328` | Secondary background | — |
| `bone` | `#F0EDE7` | Primary text | 16.2 : 1 |
| `mist` | `#A5A6A8` | Muted text | 7.8 : 1 |
| `champagne` | `#C5A779` | Accent (sparingly) | 8.3 : 1 |
| `paper` | `#E9E5DE` | Light editorial sections | — |
| `graphite` | `#55565A` | Muted text on paper | 5.8 : 1 on paper |

Champagne is reserved for: focus rings, the active gauge tick, one word per headline at most, and primary CTA hover states. It never fills large areas.

## 7. Motion principles

1. **Light, not movement.** The signature effect is a highlight crossing a surface; objects move little.
2. **One curve.** `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out) for entrances; `cubic-bezier(0.65, 0, 0.35, 1)` for state changes. Durations 0.6–1.2 s for reveals, 0.2–0.35 s for UI.
3. **Masks over fades.** Headlines rise from behind a line mask; images unveil with a clip-path. Opacity alone is used for secondary content.
4. **Scroll informs, never steers.** Scroll-linked effects (parallax, process progress, protection diagram) are scrubbed; no pinning that traps the user, no scroll hijacking.
5. **Content never waits.** The hero entrance is pure CSS, so text and image paint without JavaScript; reveal states only apply after a `js` class is set, so content is visible if scripts fail.
6. **Reduced motion is a first-class mode**, not a disabled one: transitions become short cross-fades.

## 8. Differentiation strategy

- **Honesty as a luxury signal.** Starting prices on the page, a transparent calculator, explicit limitations for every treatment ("What PPF will not do"). Competitors hide prices; ATELIER AUTO explains them.
- **Instrument language.** Gauges, micron annotations and figure captions make the craft legible.
- **Editorial index, not cards.** Services as a numbered index with a live image stage; portfolio as an asymmetric editorial grid; pricing as a typographic schedule.
- **Protection explained visually.** A layered paint cross-section that shows where each treatment sits, with typical (not guaranteed) thicknesses.
- **Quiet conversion.** A single persistent "Book a consultation" action in the header, contextual booking links that pre-fill the inquiry form, and one large final CTA — rather than a CTA after every section.
