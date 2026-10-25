import Link from 'next/link';
import { bookingHref, legalNav, primaryNav, secondaryNav } from '@/data/navigation';
import { services, serviceHref } from '@/data/services';
import { site } from '@/data/site';
import { NewsletterForm } from './NewsletterForm';
import { LogoMark } from './Logo';

function Column({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="t-eyebrow mb-6 text-mist">{title}</h2>
      {children}
    </div>
  );
}

const linkClass = 'inline-block py-1.5 text-[0.95rem] text-bone/85 transition-colors hover:text-champagne';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-950 pt-20 md:pt-28" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="shell">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <LogoMark className="size-10" />
            <p className="t-lead mt-8 max-w-sm text-bone/90">{site.motto}</p>
            <p className="mt-4 max-w-sm text-sm text-mist">{site.description}</p>
            <Link href={bookingHref} className="btn mt-10">
              <span>Book a consultation</span>
            </Link>
          </div>

          <Column title="Navigate" className="lg:col-span-2">
            <ul>
              {[...primaryNav, ...secondaryNav].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Services" className="lg:col-span-3">
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={serviceHref(s)} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          <div className="grid grid-cols-1 gap-14 md:col-span-2 md:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:gap-12">
            <Column title="Visit">
              <address className="space-y-1 text-[0.95rem] text-bone/85 not-italic">
                <a href={`mailto:${site.contact.email}`} className={linkClass}>
                  {site.contact.email}
                </a>
                <br />
                <a href={`tel:${site.contact.phoneHref}`} className={linkClass}>
                  {site.contact.phone}
                </a>
                {site.contact.addressLines.map((l) => (
                  <span key={l} className="block text-mist">
                    {l}
                  </span>
                ))}
              </address>
              <dl className="mt-6 space-y-1 text-sm">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-6 border-b border-line py-1.5">
                    <dt className="text-mist">{h.days}</dt>
                    <dd className="tabular">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Column>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <svg aria-hidden viewBox="0 0 1000 120" className="mt-24 block w-full select-none md:mt-32" preserveAspectRatio="xMidYMid meet">
        <text x="500" y="108" textAnchor="middle" textLength="980" lengthAdjust="spacingAndGlyphs" fill="currentColor" className="text-bone/[0.06]" style={{ fontSize: 140, fontWeight: 200, letterSpacing: '-0.06em' }}>
          {site.name}
        </text>
      </svg>

      <div className="shell">
        <div className="flex flex-col gap-6 border-t border-line py-8 text-[0.8rem] text-mist lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {site.legalName}. Demonstration website — prices, testimonials and case studies are sample content.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-bone">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/credits" className="transition-colors hover:text-bone">
                Image credits
              </Link>
            </li>
            {site.social.map((s) =>
              s.href ? (
                <li key={s.label}>
                  <a href={s.href} rel="noopener noreferrer" target="_blank" className="transition-colors hover:text-bone">
                    {s.label}
                  </a>
                </li>
              ) : (
                <li key={s.label} title="Profile not yet configured">
                  {s.label} <span className="sr-only">(not yet available)</span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
