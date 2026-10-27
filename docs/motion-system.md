# Motion System

One language, a few primitives. Motion should feel like light moving across a panel: precise, unhurried, never decorative for its own sake.

## Curves and timing

| Token | Value | Use |
|---|---|---|
| `--ease-expo` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances, reveals, hovers |
| `--ease-quint` | `cubic-bezier(0.65, 0, 0.35, 1)` | State changes, light sweep, route fade |
| Reveal | 1.0–1.4 s | Content entering the viewport |
| UI | 0.2–0.6 s | Buttons, chips, accordions, menus |
| Stagger | 90 ms per item (`--i`), 110 ms per line (`--l`) | Lists and headlines |

## Primitives

### 1. Hero choreography — CSS only
Classes in `globals.css`: `hero-image` (slow scale-in), `hero-veil` (black veil lifts), `hero-line` (headline lines rise from a mask), `hero-fade` (secondary content, delay via `--d` in ms), `hero-draw` (hairline draws). No JavaScript, so it runs before hydration and never blocks content. Used by the home hero, `PageHero`, article headers, the booking header and the 404.

```tsx
<h1><span className="hero-line block overflow-hidden" style={{ '--l': 0 }}><span>Beyond the</span></span></h1>
<p className="hero-fade" style={{ '--d': 1000 }}>…</p>
```

### 2. Scroll reveals — `data-reveal` + one observer
`RevealObserver` (mounted once in the root layout) sets a `data-revealed` attribute on any `[data-reveal]` element entering the viewport, and re-scans on navigation and DOM changes. It is an attribute, not a class, because React rewrites `className` on re-render and would erase an imperatively added class (which once left the protection diagram blank).

| Value | Effect |
|---|---|
| `up` | Fade + 2 rem rise |
| `fade` | Opacity only |
| `clip` | Image unveils from an inset clip-path while the image settles from 1.14× scale |
| `rule` | Hairline draws from the left |
| `lines` | Used by `RevealHeading`: each line rises from behind a mask |

Stagger with the `stagger(i, delay)` helper from `RevealHeading.tsx`.

**Safety:** hidden states only apply under `html.js`, which an inline head script sets before paint. If the app has not hydrated within 3.5 s the class is removed and everything is shown. Without JavaScript, all content is visible.

### 3. Light sweep — the signature
`.light-sweep` adds a soft diagonal highlight that crosses an image on hover (fine pointers only), once on reveal, or automatically with `data-sweep="auto"` (hero). Pure CSS pseudo-element.

### 4. Parallax — GSAP ScrollTrigger, lazy
`<Parallax amount={0.12} fill?>` drifts an oversized child against scroll, scrubbed. GSAP and ScrollTrigger are **dynamically imported** inside the effect, so they never enter the initial bundle, and they are not loaded at all under reduced motion, on small touch screens or on devices with ≤ 2 logical cores. The GSAP context is reverted on unmount.

### 5. Scroll-linked storytelling — no pinning
`ProcessTimeline` marks the step nearest the viewport centre as active (IntersectionObserver) and fills a hairline with scroll progress (one rAF-throttled listener). Nothing is pinned and scrolling is never intercepted.

### 6. Layout and presence — Motion (`motion/react`)
Used only where layout animation earns its keep: portfolio filtering (`layout` + `AnimatePresence mode="popLayout"`) and booking step transitions (direction-aware slide). Wrapped in `MotionProvider` (`LazyMotion` + `MotionConfig reducedMotion="user"`), and only loaded on `/portfolio` and `/book`.

### 7. Component motion — CSS
Buttons (fill rises from below, arrow nudges), link underlines (retract and redraw), accordion (`grid-template-rows` 0fr → 1fr), header (hides on scroll down, returns on scroll up), mobile menu (clip-path curtain with staggered links), route cross-fade (`template.tsx`, skipped on first load to protect LCP).

### 8. Before/after comparison
Pointer, touch and keyboard driven; a one-time "breathing" hint the first time it is seen (skipped under reduced motion).

## Rules

- One system per element: no element is animated by both GSAP and Motion or CSS. In client components, put `data-reveal` on a wrapper and state-driven classes on an inner element.
- Animate `transform`, `opacity` and `clip-path` only; no animated blur or large filtered surfaces.
- No scroll hijacking, no smooth-scroll library, no autoplaying carousels.
- Hover effects are progressive; everything works without hover on touch devices.
- `prefers-reduced-motion: reduce` collapses all animations to instant or short opacity fades, disables parallax and GSAP, removes the light sweep and the slider hint, and disables smooth anchor scrolling.

## Deliberately omitted

- **Custom cursor**: optional in the brief. Considered and omitted — it adds JavaScript to every page and rarely improves usability.
- **WebGL**: the photography carries the visual weight; WebGL would cost performance for little gain.
