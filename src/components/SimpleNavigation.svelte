<script>
  import { onMount } from 'svelte';
  
  // Export currentSection for parent component binding
  export let currentSection = "hello";
  
  // Debug: Log section changes
  $: if (currentSection) {
    console.log('🔄 SimpleNavigation: currentSection changed to:', currentSection);
  }
  
  // State für die Animation
  let showAnimatedHello = false;
  let showNavigation = true; // Direkt true, da die Komponente nur geladen wird wenn sie angezeigt werden soll
  const visibleItems = ["hello", "works", "more"];

  function scrollToSection(section) {
    const container = document.querySelector(".scroll-container");
    if (!container) return;
    
    const containerWidth = window.innerWidth;
    const maxScroll = container.scrollWidth - containerWidth;
    let targetPosition = 0;
    
    switch (section) {
      case "hello":
        targetPosition = 0;
        break;
      case "works":
        targetPosition = containerWidth;
        break;
      case "more":
        // Calculate position of More section (after all projects)
        targetPosition = containerWidth * 4;
        // Ensure we don't scroll past the maximum
        targetPosition = Math.min(targetPosition, maxScroll);
        break;
      default:
        targetPosition = 0;
    }
    
    container.scrollTo({
      left: targetPosition,
      behavior: "smooth"
    });
    
    currentSection = section;
  }

  // Listen for section changes from PortfolioViewport - REMOVED as we now use binding

  onMount(() => {
    console.log('🎯 SimpleNavigation geladen');
    // Navigation ist bereits sichtbar, da die Komponente nur nach der Typing-Animation geladen wird
  });
</script>

<!-- Navigation -->
{#if showNavigation}
  <nav class="navigation">
    {#each visibleItems as item, index}
      <div
        class="nav-item {currentSection === item ? 'active' : ''}"
        style="--nav-delay: {index * 0.1}s"
        role="button"
        tabindex="0"
        on:click={() => scrollToSection(item)}
        on:keydown={e => e.key === 'Enter' && scrollToSection(item)}
      >
        <span>{item.toUpperCase()}</span>
        <div class="underline"></div>
      </div>
    {/each}
  </nav>
{/if}

<style>
  .navigation {
    position: fixed;
    top: 1.5rem;
    left: 1.5rem;
    display: flex;
    gap: 1.5rem;
    z-index: 50;
    opacity: 0;
    animation: navSlideIn 0.8s ease-out forwards;
    font-family: var(--font-family);
  }

  .nav-item {
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    position: relative;
    font-weight: 300;
    font-size: 0.875rem;
    color: #666;
    transition: color 0.3s ease;
    opacity: 0;
    transform: translateY(-20px);
    animation: navItemAppear 0.5s ease-out forwards;
    animation-delay: var(--nav-delay);
    letter-spacing: 0.05em;
    margin-bottom: 4px;
    display: inline-block;
  }

  .nav-item:hover {
    color: #000;
  }
  
  .nav-item:hover .underline {
    opacity: 0.3;
    transform: scaleX(0.7);
  }

  .nav-item.active {
    color: #000;
    font-weight: 400;
  }

  .underline {
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #000;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    opacity: 0;
  }
  
  .nav-item.active .underline {
    transform: scaleX(1);
    opacity: 1;
  }

  /* Animationen */
  @keyframes navSlideIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes navItemAppear {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Animation für die Unterstreichung ist jetzt über Transition definiert */
</style>
