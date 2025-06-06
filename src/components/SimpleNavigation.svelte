<script>
  import { onMount } from 'svelte';
  
  // State für die Animation
  let showAnimatedHello = false;
  let showNavigation = false; 
  let currentSection = "hello";
  const visibleItems = ["hello", "works", "more"];

  // Direkte Animation-Trigger-Funktion
  function startAnimation() {
    console.log('🚀 ANIMATION STARTED!');
    console.log('🎯 Current state before:', { showAnimatedHello, showNavigation });
    showAnimatedHello = true;
    
    // Nach 1.5 Sekunden das animierte Hello ausblenden und Navigation einblenden
    setTimeout(() => {
      console.log('⏰ Animation timer completed');
      showAnimatedHello = false;
      showNavigation = true;
      console.log('✅ Animation complete, navigation visible:', { showAnimatedHello, showNavigation });
    }, 1500);
  }

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

  // Listen for section changes from PortfolioViewport
  function handleSectionChange(event) {
    if (event.detail) {
      currentSection = event.detail;
    }
  }

  onMount(() => {
    console.log('🎯 SimpleNavigation geladen');
    
    // Globale Funktionen registrieren
    window.startNavigationAnimation = startAnimation;
    window.testAnimation = startAnimation;
    
    // Event Listener für die Typing Animation
    window.addEventListener('typingAnimationComplete', startAnimation);
    
    // Listen for section changes
    document.addEventListener('sectionChanged', handleSectionChange);
    
    return () => {
      window.removeEventListener('typingAnimationComplete', startAnimation);
      document.removeEventListener('sectionChanged', handleSectionChange);
    };
  });
</script>

<!-- HELLO Animation -->
{#if showAnimatedHello}
  <div class="animated-hello-overlay">
    <!-- Animiertes HELLO -->
    <div class="hello-text">
      <span class="letter" style="--delay: 0.1s;">H</span>
      <span class="letter" style="--delay: 0.2s;">E</span>
      <span class="letter" style="--delay: 0.3s;">L</span>
      <span class="letter" style="--delay: 0.4s;">L</span>
      <span class="letter" style="--delay: 0.5s;">O</span>
    </div>
  </div>
{/if}

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
        {item.toUpperCase()}
        {#if currentSection === item}
          <div class="underline"></div>
        {/if}
      </div>
    {/each}
  </nav>
{/if}

<style>
  .animated-hello-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeInOut 1.5s ease-in-out forwards;
  }

  .hello-text {
    font-size: 3rem;
    font-weight: 300;
    color: #000;
    font-family: 'Helvetica Neue', sans-serif;
    letter-spacing: 0.2em;
  }

  .letter {
    display: inline-block;
    animation: letterBounce 0.6s ease-out forwards;
    animation-delay: var(--delay);
    opacity: 0;
    transform: translateY(20px);
  }

  .navigation {
    position: fixed;
    top: 1.5rem;
    left: 1.5rem;
    display: flex;
    gap: 1.5rem;
    z-index: 50;
    opacity: 0;
    animation: navSlideIn 0.8s ease-out forwards;
    font-family: 'Helvetica Neue', sans-serif;
  }

  .nav-item {
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    position: relative;
    font-weight: 300;
    font-size: 0.875rem;
    color: #666;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(-20px);
    animation: navItemAppear 0.5s ease-out forwards;
    animation-delay: var(--nav-delay);
    letter-spacing: 0.05em;
  }

  .nav-item:hover {
    transform: translateY(-1px);
    color: #000;
  }

  .nav-item.active {
    color: #000;
    font-weight: 400;
  }

  .underline {
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: #000;
    animation: drawLine 0.3s ease-out forwards;
  }

  /* Animationen */
  @keyframes fadeInOut {
    0% { opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes letterBounce {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.9);
    }
    60% {
      opacity: 1;
      transform: translateY(-2px) scale(1.05);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

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

  @keyframes drawLine {
    0% { transform: scaleX(0); }
    100% { transform: scaleX(1); }
  }
</style>
