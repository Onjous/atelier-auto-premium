import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { TextLink } from '@/components/ui/Button';
import { getMedia } from '@/data/media';
import { startingPrice } from '@/data/pricing';
import { serviceHref, services } from '@/data/services';
import { formatPrice } from '@/lib/format';
import { ServicesIndex, type ServiceIndexItem } from './ServicesIndex';

export function SignatureServices() {
  const items: ServiceIndexItem[] = services.map((s) => ({
    id: s.id,
    index: s.index,
    name: s.name,
    tagline: s.tagline,
    summary: s.summary,
    href: serviceHref(s),
    fromPrice: formatPrice(startingPrice(s.id)),
    duration: s.duration,
    image: getMedia(s.previewImage),
  }));

  return (
    <section aria-labelledby="services-title" className="section-y border-t border-line bg-ink-850">
      <div className="shell">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index="02">Signature services</Eyebrow>
            <RevealHeading
              id="services-title"
              className="t-h2 mt-8"
              lines={[
                'Six disciplines.',
                <>
                  One <span className="accent text-champagne-soft">standard</span>.
                </>,
              ]}
            />
          </div>
          <TextLink href="/services" className="shrink-0 text-bone">
            All services
          </TextLink>
        </div>
        <ServicesIndex items={items} />
      </div>
    </section>
  );
}
