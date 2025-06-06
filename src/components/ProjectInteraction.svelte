<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { ProjectInteractionProps } from '../types/project';
  
  // Props
  export let TopInteraction: ProjectInteractionProps['TopInteraction'];
  export let BottomInteraction: ProjectInteractionProps['BottomInteraction'];
  
  // State
  let mousePosition = { y: 0 };
  let isInView = false;
  let hasInteracted = {
    top: false,
    bottom: false
  };
  
  let containerElement: HTMLDivElement;
  let observer: IntersectionObserver;
  let checkInterval: number;
  
  // Intersection Observer setup
  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isInView = entry.isIntersecting;
        });
      },
      { threshold: 0.5 }
    );
    
    if (containerElement) {
      observer.observe(containerElement);
    }

    // Monitor global scroll state to trigger interactions
    checkInterval = window.setInterval(() => {
      // Only proceed if we have the global state and element is in view
      if (!window.portfolioState || !isInView) return;
      
      const { isScrolling, isTopHalf, isBottomHalf } = window.portfolioState;
      
      // If scrolling and in top half, trigger top interaction
      if (isScrolling && isTopHalf && !hasInteracted.top) {
        hasInteracted = { ...hasInteracted, top: true };
      }
      
      // If scrolling and in bottom half, trigger bottom interaction
      if (isScrolling && isBottomHalf && !hasInteracted.bottom) {
        hasInteracted = { ...hasInteracted, bottom: true };
      }
    }, 100);
  });

  onDestroy(() => {
    if (containerElement) {
      observer?.unobserve(containerElement);
    }
    if (checkInterval) {
      clearInterval(checkInterval);
    }
  });
</script>

<div bind:this={containerElement} class="w-full h-full relative">
  <!-- Top Interaction Area -->
  <div class="absolute left-0 top-0 w-full h-1/2">
    <svelte:component this={TopInteraction} hasInteracted={hasInteracted.top} />
  </div>
  
  <!-- Bottom Interaction Area -->
  <div class="absolute left-0 bottom-0 w-full h-1/2">
    <svelte:component this={BottomInteraction} hasInteracted={hasInteracted.bottom} />
  </div>
</div>
