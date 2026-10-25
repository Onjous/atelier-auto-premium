import { getMedia } from '@/data/media';
import type { MediaId } from '@/types/content';
import { Img } from './Img';

type PictureProps = Omit<React.ComponentProps<typeof Img>, 'asset'> & { id: MediaId };

/** Server-side convenience: resolves a media id to an optimised image. */
export function Picture({ id, ...rest }: PictureProps) {
  return <Img asset={getMedia(id)} {...rest} />;
}
