import { writable } from 'svelte/store';

export interface SelectedPolaroid {
  src: string;
  alt: string;
  caption: string;
}

export const selectedPolaroid = writable<SelectedPolaroid | null>(null);
export const selectedPhotoIndex = writable<number>(-1);
