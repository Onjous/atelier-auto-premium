import { getMedia } from '@/data/media';
import { projectHref, projectName, workTypeLabel } from '@/data/portfolio';
import type { Project } from '@/types/content';
import type { ProjectCardData } from './ProjectCard';

export const toCardData = (p: Project): ProjectCardData => ({
  id: p.id,
  href: projectHref(p),
  name: projectName(p),
  title: p.title,
  services: p.workTypes.map(workTypeLabel).join(' + '),
  image: getMedia(p.image),
});
