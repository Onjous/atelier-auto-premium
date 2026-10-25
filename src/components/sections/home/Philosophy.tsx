import { Parallax } from '@/components/motion/Parallax';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Picture } from '@/components/ui/Picture';
import { RevealHeading, stagger } from '@/components/ui/RevealHeading';

const principles = [
  {
    title: 'Measure before touching',
    text: 'Every panel is gauged and photographed before work begins. Decisions come from readings, not habit.',
  },
  {
    title: 'Remove only what is necessary',
    text: 'Clear coat is finite. We choose the least aggressive method that achieves the result — and stop there.',
  },
  {
    title: 'Protect what remains',
    text: 'Correction without protection is temporary. Every treatment ends with a plan for keeping it.',
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="section-y relative">
      <div className="shell">
        <Eyebrow index="01">Philosophy</Eyebrow>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <RevealHeading
            id="philosophy-title"
            className="t-h1 lg:col-span-9"
            lines={[
              'Perfection',
              'is never',
              <>
                <span className="accent text-champagne-soft">accidental</span>.
              </>,
            ]}
          />
          <div className="lg:col-span-4 lg:col-start-9 lg:-mt-24">
            <p className="t-lead text-bone/90" data-reveal="up">
              A finish that stops people in a car park is the sum of hundreds of small, deliberate decisions — most of
              them invisible.
            </p>
            <p className="mt-6 text-mist" data-reveal="up" style={stagger(1)}>
              We work on one vehicle per specialist, in a controlled studio, at the pace the paint requires. Not the pace
              a schedule demands.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-x-[var(--col-gap)] md:mt-32">
          <figure className="col-span-10 md:col-span-5" data-reveal="clip">
            <Parallax className="aspect-[4/5]" amount={0.1}>
              <Picture id="detailer-wax" sizes="(min-width: 768px) 40vw, 85vw" />
            </Parallax>
            <figcaption className="t-meta mt-4 flex gap-3 text-mist">
              <span className="shrink-0 text-champagne">Fig. 02</span> Final levelling by hand, under raking light
            </figcaption>
          </figure>
          <figure className="col-span-8 col-start-5 mt-16 md:col-span-6 md:col-start-7 md:mt-48" data-reveal="clip">
            <Parallax className="aspect-[4/3]" amount={0.14}>
              <Picture id="paint-macro-blue" sizes="(min-width: 768px) 48vw, 70vw" />
            </Parallax>
            <figcaption className="t-meta mt-4 flex gap-3 text-mist">
              <span className="shrink-0 text-champagne">Fig. 03</span> A reflection is the most honest measurement
            </figcaption>
          </figure>
        </div>

        <ol className="mt-24 grid grid-cols-1 gap-12 md:mt-36 md:grid-cols-3 md:gap-[var(--col-gap)]">
          {principles.map((p, i) => (
            <li key={p.title} className="border-t border-line pt-6" data-reveal="up" style={stagger(i)}>
              <span className="t-meta text-champagne">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-h3 mt-6">{p.title}</h3>
              <p className="mt-4 max-w-sm text-mist">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
