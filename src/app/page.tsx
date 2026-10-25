import type { Metadata } from 'next';
import { FaqPreview } from '@/components/sections/home/FaqPreview';
import { FinalCta } from '@/components/sections/home/FinalCta';
import { Hero } from '@/components/sections/home/Hero';
import { JournalPreview } from '@/components/sections/home/JournalPreview';
import { Philosophy } from '@/components/sections/home/Philosophy';
import { PricingPreview } from '@/components/sections/home/PricingPreview';
import { Process } from '@/components/sections/home/Process';
import { Protection } from '@/components/sections/home/Protection';
import { SelectedWork } from '@/components/sections/home/SelectedWork';
import { SignatureServices } from '@/components/sections/home/SignatureServices';
import { Transformation } from '@/components/sections/home/Transformation';
import { Voices } from '@/components/sections/home/Voices';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: { absolute: `${site.name} — Precision Detailing & Paint Protection` },
  description: site.description,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <SignatureServices />
      <Transformation />
      <Process />
      <SelectedWork />
      <Protection />
      <Voices />
      <PricingPreview />
      <JournalPreview />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
