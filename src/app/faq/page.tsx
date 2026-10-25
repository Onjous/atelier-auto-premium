import { PageHero } from '@/components/layout/PageHero';
import { FinalCta } from '@/components/sections/home/FinalCta';
import { FaqBrowser } from '@/components/sections/journal/FaqBrowser';
import { JsonLd } from '@/components/ui/JsonLd';
import { faqTopics, faqs } from '@/data/faqs';
import { buildMetadata, faqJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'FAQ',
  description: 'Straight answers about booking, PPF, ceramic coatings, paint correction, aftercare and pricing.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero
        variant="type"
        eyebrow="Questions"
        trail={[{ name: 'FAQ', path: '/faq' }]}
        title={['Questions,', 'answered']}
        accent="plainly"
        intro="If something is not covered here, ask. The answer will be the same in writing as it is in conversation."
      />
      <section aria-label="Frequently asked questions" className="section-y">
        <div className="shell">
          <FaqBrowser faqs={faqs} topics={faqTopics} />
        </div>
      </section>
      <FinalCta title={['Still', 'curious?', 'Ask']} accent="us" />
    </>
  );
}
