<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from "svelte-routing";
  import AboutMeImg from '../../assets/AboutMe.png';

  let isCut = false;
  let checkInterval: ReturnType<typeof setInterval>;
  let hasInteracted = false;

  onMount(() => {
    checkInterval = setInterval(() => {
      if (!window.portfolioState) return;
      
      const { isScrolling, isTopHalf } = window.portfolioState;
      
      if (isScrolling && isTopHalf && !hasInteracted) {
        handleCutString();
        hasInteracted = true;
      }
    }, 100);

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  });

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
</script>

<div class="interaction-area-top flex flex-col items-center">
  <svg class="w-full h-full" viewBox="0 0 300 200">
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
        role="button"
        tabindex="0"
        class="cursor-pointer"
        on:click={() => navigate('/Perfom')}
        on:keydown={(e) => e.key === 'Enter' && navigate('/Perfom')}
      >
        <image 
          href={AboutMeImg}
          x="-40"
          y="-40"
          width="80"
          height="80"
          aria-label="Navigate to Perform page"
        />
      </g>
    </g>
  </svg>
</div>
