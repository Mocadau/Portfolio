<script lang="ts">
  import { onDestroy } from 'svelte';

  interface Bubble {
    id: number;
    x: number;
    y: number;
    size: number;
    xOffset: number;
  }

  let bubbles: Bubble[] = [];
  let bubbleId = 0;
  let bubbleTimers: number[] = [];

  function createBubble(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left - 10;
    
    const newBubble: Bubble = {
      id: bubbleId++,
      x: x,
      y: 0,
      size: Math.random() * 15 + 10,
      xOffset: Math.random() > 0.5 ? 50 : -50
    };
    
    bubbles = [...bubbles, newBubble];
    
    const timer = window.setTimeout(() => {
      bubbles = bubbles.filter(bubble => bubble.id !== newBubble.id);
    }, 4000);
    
    bubbleTimers.push(timer);
  }

  onDestroy(() => {
    bubbleTimers.forEach(timer => clearTimeout(timer));
  });
</script>

<div 
  class="interaction-area-bottom cursor-pointer relative overflow-hidden"
  on:click={createBubble}
  on:mousemove={createBubble}
>
  <svg class="w-full h-full" viewBox="0 0 300 200">
    <g transform="translate(150, 100)">
      <circle cx="0" cy="0" r="15" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="2,2" />
      <line x1="15" y1="0" x2="40" y2="0" stroke="#000" stroke-width="3" />
    </g>
    
    {#each bubbles as bubble (bubble.id)}
      <circle
        cx={bubble.x}
        cy={200 - bubble.size}
        r={bubble.size}
        fill="none"
        stroke="#88C"
        stroke-width="1"
        class="bubble-animate"
        style="animation: float-{bubble.id} 4s ease-out forwards"
      />
    {/each}
  </svg>
</div>

<style>
  .bubble-animate {
    opacity: 0.7;
  }

  @keyframes float {
    0% { 
      transform: translateY(0) translateX(0); 
      opacity: 0.7; 
    }
    100% { 
      transform: translateY(-300px) translateX(var(--x-offset)); 
      opacity: 0; 
    }
  }

  :global([class^="float-"]) {
    animation: float 4s ease-out forwards;
  }
</style>
