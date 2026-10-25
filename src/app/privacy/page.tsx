import { LegalPage } from '@/components/sections/legal/LegalPage';
import { site } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Privacy Policy', description: `How ${site.shortName} handles personal data (demonstration template).`, path: '/privacy' });

export default function PrivacyPage() {
  return (
    <LegalPage
      title={['Privacy']}
      accent="policy"
      path="/privacy"
      updated="24 October 2026"
      intro="What this website collects, why, and the choices you have."
      sections={[
        {
          id: 'controller',
          title: 'Who is responsible',
          paragraphs: [
            `${site.legalName} would act as data controller. Registered company details, address and a contact point for data-protection requests will be added here before launch. Until then, questions can be addressed to ${site.contact.email} (placeholder).`,
          ],
        },
        {
          id: 'demo',
          title: 'This demonstration',
          paragraphs: [
            'In its current form this website does not transmit any form data to a server. The booking, enquiry and newsletter forms validate input in your browser only; nothing you type is sent, emailed or stored on a server.',
            'The booking form keeps your service, vehicle and date choices in your browser’s session storage so they survive going back or refreshing. Contact details are never written to storage. Closing the tab clears session storage.',
          ],
        },
        {
          id: 'data',
          title: 'Data a live site would collect',
          paragraphs: [
            'When connected to a booking system, the site would process the details you submit — name, email, optional phone number, vehicle information, preferred dates and notes — to respond to your enquiry and arrange a consultation.',
            'The legal basis would be steps taken at your request before entering into a contract (GDPR Art. 6(1)(b)) and, for newsletters, your consent (Art. 6(1)(a)), which you may withdraw at any time.',
          ],
        },
        {
          id: 'cookies',
          title: 'Cookies and analytics',
          paragraphs: [
            'The demonstration sets no tracking or advertising cookies and loads no third-party analytics. Fonts and images are served from this website’s own domain. If analytics are added later, this section and any consent mechanism will be updated first.',
          ],
        },
        {
          id: 'retention',
          title: 'Retention and your rights',
          paragraphs: [
            'Enquiry data would be retained only as long as needed to handle the enquiry and any resulting work, and as required by accounting law.',
            'You would have the right to access, rectify, erase or restrict processing of your data, to object, to data portability, and to lodge a complaint with the supervisory authority (in Poland, the President of the Personal Data Protection Office — UODO).',
          ],
        },
      ]}
    />
  );
}
