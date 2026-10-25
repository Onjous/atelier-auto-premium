import { Picture } from '@/components/ui/Picture';
import { ButtonLink } from '@/components/ui/Button';
import { primaryNav } from '@/data/navigation';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950">
      <div className="hero-image absolute inset-0 -z-10 opacity-70">
        <Picture id="taillight-dark" sizes="100vw" priority />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(10_11_12/0.95),rgb(10_11_12/0.55)_60%,rgb(10_11_12/0.3))]" />
      <div className="shell flex flex-1 flex-col justify-center py-32">
        <p className="hero-fade t-eyebrow text-champagne" style={{ '--d': 200 } as React.CSSProperties}>
          Error 404
        </p>
        <h1 className="t-display mt-8">
          <span className="hero-line block overflow-hidden pb-[0.06em]">
            <span>Wrong</span>
          </span>
          <span className="hero-line block overflow-hidden pb-[0.12em]" style={{ '--l': 1 } as React.CSSProperties}>
            <span>
              <span className="accent text-champagne-soft">turn</span>.
            </span>
          </span>
        </h1>
        <p className="hero-fade t-lead mt-8 max-w-md text-bone/85" style={{ '--d': 900 } as React.CSSProperties}>
          This road ends here. The page may have moved, or the address may be mistyped.
        </p>
        <div className="hero-fade mt-10 flex flex-col gap-3 sm:flex-row" style={{ '--d': 1100 } as React.CSSProperties}>
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/book" variant="ghost" icon={false}>
            Book a consultation
          </ButtonLink>
        </div>
        <nav aria-label="Popular pages" className="hero-fade mt-16" style={{ '--d': 1300 } as React.CSSProperties}>
          <ul className="t-meta flex flex-wrap gap-x-8 gap-y-3 text-mist">
            {primaryNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-bone">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
