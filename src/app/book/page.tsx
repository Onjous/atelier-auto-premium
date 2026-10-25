import { BookingFlow, type BookingServiceOption } from '@/components/sections/booking/BookingFlow';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { getMedia } from '@/data/media';
import { packagesForService, startingPrice } from '@/data/pricing';
import { services } from '@/data/services';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Book a Consultation',
  description: 'Request a consultation in six short steps: service, vehicle, preferred date, contact details and review. Demonstration — no booking is created.',
  path: '/book',
});

export default function BookPage() {
  const options: BookingServiceOption[] = services.map((s) => ({
    id: s.id,
    index: s.index,
    name: s.name,
    tagline: s.tagline,
    fromPrice: startingPrice(s.id),
    image: getMedia(s.previewImage),
    packages: packagesForService(s.id).map((p) => ({ id: p.id, name: p.name })),
  }));

  return (
    <div className="pt-[calc(var(--header-h)+1.5rem)] pb-[var(--section-y)]">
      <div className="shell">
        <div className="hero-fade flex flex-wrap items-center justify-between gap-4" style={{ '--d': 200 } as React.CSSProperties}>
          <Breadcrumbs trail={[{ name: 'Book a consultation', path: '/book' }]} />
          <p className="t-eyebrow text-mist">Consultation request</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 lg:grid-cols-12 lg:items-end">
          <h1 className="t-h1 lg:col-span-8">
            <span className="hero-line block overflow-hidden pb-[0.08em]">
              <span>Book a</span>
            </span>
            <span className="hero-line block overflow-hidden pb-[0.08em]" style={{ '--l': 1 } as React.CSSProperties}>
              <span>
                <span className="accent text-champagne-soft">consultation</span>.
              </span>
            </span>
          </h1>
          <div className="hero-fade lg:col-span-4" style={{ '--d': 800 } as React.CSSProperties}>
            <p className="text-mist">About three minutes. Your choices are kept if you go back or refresh; your contact details are never stored.</p>
            <DemoNotice className="mt-5">Demonstration mode — no reservation is created and nothing is sent to the studio.</DemoNotice>
          </div>
        </div>
        <div className="mt-16 md:mt-24">
          <BookingFlow services={options} />
        </div>
      </div>
    </div>
  );
}
