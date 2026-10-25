'use client';

import { useState } from 'react';
import { stagger } from '@/components/ui/RevealHeading';
import { cn } from '@/lib/cn';

interface Layer {
  id: string;
  name: string;
  thickness: string;
  description: string;
  band: string;
}

const layers: Layer[] = [
  {
    id: 'ppf',
    name: 'Paint protection film',
    thickness: '≈ 150–200 µm',
    description:
      'A urethane layer that physically absorbs stone strikes and abrasion. Its self-healing top coat recovers from light wash marring when warmed.',
    band: 'h-16 bg-[linear-gradient(180deg,rgb(240_237_231/0.16),rgb(240_237_231/0.05))] border-t border-bone/40',
  },
  {
    id: 'coating',
    name: 'Ceramic coating',
    thickness: '≈ 1–2 µm',
    description:
      'A hard, thin chemical barrier. It resists etching and makes cleaning easier, sharpens gloss — and offers no meaningful impact protection.',
    band: 'h-[6px] bg-champagne shadow-[0_0_18px_rgb(197_167_121/0.55)]',
  },
  {
    id: 'clear',
    name: 'Clear coat',
    thickness: '≈ 30–50 µm',
    description:
      'The factory gloss and UV layer, and where swirl marks live. Correction levels it by removing a few microns — which is why we measure first.',
    band: 'h-9 bg-[linear-gradient(180deg,rgb(255_255_255/0.1),rgb(255_255_255/0.03))]',
  },
  {
    id: 'base',
    name: 'Base coat',
    thickness: '≈ 10–20 µm',
    description: 'The colour itself. Scratches that reach this layer cannot be polished out; they need paint repair.',
    band: 'h-6 bg-[linear-gradient(90deg,#3a2019,#5a3022_45%,#3a2019)]',
  },
  {
    id: 'primer',
    name: 'Primer & e-coat',
    thickness: '≈ 40–60 µm',
    description: 'Bonds the finish to the panel and provides corrosion resistance.',
    band: 'h-7 bg-[#4a4b4f]',
  },
  {
    id: 'panel',
    name: 'Panel',
    thickness: 'Steel · aluminium · composite',
    description: 'The structure everything else exists to protect.',
    band: 'h-12 bg-[repeating-linear-gradient(90deg,#6b6d72_0_2px,#5d5f64_2px_5px)]',
  },
];

export function ProtectionLayers() {
  const [selected, setSelected] = useState('ppf');
  const current = layers.find((l) => l.id === selected) ?? layers[0]!;

  return (
    <div className="border border-line bg-ink-800 p-5 sm:p-8 md:p-10">
      <div className="flex items-center justify-between">
        <p className="t-eyebrow text-mist">Fig. 07 — Cross-section</p>
        <p className="t-meta text-mist">Schematic · not to scale</p>
      </div>

      <div className="mt-8 flex flex-col gap-[3px]" aria-hidden>
        {layers.map((l, i) => (
          <div
            key={l.id}
            data-reveal="up"
            style={stagger(i)}
            className={cn('w-full transition-[opacity,outline-color] duration-500', l.band, selected === l.id ? 'opacity-100 outline outline-1 outline-offset-2 outline-champagne' : 'opacity-45')}
          />
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2" aria-label="Paint system layers">
        {layers.map((l) => (
          <li key={l.id} className="bg-ink-800">
            <button
              type="button"
              aria-pressed={selected === l.id}
              onClick={() => setSelected(l.id)}
              className={cn(
                'flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors',
                selected === l.id ? 'bg-bone text-ink-900' : 'hover:bg-ink-700',
              )}
            >
              <span className="text-[0.95rem]">{l.name}</span>
              <span className={cn('t-meta shrink-0', selected === l.id ? 'text-graphite' : 'text-mist')}>{l.thickness}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 min-h-[7rem]" aria-live="polite">
        <p className="t-h3">{current.name}</p>
        <p className="mt-3 text-mist">{current.description}</p>
      </div>
      <p className="t-meta mt-6 border-t border-line pt-5 text-mist">
        Typical ranges for illustration. Actual thicknesses vary by manufacturer and product.
      </p>
    </div>
  );
}
