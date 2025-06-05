<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { navigate } from "svelte-routing";
  import type { ProjectInteractionProps } from "../../types/project";
  import AboutMeImg from '../../assets/AboutMe.png';

  let isCut = false;
  let isFollowing = false;
  let hasInteracted = {
    top: false,
    bottom: false
  };

  let snowmanPosition = { x: 0, y: 0 };
  let mousePosition = { x: 0, y: 0 };
  let checkInterval: ReturnType<typeof setInterval>;

  onMount(() => {
    checkInterval = setInterval(() => {
      if (!window.portfolioState) return;
      
      const { isScrolling, isTopHalf, isBottomHalf } = window.portfolioState;
      
      if (isScrolling && isTopHalf && !hasInteracted.top) {
        handleCutString();
        hasInteracted.top = true;
      }
      
      if (isScrolling && isBottomHalf && !hasInteracted.bottom) {
        handleSnowmanFollow();
        hasInteracted.bottom = true;
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

  function handleCutString() {
    if (!isCut) {
      isCut = true;
      try {
        const audio = new Audio("/drop-sound.mp3");
        audio.volume = 0.5;
        audio.play().catch(err => console.log("Audio playback failed", err));
      } catch (err) {
        console.log("Audio playback failed", err);
      }
    }
  }

  function handleSnowmanFollow() {
    if (isCut && !isFollowing) {
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

<div class="interaction-area-top flex flex-col items-center relative">
  <svg class="w-full h-full pointer-events-none" viewBox="0 0 300 200">
    <line 
      class="transition-all duration-700 ease-in-out"
      class:opacity-0={isCut}
      class:opacity-100={!isCut}
      x1="150" 
      y1="0" 
      x2="150" 
      y2={isCut ? "0" : "80"} 
      stroke="#000" 
      stroke-width="2"
      stroke-dasharray="5,5"
      stroke-linecap="round"
    />
    <g 
      class="transition-all duration-700 ease-in-out"
      transform={`translate(150, ${isCut ? "150" : "80"}) scale(0.8)`}
    >
      <g 
        class="cursor-pointer pointer-events-auto"
        role="button"
        tabindex="0"
        on:click={() => navigate('/Perfom')}
        on:keydown={(e) => e.key === 'Enter' && navigate('/Perfom')}
      >
        <rect 
          x="-40" 
          y="-40" 
          width="80" 
          height="80" 
          fill="#fff" 
          stroke="#000" 
          stroke-width="3" 
          stroke-linejoin="round" 
          stroke-dasharray="8,4"
          class="pointer-events-auto cursor-pointer"
        />
      </g>
    </g>
  </svg>
</div>

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
