import { BeforeAfter } from '@/components/sections/shared/BeforeAfter';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { TextLink } from '@/components/ui/Button';
import { getMedia } from '@/data/media';

export function Transformation() {
  return (
    <section aria-labelledby="transformation-title" className="section-y">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="03">Featured transformation</Eyebrow>
            <RevealHeading
              id="transformation-title"
              className="t-h2 mt-8"
              lines={[
                'Gloss,',
                <>
                  <span className="accent text-champagne-soft">recovered</span>.
                </>,
              ]}
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9" data-reveal="up">
            <p className="text-mist">
              Swirls scatter light; a levelled clear coat returns it. Drag across the panel to compare marred paint with
              a corrected finish.
            </p>
            <TextLink href="/services/paint-correction" className="mt-6 text-bone">
              How correction works
            </TextLink>
          </div>
        </div>

        <div className="mt-14 md:mt-20" data-reveal="fade">
          <BeforeAfter
            before={getMedia('paint-before-simulated')}
            after={getMedia('paint-macro-brown')}
            label="Before and after paint correction comparison"
            className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/10]"
          />
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:justify-between">
            <p className="t-meta max-w-2xl text-mist">
              <span className="text-champagne">Illustrative simulation.</span> The “before” state is generated digitally
              from the “after” photograph to show the defects correction removes. It is not a record of a client vehicle.
            </p>
            <p className="t-meta shrink-0 text-mist">Drag, swipe or use arrow keys</p>
          </div>
        </div>
      </div>
    </section>
  );
}
