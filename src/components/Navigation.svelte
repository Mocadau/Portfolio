<script lang="ts">
  import { isFlashing } from '../stores/flash';
  
  // Props
  export let scrollToSection: (section: string) => void;
  export let currentSection: string;

  // Reactive state
  let hovering = false;
  
  let visibleItems = ["hello", "works", "more"];

  // Event handlers
  function handleMouseEnter() {
    hovering = true;
  }

  function handleMouseLeave() {
    hovering = false;
  }

  function handleClick(section: string) {
    scrollToSection(section);
  }
</script>

<nav 
  class="nav-menu fixed top-8 inset-x-0 z-50 flex items-center gap-8 text-black scale-75 md:scale-100 origin-top-center justify-center md:justify-end md:inset-x-auto md:right-16" 
  on:mouseenter={handleMouseEnter} 
  on:mouseleave={handleMouseLeave}
>
  {#each visibleItems as item}
    <div
      class="nav-item hand-drawn-text cursor-pointer {currentSection === item ? 'active' : ''}"
      role="button"
      tabindex="0"
      on:click={() => handleClick(item)}
      on:keydown={e => e.key === 'Enter' && handleClick(item)}
    >
      <span class="text-3xl hand-drawn-text">
        {item.toUpperCase()}
        {#if currentSection === item}
          <div class="h-[3px] mt-1 border-b-[3px] border-dashed border-black"></div>
        {/if}
      </span>
    </div>
  {/each}
</nav>

<style>
@keyframes wobble {
  0%, 100% { transform: scale(1.2) rotate(0deg); }
  25% { transform: scale(1.2) rotate(-3deg); }
  75% { transform: scale(1.2) rotate(3deg); }
}

.nav-item {
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s;
  cursor: pointer;
  padding: 0.5rem 1rem;
  white-space: nowrap;
}

.nav-item:hover:not(.active) {
  transform: scale(1.1);
}

.nav-item.active {
  animation: wobble 2s ease-in-out infinite;
  font-weight: bold;
}
</style>
