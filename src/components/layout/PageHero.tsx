import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Gauge } from '@/components/ui/Gauge';
import { Picture } from '@/components/ui/Picture';
import { cn } from '@/lib/cn';
import type { MediaId } from '@/types/content';

interface PageHeroProps {
  eyebrow: string;
  /** Heading lines; the last line is followed by the italic accent word, if given. */
  title: string[];
  accent?: string;
  intro?: React.ReactNode;
  image?: MediaId;
  variant?: 'image' | 'split' | 'type';
  trail?: { name: string; path: string }[];
  children?: React.ReactNode;
}

function Title({ title, accent, className }: { title: string[]; accent?: string; className?: string }) {
  return (
    <h1 className={cn('t-h1', className)}>
      {title.map((line, i) => (
        <span key={i} className="hero-line block overflow-hidden pb-[0.08em]" style={{ '--l': i } as React.CSSProperties}>
          <span>
            {line}
            {i === title.length - 1 && accent && (
              <>
                {' '}
                <span className="accent text-champagne-soft">{accent}</span>.
              </>
            )}
          </span>
        </span>
      ))}
    </h1>
  );
}

/** Interior page openers. Entrance choreography is CSS-only, like the home hero. */
export function PageHero({ eyebrow, title, accent, intro, image, variant = 'type', trail, children }: PageHeroProps) {
  const meta = (
    <div className="hero-fade flex flex-wrap items-center justify-between gap-4" style={{ '--d': 300 } as React.CSSProperties}>
      {trail ? <Breadcrumbs trail={trail} /> : <span />}
      <p className="t-eyebrow text-mist">{eyebrow}</p>
    </div>
  );

  if (variant === 'image' && image) {
    return (
      <section className="relative isolate flex min-h-[78svh] flex-col overflow-hidden bg-ink-950">
        <div className="hero-image absolute inset-0 -z-10">
          <Picture id={image} sizes="100vw" priority quality={80} />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(10_11_12/0.7),rgb(10_11_12/0.1)_35%,rgb(10_11_12/0.92))]" />
        <div aria-hidden className="hero-veil absolute inset-0 -z-10 bg-ink-950" />
        <div className="shell flex flex-1 flex-col pt-[calc(var(--header-h)+1.5rem)] pb-12 md:pb-16">
          {meta}
          <div className="mt-auto grid grid-cols-1 gap-8 pt-24 lg:grid-cols-12 lg:items-end">
            <Title title={title} accent={accent} className="lg:col-span-8" />
            {intro && (
              <div className="hero-fade t-lead text-bone/85 lg:col-span-4" style={{ '--d': 900 } as React.CSSProperties}>
                {intro}
              </div>
            )}
          </div>
          {children}
        </div>
      </section>
    );
  }

  if (variant === 'split' && image) {
    return (
      <section className="relative pt-[calc(var(--header-h)+1.5rem)]">
        <div className="shell">
          {meta}
          <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 lg:grid-cols-12 lg:items-end lg:gap-x-[var(--col-gap)]">
            <div className="lg:col-span-7">
              <Title title={title} accent={accent} />
              {intro && (
                <div className="hero-fade t-lead mt-10 max-w-xl text-bone/85" style={{ '--d': 900 } as React.CSSProperties}>
                  {intro}
                </div>
              )}
              {children}
            </div>
            <div className="hero-fade relative aspect-[4/5] overflow-hidden lg:col-span-4 lg:col-start-9" style={{ '--d': 500 } as React.CSSProperties}>
              <div className="hero-image absolute inset-0">
                <Picture id={image} sizes="(min-width: 1024px) 32vw, 100vw" priority />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-[calc(var(--header-h)+1.5rem)]">
      <div className="shell">
        {meta}
        <div className="mt-16 md:mt-28">
          <Title title={title} accent={accent} />
          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-8 md:grid-cols-12">
            <Gauge className="hero-fade text-bone md:col-span-5" marker={0.62} label="µm" />
            {intro && (
              <div className="hero-fade t-lead text-bone/85 md:col-span-6 md:col-start-7" style={{ '--d': 900 } as React.CSSProperties}>
                {intro}
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
