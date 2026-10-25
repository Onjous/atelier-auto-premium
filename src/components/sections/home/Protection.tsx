import { Check, Minus } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealHeading, stagger } from '@/components/ui/RevealHeading';
import { TextLink } from '@/components/ui/Button';
import { ProtectionLayers } from './ProtectionLayers';

const can = [
  'Absorb stone chips on filmed panels',
  'Resist chemical etching from droppings and salt',
  'Make safe washing faster and easier',
  'Preserve original paint for the long term',
];
const cannot = [
  'Make a car scratch-proof or chip-proof',
  'Last forever without maintenance',
  'Repair damage that already exists beneath it',
  'Replace careful washing habits',
];

export function Protection() {
  return (
    <section aria-labelledby="protection-title" className="section-y border-t border-line">
      <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
        <div className="lg:col-span-5">
          <Eyebrow index="06">Protection &amp; longevity</Eyebrow>
          <RevealHeading
            id="protection-title"
            className="t-h2 mt-8"
            lines={[
              'Protection,',
              <>
                in <span className="accent text-champagne-soft">microns</span>.
              </>,
            ]}
          />
          <p className="t-lead mt-8 text-bone/85" data-reveal="up">
            The entire factory finish on a modern car is often thinner than a credit card. Protection works by adding
            layers above it — each with a specific, limited job.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div data-reveal="up">
              <h3 className="t-eyebrow text-champagne">Protection can</h3>
              <ul className="mt-5 space-y-3">
                {can.map((c) => (
                  <li key={c} className="flex gap-3 text-[0.95rem] text-bone/85">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-champagne" strokeWidth={1.5} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="up" style={stagger(1)}>
              <h3 className="t-eyebrow text-mist">Protection cannot</h3>
              <ul className="mt-5 space-y-3">
                {cannot.map((c) => (
                  <li key={c} className="flex gap-3 text-[0.95rem] text-mist">
                    <Minus aria-hidden className="mt-1 size-4 shrink-0" strokeWidth={1.5} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <TextLink href="/journal/ppf-vs-ceramic-coating" className="mt-12 text-bone">
            Read: PPF vs ceramic coating
          </TextLink>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ProtectionLayers />
        </div>
      </div>
    </section>
  );
}
