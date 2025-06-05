import ProjectOneTop from './ProjectOneTop.svelte';
import ProjectOneBottom from './ProjectOneBottom.svelte';
import type { ProjectInteractionProps } from '../../types/project';

// Export the interaction components as a default function
export function getProjectOneInteractions(): ProjectInteractionProps {
  return {
    TopInteraction: ProjectOneTop,
    BottomInteraction: ProjectOneBottom
  };
}
