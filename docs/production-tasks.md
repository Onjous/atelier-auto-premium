# Remaining Production Integration Tasks

The site is a complete frontend demonstration. Everything below is required, or strongly recommended, before it represents a real business.

## Business & legal (blocking)

- [ ] Final brand name, logo and domain — change `src/data/site.ts` (`name`, `url`) and set `NEXT_PUBLIC_SITE_URL`.
- [ ] Real contact details, address, opening hours and social profiles in `site.ts` (social links render as non-interactive placeholders while `href` is `null`).
- [ ] Registered business details, VAT/NIP and an address added to `/terms` and `/privacy`; both texts reviewed by a lawyer (GDPR, Polish consumer law).
- [ ] Real prices, packages and durations in `src/data/pricing.ts`; decide whether prices are shown gross (with VAT) and say so.
- [ ] Remove demonstration messaging as each area becomes real: search for `DemoNotice` and the words “demonstration”/“sample” (prices, testimonials, case studies, booking and form confirmations). Keep the non-binding-estimate disclaimer.
- [ ] Insurance, warranty and product-brand statements (only once verifiable).

## Content & media

- [ ] Replace portfolio imagery and narratives with real, documented client work (with the clients' permission), ideally with matched before/after pairs. See `docs/asset-manifest.md`.
- [ ] Replace the simulated before/after pair with a genuine one.
- [ ] Real studio and team photography; add team profiles to `/about` (the section currently lists roles only).
- [ ] Real testimonials, with written consent; remove the "sample" labels only then.
- [ ] Optional hero film (`public/videos/README.md`).
- [ ] Editorial review of journal articles by the studio's technicians; add real author names.

## Integrations

- [ ] **Booking/CRM:** implement `InquiryGateway` (`src/lib/booking/gateway.ts`) against a server action or API route that forwards to the CRM or booking system (for example HubSpot, Pipedrive or a calendar service). Add server-side validation that reuses `validateDraft`, spam protection (Turnstile or hCaptcha), rate limiting, and a confirmation email to the client.
- [ ] Contact form (`EnquiryForm`) and newsletter (`NewsletterForm`) wired to real endpoints, with double opt-in for the newsletter.
- [ ] Availability: replace the static calendar rules (`SCHEDULE_RULES`) with live availability from the booking system.
- [ ] CMS (optional): content modules in `src/data/*` map one-to-one to CMS collections (services, packages, projects, articles, FAQs, testimonials). Keep the TypeScript types as the contract and keep `data-integrity.test.ts` as a CI gate.
- [ ] Payments or deposits, if required (Stripe or Przelewy24), only after legal review.
- [ ] Analytics with a consent banner (privacy-friendly option: Plausible or Matomo) and update `/privacy`.
- [ ] Map embed on `/contact` once the address is public (consent-gated if third-party).

## Localisation

- [ ] Polish locale: introduce `src/app/[locale]/…`, move strings from `src/data/*` into per-locale modules, add `hreflang` alternates in `buildMetadata`. Prices already use `Intl` formatting.

## Quality & operations

- [ ] Deploy on a CDN-backed host; measure real-user Core Web Vitals (Vercel Speed Insights or a web-vitals RUM script) and iterate on mobile LCP (see `testing-report.md`).
- [ ] Performance follow-ups: smaller mobile hero variants (or `quality={60}` for mobile hero sources), review idle link prefetching on mobile, consider a single combined font file.
- [ ] Manual accessibility audit with VoiceOver and NVDA, and keyboard-only walkthroughs; re-run axe in CI.
- [ ] Visual QA at 320, 375, 430, 1024 and 1920 px and in landscape on real devices (iOS Safari, Android Chrome).
- [ ] CI pipeline running `npm run check` and `npm run test:e2e` on every pull request.
- [ ] Error monitoring (for example Sentry) and uptime checks.
- [ ] Content Security Policy header (currently only baseline security headers are set in `next.config.ts`).
- [ ] `git init` and first commit (the workspace was not a repository when the project was created).
