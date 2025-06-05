import ProjectTwoTop from './ProjectTwoTop.svelte';
import ProjectTwoBottom from './ProjectTwoBottom.svelte';
import type { ProjectInteractionProps } from '../../types/project';

export function getProjectTwoInteractions(): ProjectInteractionProps {
  return {
    TopInteraction: ProjectTwoTop,
    BottomInteraction: ProjectTwoBottom
  };
}
