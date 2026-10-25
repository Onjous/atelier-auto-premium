import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { PageHero } from '@/components/layout/PageHero';
import { EnquiryForm } from '@/components/sections/contact/EnquiryForm';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { bookingHref } from '@/data/navigation';
import { site } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact',
  description: `Contact ${site.shortName}: book a consultation, email or call the studio. Visits by appointment.`,
  path: '/contact',
  image: 'alley-night',
});

function StudioPlan() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Stylised location diagram — exact address shared on confirmation" className="w-full text-bone">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity="0.07" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#grid)" />
      <path d="M0 210 C120 190 180 120 400 110" stroke="currentColor" strokeOpacity="0.35" strokeWidth="10" fill="none" />
      <path d="M150 0 L170 300" stroke="currentColor" strokeOpacity="0.25" strokeWidth="6" />
      <path d="M0 70 L400 40" stroke="currentColor" strokeOpacity="0.15" strokeWidth="4" />
      <circle cx="232" cy="162" r="34" fill="var(--color-champagne)" fillOpacity="0.12" />
      <circle cx="232" cy="162" r="6" fill="var(--color-champagne)" />
      <text x="248" y="196" fill="currentColor" fillOpacity="0.7" fontSize="11" letterSpacing="2">
        STUDIO
      </text>
    </svg>
  );
}

export default function ContactPage() {
  const channels = [
    { label: 'Book a consultation', value: 'Six short steps, about three minutes', href: bookingHref, internal: true },
    { label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}`, internal: false },
    { label: 'Telephone', value: site.contact.phone, href: `tel:${site.contact.phoneHref}`, internal: false },
  ];
  return (
    <>
      <PageHero
        variant="split"
        image="alley-night"
        eyebrow="Contact"
        trail={[{ name: 'Contact', path: '/contact' }]}
        title={['Speak to', 'the']}
        accent="studio"
        intro={
          <>
            <p>Every enquiry is answered personally. For film, coatings and correction, the conversation usually ends with an invitation to bring the car in.</p>
            <DemoNotice className="mt-6">Contact details are placeholders until the studio’s real details are configured.</DemoNotice>
          </>
        }
      />

      <section aria-label="Ways to get in touch" className="section-y">
        <div className="shell">
          <ul className="border-t border-line">
            {channels.map((c, i) => {
              const inner = (
                <>
                  <span className="t-meta w-8 text-champagne">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1">
                    <span className="t-eyebrow block text-mist">{c.label}</span>
                    <span className="mt-2 block text-[clamp(1.4rem,1rem+1.8vw,2.8rem)] leading-tight font-light tracking-[-0.03em] break-all sm:break-normal">{c.value}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="size-7 shrink-0 text-mist transition-[transform,color] duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-champagne" strokeWidth={1} />
                </>
              );
              return (
                <li key={c.label} className="border-b border-line">
                  {c.internal ? (
                    <Link href={c.href} className="group flex items-center gap-6 py-8 md:py-10">
                      {inner}
                    </Link>
                  ) : (
                    <a href={c.href} className="group flex items-center gap-6 py-8 md:py-10">
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="visit-title" className="section-y border-t border-line bg-ink-850">
        <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
          <div className="lg:col-span-5">
            <Eyebrow index="02">Visit</Eyebrow>
            <h2 id="visit-title" className="t-h2 mt-8">
              By <span className="accent text-champagne-soft">appointment</span>.
            </h2>
            <address className="mt-10 space-y-1 text-lg not-italic">
              {site.contact.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="mt-4 text-mist">{site.contact.mapNote}</p>
            <dl className="mt-10 border-t border-line">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between border-b border-line py-3">
                  <dt className="text-mist">{h.days}</dt>
                  <dd className="tabular">{h.time}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-12 border border-line">
              <StudioPlan />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow index="03">Write to us</Eyebrow>
            <h2 className="t-h3 mt-8 mb-10">A general question? Start here.</h2>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
