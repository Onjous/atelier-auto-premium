import { getImageProps } from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getMedia } from '@/data/media';
import { bookingHref } from '@/data/navigation';
import { site } from '@/data/site';
import { HeroVideo } from './HeroVideo';

function ArtDirectedHero() {
  const desktop = getMedia('hero-studio');
  const mobile = getMedia('hero-portrait');
  const common = { alt: desktop.alt, sizes: '100vw', loading: 'eager' as const, fetchPriority: 'high' as const };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: desktop.src, width: desktop.width, height: desktop.height, quality: 80 });
  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({ ...common, src: mobile.src, width: mobile.width, height: mobile.height, quality: 70 });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is spread from getImageProps */}
      <img
        {...rest}
        className="absolute inset-0 size-full object-cover object-[50%_60%] md:object-[60%_55%]"
        style={{ backgroundImage: `url(${mobile.blurDataURL})`, backgroundSize: 'cover' }}
      />
    </picture>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[640px] flex-col overflow-hidden bg-ink-950 h-[100svh] max-h-[1200px]">
      <div className="hero-image absolute inset-0 -z-10">
        <ArtDirectedHero />
        {site.heroVideo && <HeroVideo sources={site.heroVideo} />}
        <div className="light-sweep absolute inset-0" data-sweep="auto" aria-hidden />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(10_11_12/0.55)_0%,rgb(10_11_12/0)_28%,rgb(10_11_12/0.15)_55%,rgb(10_11_12/0.92)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_100%,rgb(10_11_12/0.7),transparent_60%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[88%] bg-gradient-to-t from-ink-950 from-30% via-ink-950/80 to-transparent md:hidden" />
      <div aria-hidden className="hero-veil absolute inset-0 -z-10 bg-ink-950" />
      <div aria-hidden className="grain -z-10" />

      <div className="shell flex flex-1 flex-col pt-[calc(var(--header-h)+2rem)] pb-8 md:pb-10">
        <div className="hero-fade flex items-start justify-between gap-6" style={{ '--d': 1300 } as React.CSSProperties}>
          <p className="t-eyebrow max-w-[16rem] text-bone/70">Precision detailing &amp; surface protection</p>
          <p className="t-meta hidden text-right text-bone/50 md:block">
            Fig. 01
            <br />
            Light on bodywork, after dark
          </p>
        </div>

        <div className="mt-auto grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <h1 id="hero-title" className="t-display lg:col-span-8">
            <span className="hero-line block overflow-hidden pb-[0.06em]" style={{ '--l': 0 } as React.CSSProperties}>
              <span>Beyond the</span>
            </span>
            <span className="hero-line block overflow-hidden pb-[0.12em]" style={{ '--l': 1 } as React.CSSProperties}>
              <span>
                <span className="accent text-champagne-soft">surface</span>.
              </span>
            </span>
          </h1>

          <div className="lg:col-span-4 lg:pb-4">
            <p className="hero-fade t-lead max-w-md text-bone/85" style={{ '--d': 1000 } as React.CSSProperties}>
              Precision detailing and advanced protection for vehicles that deserve exceptional care.
            </p>
            <div className="hero-fade mt-8 flex flex-col gap-3 xs:flex-row" style={{ '--d': 1150 } as React.CSSProperties}>
              <Link href={bookingHref} className="btn">
                <span>Book a Consultation</span>
                <ArrowRight aria-hidden className="btn-icon size-4" strokeWidth={1.5} />
              </Link>
              <Link href="/services" className="btn btn-ghost">
                <span>Explore Our Services</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          <div aria-hidden className="hero-draw hairline" style={{ '--d': 900 } as React.CSSProperties} />
          <div className="hero-fade flex items-center justify-between gap-6 pt-5" style={{ '--d': 1500 } as React.CSSProperties}>
            <ul className="t-meta hidden gap-8 text-bone/60 md:flex">
              <li>
                <span className="text-champagne">01</span> Paint protection film
              </li>
              <li>
                <span className="text-champagne">02</span> Ceramic coating
              </li>
              <li>
                <span className="text-champagne">03</span> Paint correction
              </li>
            </ul>
            <a href="#philosophy" className="t-eyebrow group ml-auto flex items-center gap-4 text-bone/70 transition-colors hover:text-bone">
              Scroll
              <span aria-hidden className="scroll-cue relative block h-10 w-px overflow-hidden bg-bone/20" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
