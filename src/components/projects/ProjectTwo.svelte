<script lang="ts">
  import { onDestroy } from 'svelte';
  
  // State
  let isInflated = false;
  let bubbles: { id: number; x: number; y: number; size: number; }[] = [];
  let bubbleId = 0;
  let bubbleTimers: number[] = [];

  function handleInflateBalloons() {
    if (!isInflated) {
      isInflated = true;
    }
  }

  function createBubble(e: MouseEvent | KeyboardEvent) {
    if (e instanceof KeyboardEvent) {
      // For keyboard events, create bubble in the center
      const newBubble = {
        id: bubbleId++,
        x: 150, // center of viewBox
        y: 0,
        size: Math.random() * 15 + 10
      };
      
      bubbles = [...bubbles, newBubble];
      
      const timer = window.setTimeout(() => {
        bubbles = bubbles.filter(bubble => bubble.id !== newBubble.id);
      }, 4000);
      
      bubbleTimers.push(timer);
      return;
    }

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left - 10; // Center bubble on cursor
    
    const newBubble = {
      id: bubbleId++,
      x,
      y: 0,
      size: Math.random() * 15 + 10
    };
    
    bubbles = [...bubbles, newBubble];
    
    // Animate bubble floating up and remove after animation
    const timer = window.setTimeout(() => {
      bubbles = bubbles.filter(bubble => bubble.id !== newBubble.id);
    }, 4000);
    
    bubbleTimers.push(timer);
  }

  // Clean up timers
  onDestroy(() => {
    bubbleTimers.forEach(timer => clearTimeout(timer));
  });
</script>

<!-- Top Interaction -->
<div 
  class="interaction-area-top flex justify-center cursor-pointer"
  role="button"
  tabindex="0"
  on:click={handleInflateBalloons}
  on:keydown={e => e.key === 'Enter' && handleInflateBalloons()}
>
  <svg class="w-full h-full" viewBox="0 0 300 200">
    <g 
      class="transition-transform duration-1000 {isInflated ? 'translate-y-[-100px]' : ''}"
      transform="translate(150, 80)"
    >
      <circle cx="-20" cy="0" r="20" fill="#f87171" stroke="#000" stroke-width="2" stroke-dasharray="2,1" stroke-linejoin="round" />
      <circle cx="20" cy="0" r="20" fill="#60a5fa" stroke="#000" stroke-width="2" stroke-dasharray="2,1" stroke-linejoin="round" />
      <circle cx="0" cy="-10" r="20" fill="#fbbf24" stroke="#000" stroke-width="2" stroke-dasharray="2,1" stroke-linejoin="round" />
      <line x1="-20" y1="20" x2="-20" y2="70" stroke="#000" stroke-width="1" stroke-dasharray="2,2" />
      <line x1="20" y1="20" x2="20" y2="70" stroke="#000" stroke-width="1" stroke-dasharray="2,2" />
      <line x1="0" y1="10" x2="0" y2="70" stroke="#000" stroke-width="1" stroke-dasharray="2,2" />
      <rect x="-30" y="30" width="60" height="40" fill="#fff" stroke="#000" stroke-width="2" />
      <text x="0" y="55" text-anchor="middle" font-size="12" font-family="Arial">Project 2</text>
    </g>
  </svg>
</div>

<!-- Bottom Interaction -->
<div 
  class="interaction-area-bottom cursor-pointer relative overflow-hidden"
  role="button"
  tabindex="0"
  on:click={createBubble}
  on:mousemove={createBubble}
  on:keydown={e => e.key === 'Enter' && createBubble(e)}
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
        style="animation: float 4s ease-out forwards;"
      />
    {/each}
  </svg>
</div>

<style>
  @keyframes float {
    0% { 
      transform: translateY(0) translateX(0);
      opacity: 0.7;
    }
    100% { 
      transform: translateY(-300px) translateX(var(--float-x)); 
      opacity: 0;
    }
  }

  .bubble-animate {
    opacity: 0.7;
    --float-x: calc((random(2) - 0.5) * 100px);
  }
</style>
