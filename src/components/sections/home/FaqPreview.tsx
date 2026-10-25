import { Accordion } from '@/components/ui/Accordion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealHeading } from '@/components/ui/RevealHeading';
import { TextLink } from '@/components/ui/Button';
import { featuredFaqs } from '@/data/faqs';

export function FaqPreview() {
  return (
    <section aria-labelledby="faq-title" className="section-y border-t border-line">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
        <div className="lg:col-span-4">
          <Eyebrow index="10">Questions</Eyebrow>
          <RevealHeading
            id="faq-title"
            className="t-h2 mt-8"
            lines={[
              'Answered',
              <>
                <span className="accent text-champagne-soft">plainly</span>.
              </>,
            ]}
          />
          <TextLink href="/faq" className="mt-10 text-bone">
            All questions
          </TextLink>
        </div>
        <div className="lg:col-span-7 lg:col-start-6" data-reveal="up">
          <Accordion items={featuredFaqs} />
        </div>
      </div>
    </section>
  );
}
