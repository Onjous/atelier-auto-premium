# Hero video (optional)

No video ships with the demonstration. To enable a hero film:

1. Add `hero.mp4` (H.264, ≤ 6 MB, 1920×1080, 8–12 s seamless loop, no audio track) and optionally `hero.webm` here.
2. Set `heroVideo` in `src/data/site.ts` to `{ mp4: '/videos/hero.mp4', webm: '/videos/hero.webm' }`.

The hero only loads the video on wide screens (≥ 1024 px) when the visitor has not enabled reduced motion or data saver. The poster image is always rendered first, so LCP is unaffected.
