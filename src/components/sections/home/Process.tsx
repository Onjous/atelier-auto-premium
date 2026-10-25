import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { studioProcess } from '@/data/process';
import { ProcessTimeline } from './ProcessTimeline';

export function Process() {
  return (
    <section aria-labelledby="process-title" className="section-y border-t border-line">
      <div className="shell">
        <ProcessTimeline steps={studioProcess}>
          <Eyebrow index="04">Craftsmanship</Eyebrow>
          <RevealHeading
            id="process-title"
            className="t-h2 mt-8"
            lines={[
              'Six stages.',
              <>
                No <span className="accent text-champagne-soft">shortcuts</span>.
              </>,
            ]}
          />
          <p className="mt-8 max-w-md text-mist" data-reveal="up">
            The same sequence for every vehicle, whether the job is a maintenance wash or full-body film. Consistency is
            what makes quality repeatable.
          </p>
        </ProcessTimeline>
      </div>
    </section>
  );
}
