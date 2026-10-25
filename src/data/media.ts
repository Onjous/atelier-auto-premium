import manifest from './media-manifest.json';
import generated from './media.generated.json';
import type { MediaId } from '@/types/content';

export interface MediaAsset {
  id: MediaId;
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
  position: string;
  photographer: string | null;
  simulated: boolean;
}

type ManifestEntry = { id: string; alt: string; photographer?: string; position?: string };

const entries = new Map<string, ManifestEntry & { simulated: boolean }>([
  ...manifest.images.map((e) => [e.id, { ...e, simulated: false }] as const),
  ...manifest.derived.map((e) => [e.id, { ...e, simulated: true }] as const),
]);

export function getMedia(id: MediaId): MediaAsset {
  const entry = entries.get(id);
  const dims = generated[id];
  if (!entry) throw new Error(`Image "${id}" is missing from media-manifest.json`);
  return {
    id,
    src: `/images/${id}.jpg`,
    width: dims.width,
    height: dims.height,
    alt: entry.alt,
    blurDataURL: dims.blurDataURL,
    position: entry.position ?? '50% 50%',
    photographer: entry.photographer ?? null,
    simulated: entry.simulated,
  };
}

export const mediaLicense = manifest.license;

export function allMedia(): MediaAsset[] {
  return (Object.keys(generated) as MediaId[]).map(getMedia);
}
