import { LegalPage } from '@/components/sections/legal/LegalPage';
import { site } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Terms', description: `Terms of use and legal information for the ${site.shortName} website (demonstration template).`, path: '/terms' });

export default function TermsPage() {
  return (
    <LegalPage
      title={['Terms &']}
      accent="legal"
      path="/terms"
      updated="24 October 2026"
      intro="The terms that govern use of this website and how information on it should be read."
      sections={[
        {
          id: 'operator',
          title: 'Website operator',
          paragraphs: [`This website is operated as a demonstration for ${site.legalName}. Registered business name, address, registration and tax identifiers will be published here before launch.`],
        },
        {
          id: 'content',
          title: 'Demonstration content',
          paragraphs: [
            'Prices, packages, durations, testimonials and portfolio case studies on this website are sample content created to demonstrate the design. They do not describe real customers, real vehicles or a real price list.',
            'Photography is licensed stock imagery used under the Unsplash License. Where imagery appears in a case study it illustrates the type of work described; it is not documentation of that work.',
          ],
        },
        {
          id: 'estimates',
          title: 'Estimates are not quotations',
          paragraphs: [
            'Estimates produced by the pricing calculator are indicative and non-binding. Final pricing depends on the vehicle’s condition, dimensions and the services agreed after inspection, and would be confirmed in writing before any work begins.',
          ],
        },
        {
          id: 'bookings',
          title: 'Booking requests',
          paragraphs: [
            'Submitting the booking form in this demonstration does not create a reservation or contract. In a live version, a booking would only be confirmed once the studio replies in writing with an agreed scope, schedule and price.',
          ],
        },
        {
          id: 'liability',
          title: 'Information and liability',
          paragraphs: [
            'Journal articles and service descriptions are general information about vehicle care. Results of any treatment depend on the vehicle and its use; nothing on this website is a guarantee of a particular outcome or lifespan.',
          ],
        },
      ]}
    />
  );
}
