import type { Action } from 'svelte/action';

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

interface ScrollOptions {
  onScroll: (scrollPosition: number, containerWidth: number) => void;
  scrollSensitivity: number;
  scrollingEnabled?: boolean; // Neue Option zur Steuerung der Scroll-Aktivierung
}

export const horizontalScroll: Action<HTMLElement, ScrollOptions> = (node, options) => {
  let isScrolling = false;
  let scrollTimeout: number;
  let lastWheelTimestamp = 0;
  let scrollLocked = false;
  
  // Scroll initial deaktiviert, bis explizit aktiviert
  let scrollingEnabled = options.scrollingEnabled ?? false;
  
  function handleScroll() {
    const { scrollLeft, clientWidth } = node;
    
    if (!isScrolling) {
      isScrolling = true;
      if (window.portfolioState) {
        window.portfolioState.isScrolling = true;
      }
    }
    
    if (scrollTimeout) {
      window.clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = window.setTimeout(() => {
      isScrolling = false;
      if (window.portfolioState) {
        window.portfolioState.isScrolling = false;
      }
    }, 150);
    
    if (options.onScroll) {
      options.onScroll(scrollLeft, clientWidth);
    }
  }
  
  function handleWheel(event: WheelEvent) {
    event.preventDefault();
    
    // Frühzeitige Rückkehr wenn Scrolling nicht aktiviert ist
    if (!scrollingEnabled) {
      return;
    }
    
    const now = Date.now();
    if (scrollLocked || now - lastWheelTimestamp < 100) {
      return;
    }
    
    const viewportWidth = window.innerWidth;
    const currentScroll = node.scrollLeft;
    const scrollWidth = node.scrollWidth;
    const maxScroll = scrollWidth - viewportWidth;
    
    // Determine direction with a minimum threshold
    const direction = Math.abs(event.deltaY) > 10 ? (event.deltaY > 0 ? 1 : -1) : 0;
    
    if (direction === 0) return;
    
    // Get current section and calculate target section
    const currentSection = Math.round(currentScroll / viewportWidth);
    const maxSections = Math.floor(scrollWidth / viewportWidth);
    const targetSection = Math.max(0, Math.min(maxSections, currentSection + direction));
    
    // Don't proceed if we're already at the bounds
    if ((direction < 0 && currentScroll === 0) || 
        (direction > 0 && currentScroll >= maxScroll)) {
      return;
    }
    
    scrollLocked = true;
    lastWheelTimestamp = now;
    
    // Scroll to target section
    node.scrollTo({
      left: targetSection * viewportWidth,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      scrollLocked = false;
    }, 500);
  }
  
  function updateScrollState() {
    const position = node.scrollLeft;
    const total = node.scrollWidth;
    const visible = node.clientWidth;
    const remaining = total - (position + visible);
    
    if (options.onScroll) {
      options.onScroll(position, visible);
    }
  }
  
  // Track scroll position
  const scrollTracker = setInterval(updateScrollState, 100);
  
  // Add event listeners
  node.addEventListener('scroll', handleScroll);
  node.addEventListener('wheel', handleWheel, { passive: false });
  
  return {
    update(newOptions: ScrollOptions) {
      options = newOptions;
      scrollingEnabled = newOptions.scrollingEnabled ?? false;
    },
    destroy() {
      node.removeEventListener('scroll', handleScroll);
      node.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      window.clearInterval(scrollTracker);
    }
  };
};
