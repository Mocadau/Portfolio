import type { ComponentType } from 'svelte';

export interface ProjectData {
  title: string;
  description: string;
  field: string;
  category: string;
}

export interface PortfolioViewportProps {
  projects: ProjectData[];
  onSectionChange: (section: string) => void;
  onRestart: () => void;
}
