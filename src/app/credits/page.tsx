import { PageHero } from '@/components/layout/PageHero';
import { allMedia, mediaLicense } from '@/data/media';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Image Credits', description: 'Photography credits and licensing for this website.', path: '/credits' });

export default function CreditsPage() {
  const media = allMedia();
  const photographers = [...new Set(media.map((m) => m.photographer).filter(Boolean))].sort((a, b) => a!.localeCompare(b!));
  return (
    <>
      <PageHero variant="type" eyebrow="Credits" trail={[{ name: 'Image credits', path: '/credits' }]} title={['Image']} accent="credits" intro={`All photography is used under the ${mediaLicense}. The before/after “before” image is a digital simulation derived from one of these photographs.`} />
      <section className="section-y">
        <div className="shell">
          <h2 className="t-eyebrow text-mist">Photographers on Unsplash</h2>
          <ul className="mt-8 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {photographers.map((p) => (
              <li key={p} className="border-b border-line py-4 pr-4">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
