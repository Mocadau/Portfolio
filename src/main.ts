import App from './App.svelte';

// Add type declaration for portfolioState
declare global {
  interface Window {
    portfolioState: {
      isScrolling: boolean;
      isTopHalf: boolean;
      isBottomHalf: boolean;
      mousePosition: { y: number };
    };
  }
}

window.portfolioState = {
  isScrolling: false,
  isTopHalf: true, // Fixed: was false, should be true
  isBottomHalf: false,
  mousePosition: { y: 0 }
};

const app = new App({
  target: document.getElementById('app') as HTMLElement,
  props: {
    url: window.location.pathname
  }
});

export default app;
// Force rebuild for GitHub Pages So 15 Jun 2025 13:12:30 CEST
