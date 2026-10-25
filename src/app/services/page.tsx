import Link from 'next/link';
import { PageHero } from '@/components/layout/PageHero';
import { FinalCta } from '@/components/sections/home/FinalCta';
import { GoalMatrix } from '@/components/sections/services/GoalMatrix';
import { ButtonLink, TextLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Picture } from '@/components/ui/Picture';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { bookingHref } from '@/data/navigation';
import { startingPrice } from '@/data/pricing';
import { serviceHref, services } from '@/data/services';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/cn';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Paint protection film, ceramic coating, paint correction, exterior and interior detailing, and premium maintenance — explained honestly, with sample starting prices.',
  path: '/services',
  image: 'polish-blue',
});

const ratios = ['aspect-[4/5]', 'aspect-[5/4]', 'aspect-[1/1]', 'aspect-[4/5]', 'aspect-[5/4]', 'aspect-[1/1]'];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        variant="image"
        image="polish-blue"
        eyebrow="Services"
        trail={[{ name: 'Services', path: '/services' }]}
        title={['Crafted to protect.', 'Designed to']}
        accent="impress"
        intro="Six disciplines, one method. Every treatment begins with measurement and ends with a plan for keeping the result."
      />

      <section aria-label="All services" className="section-y">
        <div className="shell space-y-28 md:space-y-44">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={s.id} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
                <Link
                  href={serviceHref(s)}
                  tabIndex={-1}
                  aria-hidden
                  className={cn('group light-sweep relative block overflow-hidden', ratios[i], flip ? 'lg:col-span-6 lg:col-start-7 lg:row-start-1' : 'lg:col-span-7')}
                  data-reveal="clip"
                >
                  <Picture
                    id={s.heroImage}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
                  />
                </Link>
                <div className={cn(flip ? 'lg:col-span-5 lg:col-start-1 lg:row-start-1' : 'lg:col-span-4 lg:col-start-9')}>
                  <Eyebrow index={s.index}>{s.shortName}</Eyebrow>
                  <RevealHeading as="h2" className="t-h2 mt-6" lines={[s.name]} />
                  <p className="mt-6 font-serif text-2xl leading-snug text-champagne-soft italic" data-reveal="up">
                    {s.tagline}
                  </p>
                  <p className="mt-5 text-mist" data-reveal="up">
                    {s.summary}
                  </p>
                  <dl className="mt-8 grid grid-cols-2 border-t border-line pt-5" data-reveal="up">
                    <div>
                      <dt className="t-eyebrow text-mist">From</dt>
                      <dd className="mt-2 tabular">{formatPrice(startingPrice(s.id))}</dd>
                    </div>
                    <div>
                      <dt className="t-eyebrow text-mist">Typical duration</dt>
                      <dd className="mt-2">{s.duration}</dd>
                    </div>
                  </dl>
                  <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" data-reveal="up">
                    <ButtonLink href={serviceHref(s)} variant="ghost">
                      Explore {s.shortName}
                    </ButtonLink>
                    <TextLink href={`${bookingHref}?service=${s.id}`} className="text-bone">
                      Book
                    </TextLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="matrix-title" className="on-paper section-y bg-paper text-ink-900">
        <div className="shell">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <RevealHeading
              id="matrix-title"
              className="t-h2 lg:col-span-6"
              lines={[
                'Which service',
                <>
                  do I <span className="accent">need</span>?
                </>,
              ]}
            />
            <p className="text-graphite lg:col-span-4 lg:col-start-9 lg:self-end" data-reveal="up">
              Start from the outcome, not the product. Most vehicles benefit from a combination — the consultation is
              where we decide which.
            </p>
          </div>
          <GoalMatrix />
        </div>
      </section>

      <FinalCta title={['Begin with', 'a']} accent="consultation" />
    </>
  );
}
