/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
  interface Window {
    portfolioState?: {
      isScrolling: boolean;
      isTopHalf: boolean;
      isBottomHalf: boolean;
      mousePosition: { y: number };
    };
    hasPlayedGlobalIntroSounds?: boolean;
  }
}
