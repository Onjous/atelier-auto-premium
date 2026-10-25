import { Parallax } from '@/components/motion/Parallax';
import { ButtonLink } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { bookingHref } from '@/data/navigation';

export function FinalCta({ title = ['Your vehicle', 'deserves'], accent = 'more' }: { title?: string[]; accent?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-ink-950">
      <Parallax fill className="-z-10" amount={0.1}>
        <Picture id="light-tunnel" sizes="100vw" className="opacity-80" />
      </Parallax>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(10_11_12/0.75),rgb(10_11_12/0.35)_45%,rgb(10_11_12/0.85))]" />
      <div className="shell flex min-h-[85svh] flex-col justify-center py-32 text-center">
        <RevealHeading
          id="cta-title"
          className="t-display mx-auto"
          lines={[
            ...title.slice(0, -1),
            <>
              {title[title.length - 1]} <span className="accent text-champagne-soft">{accent}</span>.
            </>,
          ]}
        />
        <p className="t-lead mx-auto mt-10 max-w-xl text-bone/85" data-reveal="up">
          Experience automotive care without compromise. Begin with a consultation — in person, under the lights, with
          the paint gauge in hand.
        </p>
        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row" data-reveal="up">
          <ButtonLink href={bookingHref}>Book a consultation</ButtonLink>
          <ButtonLink href="/pricing" variant="ghost" icon={false}>
            Estimate your price
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
