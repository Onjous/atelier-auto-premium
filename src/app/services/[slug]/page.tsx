import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Minus } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { FinalCta } from '@/components/sections/home/FinalCta';
import { PackageCards } from '@/components/sections/services/PackageCards';
import { Accordion } from '@/components/ui/Accordion';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { JsonLd } from '@/components/ui/JsonLd';
import { Picture } from '@/components/ui/Picture';
import { RevealHeading, stagger } from '@/components/ui/RevealHeading';
import { packageById, startingPrice } from '@/data/pricing';
import { getServiceBySlug, serviceById, serviceHref, services } from '@/data/services';
import { formatPrice } from '@/lib/format';
import { buildMetadata, faqJsonLd, serviceJsonLd } from '@/lib/seo';
import type { PricingPackage } from '@/types/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  if (!service) return {};
  return buildMetadata({ ...service.seo, path: serviceHref(service), image: service.heroImage });
}

export default async function ServicePage({ params }: Props) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();

  const packages = service.packageIds.map(packageById).filter((p): p is PricingPackage => Boolean(p));
  const from = startingPrice(service.id);
  const related = service.related.map(serviceById);

  return (
    <>
      <JsonLd data={[serviceJsonLd(service, from), faqJsonLd(service.faqs)]} />
      <PageHero
        variant="image"
        image={service.heroImage}
        eyebrow={`Service ${service.index} / 06`}
        trail={[
          { name: 'Services', path: '/services' },
          { name: service.name, path: serviceHref(service) },
        ]}
        title={[service.name]}
        intro={<p className="font-serif text-[1.6em] leading-tight italic">{service.tagline}</p>}
      >
        <dl className="hero-fade mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4" style={{ '--d': 1100 } as React.CSSProperties}>
          {[
            ['From', formatPrice(from)],
            ['Duration', service.duration],
            ['Packages', String(packages.length)],
            ['Category', service.category[0]!.toUpperCase() + service.category.slice(1)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="t-eyebrow text-mist">{k}</dt>
              <dd className="mt-2 text-lg tabular">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section aria-labelledby="overview-title" className="section-y">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <div className="lg:col-span-7">
            <Eyebrow index="01">Overview</Eyebrow>
            <h2 id="overview-title" className="t-h3 mt-8 max-w-2xl text-[clamp(1.6rem,1.2rem+1.4vw,2.6rem)] leading-[1.15] font-light">
              {service.summary}
            </h2>
            <div className="prose-atelier mt-10 max-w-[64ch]">
              {service.description.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <div className="relative aspect-[4/5] overflow-hidden" data-reveal="clip">
                <Picture id={service.previewImage} sizes="(min-width: 1024px) 30vw, 100vw" />
              </div>
              <h3 className="t-eyebrow mt-8 text-mist">Ideal for</h3>
              <ul className="mt-4 border-t border-line">
                {service.idealFor.map((x) => (
                  <li key={x} className="border-b border-line py-3">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="benefits-title" className="section-y border-t border-line bg-ink-850">
        <div className="shell">
          <Eyebrow index="02">Benefits</Eyebrow>
          <RevealHeading id="benefits-title" className="t-h2 mt-8" lines={['What it', <>does <span className="accent text-champagne-soft">well</span>.</>]} />
          <ol className="mt-16 grid grid-cols-1 gap-px border-y border-line bg-line md:grid-cols-2">
            {service.benefits.map((b, i) => (
              <li key={b.title} className="bg-ink-850 py-10 md:p-10" data-reveal="up" style={stagger(i % 2)}>
                <span className="t-meta text-champagne">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="t-h3 mt-5">{b.title}</h3>
                <p className="mt-3 max-w-md text-mist">{b.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="limits-title" className="on-paper section-y bg-paper text-ink-900">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <div className="lg:col-span-5">
            <p className="t-eyebrow flex items-center gap-4 text-graphite" data-reveal="fade">
              <span>03</span>
              <span aria-hidden className="h-px w-10 bg-current opacity-40" />
              Limitations
            </p>
            <RevealHeading id="limits-title" className="t-h2 mt-8" lines={['What it will', <>not <span className="accent">do</span>.</>]} />
            <p className="mt-8 max-w-sm text-graphite" data-reveal="up">
              Knowing the limits of a treatment is as important as knowing its benefits. We explain them before you
              commit, not after.
            </p>
          </div>
          <ul className="border-t border-line-ink lg:col-span-6 lg:col-start-7">
            {service.limitations.map((l, i) => (
              <li key={l} className="flex gap-5 border-b border-line-ink py-6 text-[1.05rem]" data-reveal="up" style={stagger(i)}>
                <Minus aria-hidden className="mt-1.5 size-4 shrink-0 text-graphite" strokeWidth={1.5} />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="process-title" className="section-y">
        <div className="shell">
          <Eyebrow index="04">Process</Eyebrow>
          <RevealHeading id="process-title" className="t-h2 mt-8" lines={['How the', <>work is <span className="accent text-champagne-soft">done</span>.</>]} />
          <ol className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-[var(--col-gap)]">
            {service.process.map((step, i) => (
              <li key={step.title} data-reveal="up" style={stagger(i)}>
                <div className="flex items-center gap-3">
                  <span className="t-meta text-champagne">{String(i + 1).padStart(2, '0')}</span>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mt-6 text-xl font-normal tracking-[-0.01em]">{step.title}</h3>
                <p className="mt-3 text-mist">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="packages-title" className="section-y border-t border-line">
        <div className="shell">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow index="05">Packages</Eyebrow>
              <RevealHeading id="packages-title" className="t-h2 mt-8" lines={['Choose a', <><span className="accent text-champagne-soft">starting point</span>.</>]} />
            </div>
            <DemoNotice className="max-w-sm">
              Sample prices in PLN for a compact vehicle. Size and condition adjust the estimate; the inspection
              confirms the final price.
            </DemoNotice>
          </div>
          <PackageCards packages={packages} />
        </div>
      </section>

      <section aria-labelledby="gallery-title" className="section-y border-t border-line bg-ink-850">
        <div className="shell">
          <Eyebrow index="06">In the studio</Eyebrow>
          <h2 id="gallery-title" className="sr-only">
            Representative imagery
          </h2>
          <div className="mt-12 grid grid-cols-12 gap-x-[var(--col-gap)] gap-y-12">
            {service.gallery.map((g, i) => (
              <figure
                key={g.image}
                className={['col-span-12 md:col-span-7', 'col-span-10 col-start-3 md:col-span-4 md:col-start-9 md:mt-32', 'col-span-12 md:col-span-6 md:col-start-3'][i] ?? 'col-span-12'}
              >
                <div className={`relative overflow-hidden ${['aspect-[4/3]', 'aspect-[4/5]', 'aspect-[16/9]'][i] ?? 'aspect-[4/3]'}`} data-reveal="clip">
                  <Picture id={g.image} sizes="(min-width: 768px) 55vw, 100vw" />
                </div>
                <figcaption className="t-meta mt-4 flex gap-3 text-mist">
                  <span className="shrink-0 text-champagne">Fig. {String(i + 1).padStart(2, '0')}</span>
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <DemoNotice className="mt-12">Representative imagery (licensed stock photography), not documentation of client work.</DemoNotice>
        </div>
      </section>

      <section aria-labelledby="service-faq-title" className="section-y">
        <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <div className="lg:col-span-4">
            <Eyebrow index="07">Questions</Eyebrow>
            <h2 id="service-faq-title" className="t-h2 mt-8">
              {service.shortName}, <span className="accent text-champagne-soft">explained</span>.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={service.faqs} />
          </div>
        </div>
      </section>

      <section aria-labelledby="related-title" className="section-y border-t border-line">
        <div className="shell">
          <h2 id="related-title" className="t-eyebrow text-mist">
            Often combined with
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-[var(--col-gap)]">
            {related.map((r, i) => (
              <li key={r.id} data-reveal="up" style={stagger(i)}>
                <Link href={serviceHref(r)} className="group block">
                  <div className="light-sweep relative aspect-[16/10] overflow-hidden">
                    <Picture id={r.previewImage} sizes="(min-width: 768px) 30vw, 100vw" className="transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]" />
                  </div>
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
                    <span>
                      <span className="t-meta mr-3 text-champagne">{r.index}</span>
                      <span className="text-lg">{r.name}</span>
                    </span>
                    <ArrowUpRight aria-hidden className="size-5 text-mist transition-colors group-hover:text-champagne" strokeWidth={1.25} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta title={[`Discuss ${service.shortName}`, 'in']} accent="person" />
    </>
  );
}
