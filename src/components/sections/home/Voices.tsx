import { DemoNotice } from '@/components/ui/DemoNotice';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import { Testimonials } from './Testimonials';

export function Voices() {
  const serviceNames = Object.fromEntries(services.map((s) => [s.id, s.name]));
  return (
    <section aria-labelledby="voices-title" className="section-y border-t border-line bg-ink-850">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
        <div className="lg:col-span-3">
          <Eyebrow index="07">Client voices</Eyebrow>
          <h2 id="voices-title" className="sr-only">
            Testimonials
          </h2>
          <DemoNotice className="mt-8 max-w-[15rem]">
            Sample testimonials. These are fictional and written for demonstration — not real customer reviews.
          </DemoNotice>
        </div>
        <div className="lg:col-span-8 lg:col-start-5" data-reveal="up">
          <Testimonials items={testimonials} serviceNames={serviceNames} />
        </div>
      </div>
    </section>
  );
}
