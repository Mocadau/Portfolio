<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let isFollowing = false;
  let hasInteracted = false;
  let snowmanPosition = { x: 0, y: 0 };
  let mousePosition = { x: 0, y: 0 };
  let checkInterval: ReturnType<typeof setInterval>;

  onMount(() => {
    checkInterval = setInterval(() => {
      if (!window.portfolioState) return;
      
      const { isScrolling, isBottomHalf } = window.portfolioState;
      
      if (isScrolling && isBottomHalf && !hasInteracted) {
        handleSnowmanFollow();
        hasInteracted = true;
      }
    }, 100);
  });

  onDestroy(() => {
    if (checkInterval) {
      clearInterval(checkInterval);
    }
    window.removeEventListener('mousemove', handleMouseMove);
  });

  function handleMouseMove(e: MouseEvent) {
    if (isFollowing) {
      snowmanPosition = {
        x: Math.min(300, Math.max(-300, e.clientX - mousePosition.x)),
        y: 0
      };
    }
  }

  function handleSnowmanFollow() {
    if (!isFollowing) {
      isFollowing = true;
      
      mousePosition = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      setTimeout(() => {
        isFollowing = false;
        window.removeEventListener('mousemove', handleMouseMove);
      }, 3000);
    }
  }
</script>

<div class="interaction-area-bottom">
  <svg class="w-full h-full" viewBox="0 0 300 200">
    <g 
      transform={`translate(${150 + snowmanPosition.x}, 100)`}
      class="transition-transform duration-300"
    >
      <circle cx="0" cy="0" r="20" fill="#fff" stroke="#000" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="3,1" />
      <circle cx="0" cy="-35" r="15" fill="#fff" stroke="#000" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="3,1" />
      <circle cx="0" cy="-60" r="10" fill="#fff" stroke="#000" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="3,1" />
      <line x1="-15" y1="-35" x2="-30" y2="-45" stroke="#000" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="3,1" />
      <line x1="15" y1="-35" x2="30" y2="-45" stroke="#000" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="3,1" />
      <circle cx="-4" cy="-63" r="1" fill="#000" />
      <circle cx="4" cy="-63" r="1" fill="#000" />
      <path d="M-4,-58 Q0,-55 4,-58" fill="none" stroke="#000" stroke-width="1" />
    </g>
  </svg>
</div>
