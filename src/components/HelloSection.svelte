<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import TypingAnimation from "./TypingAnimation.svelte";
  const dispatch = createEventDispatcher();
  
  let helloComplete = false;
  let showRestContent = false;
  let isTypingComplete = false;
  let skipAnimation = false;
  let showCursorEffect = false;
  let cursorX = 0;
  let cursorY = 0;
  let sectionElement: HTMLElement;
  let globalMouseHandler: ((event: MouseEvent) => void) | null = null;
  
  // Mobile peek effect variables
  let showMobilePeek = false;
  let peekX = 0;
  let peekY = 0;
  let touchHandler: ((event: TouchEvent) => void) | null = null;
  let isMobile = false;
  
  // Scroll indicator variables
  let showScrollIndicator = false;
  let scrollIndicatorTimeout: NodeJS.Timeout;

  // Check if we should skip the animation
  function shouldSkipAnimation() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('hasPlayedAnimation') === 'true';
    }
    return false;
  }
  
  function handleHelloComplete() {
    helloComplete = true;
    
    // Warte 800ms damit "HELLO" im Fokus steht, dann zeige den Rest
    setTimeout(() => {
      showRestContent = true;
    }, 800);
  }
  
  function handleAllTypingComplete() {
    isTypingComplete = true;
    dispatch('complete');
    
    // Markiere Animation als gesehen (für andere Features, aber nicht zum Überspringen)
    try {
      localStorage.setItem('hasPlayedAnimation', 'true');
    } catch (e) {
      console.error('Could not write to localStorage:', e);
    }
    
    // Aktiviere Cursor-Effekt nach einer kurzen Verzögerung
    setTimeout(() => {
      if (isMobile) {
        showMobilePeek = true;
        setupMobileTouchHandler();
        // Show scroll indicator for mobile devices
        showScrollIndicator = true;
        startScrollIndicatorTimer();
      } else {
        showCursorEffect = true;
        setupGlobalMouseHandler();
      }
    }, 1000);
  }

  function setupGlobalMouseHandler() {
    if (globalMouseHandler) {
      document.removeEventListener('mousemove', globalMouseHandler);
    }
    
    globalMouseHandler = (event: MouseEvent) => {
      handleMouseMove(event);
    };
    
    document.addEventListener('mousemove', globalMouseHandler);
  }

  function removeGlobalMouseHandler() {
    if (globalMouseHandler) {
      document.removeEventListener('mousemove', globalMouseHandler);
      globalMouseHandler = null;
    }
    showCursorEffect = false;
  }

  function setupMobileTouchHandler() {
    if (touchHandler) {
      document.removeEventListener('touchmove', touchHandler);
      document.removeEventListener('touchstart', touchHandler);
    }
    
    touchHandler = (event: TouchEvent) => {
      handleTouchMove(event);
    };
    
    document.addEventListener('touchmove', touchHandler, { passive: true });
    document.addEventListener('touchstart', touchHandler, { passive: true });
  }

  function removeMobileTouchHandler() {
    if (touchHandler) {
      document.removeEventListener('touchmove', touchHandler);
      document.removeEventListener('touchstart', touchHandler);
      touchHandler = null;
    }
    showMobilePeek = false;
  }

  function handleTouchMove(event: TouchEvent) {
    if (showMobilePeek && event.touches.length > 0) {
      const touch = event.touches[0];
      requestAnimationFrame(() => {
        peekX = touch.clientX;
        peekY = touch.clientY;
      });
    }
  }

  function startScrollIndicatorTimer() {
    // Zeige Scroll-Indicator für 4 Sekunden
    scrollIndicatorTimeout = setTimeout(() => {
      showScrollIndicator = false;
    }, 4000);
    
    // Verstecke Indicator beim Scrollen
    const handleScroll = () => {
      hideScrollIndicator();
      window.removeEventListener('scroll', handleScroll);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  function hideScrollIndicator() {
    showScrollIndicator = false;
    if (scrollIndicatorTimeout) {
      clearTimeout(scrollIndicatorTimeout);
    }
  }

  // Export function to be called by parent component
  export function disableCursorEffect() {
    removeGlobalMouseHandler();
    removeMobileTouchHandler();
  }

  export function enableCursorEffect() {
    if (isTypingComplete) {
      if (isMobile) {
        showMobilePeek = true;
        setupMobileTouchHandler();
        showScrollIndicator = true;
        startScrollIndicatorTimer();
      } else {
        showCursorEffect = true;
        setupGlobalMouseHandler();
      }
    }
  }
  
  function handleMouseMove(event: MouseEvent) {
    if (showCursorEffect) {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        cursorX = event.clientX;
        cursorY = event.clientY;
      });
    }
  }
  
  onMount(() => {
    // Check if device is mobile
    isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    // Check if animation should be skipped
    skipAnimation = shouldSkipAnimation();

    if (skipAnimation) {
      // If skipping animation, show content immediately
      helloComplete = true;
      showRestContent = true;
      isTypingComplete = true;
      
      // Show cursor effect after a short delay
      setTimeout(() => {
        if (isMobile) {
          showMobilePeek = true;
          setupMobileTouchHandler();
        } else {
          showCursorEffect = true;
          setupGlobalMouseHandler();
        }
      }, 100);
    }
    
    return () => {
      if (globalMouseHandler) {
        document.removeEventListener('mousemove', globalMouseHandler);
      }
      if (touchHandler) {
        document.removeEventListener('touchmove', touchHandler);
        document.removeEventListener('touchstart', touchHandler);
      }
      if (scrollIndicatorTimeout) {
        clearTimeout(scrollIndicatorTimeout);
      }
    };
  });
</script>

<section 
  class="section-container bg-white flex flex-col md:flex-row justify-between items-center relative overflow-x-hidden cursor-effect-container" 
  bind:this={sectionElement}
>
  <!-- Global Cursor-Effekt nur auf Hello-Sektion -->
  {#if showCursorEffect}
    <div 
      class="cursor-glow global-cursor" 
      style="left: {cursorX}px; top: {cursorY}px;"
    ></div>
  {/if}

  <!-- Mobile Peek-Effekt -->
  {#if showMobilePeek}
    <div 
      class="mobile-peek-effect" 
      style="left: {peekX}px; top: {peekY}px;"
    ></div>
  {/if}

  <!-- Mobile Swipe Indicator -->
  {#if showScrollIndicator && isMobile}
    <div 
      class="swipe-indicator" 
      role="button" 
      tabindex="0"
      aria-label="Hide swipe indicator"
      on:click={hideScrollIndicator} 
      on:keydown={(e) => e.key === 'Enter' && hideScrollIndicator()}
    >
      <div class="swipe-animation">
        <div class="swipe-icon">
          <div class="swipe-line"></div>
          <div class="swipe-arrow"></div>
        </div>
        <div class="swipe-text hand-drawn-text">SWIPE</div>
      </div>
    </div>
  {/if}

  <div class="w-full md:w-auto flex justify-center items-center h-screen md:mt-16 min-h-[350px] scale-75 md:scale-100 origin-center md:mx-auto px-4 md:px-4">
    <div class="px-2 md:px-6 max-w-[100%] sm:max-w-[95%] md:max-w-none text-left w-full md:w-auto md:flex md:flex-col md:justify-center md:items-start">
      
      <!-- HELLO als getippter Text oder statischer Text -->
      <h1 class="text-2xl sm:text-5xl font-bold mb-8 sm:mb-12 hand-drawn-title relative text-left">
        <span class="relative inline-block">
          {#if skipAnimation}
            HELLO
            <span class="absolute -bottom-2 left-0 w-full border-b-4 border-black"></span>
          {:else}
            <TypingAnimation 
              text="HELLO"
              speed={100} 
              delayStart={0}
              underline={true}
              on:complete={handleHelloComplete}
            />
          {/if}
        </span>
      </h1>
      
      <!-- Rest des Inhalts wird nur angezeigt wenn Hello fertig ist -->
      {#if showRestContent}
        <div class="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-8 leading-relaxed hand-drawn-text pl-0 text-left">
          {#if skipAnimation}
            I AM AN INTERACTION DESIGNER.
          {:else}
            <TypingAnimation 
              text="I AM AN PRODUCT DESIGNER." 
              speed={50} 
              delayStart={0}
              underline={false}
            />
          {/if}
        </div>
        
        <div class="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-8 leading-relaxed hand-drawn-text relative text-left">
          <div class="flex flex-wrap items-start md:flex-nowrap md:items-center gap-1 md:gap-4 mx-0 w-full justify-start">
            <span class="inline-block">
              {#if skipAnimation}
                STUDYING
              {:else}
                <TypingAnimation 
                  text="STUDYING"
                  speed={50} 
                  delayStart={1000}
                  underline={false}
                />
              {/if}
            </span>
            <span class="inline-block">
              {#if skipAnimation}
                &nbsp;
              {:else}
                <TypingAnimation 
                  text=" "
                  speed={50} 
                  delayStart={1150}
                  underline={false}
                />
              {/if}
            </span>
            <a href="https://www.hfg-gmuend.de" target="_blank" rel="noopener noreferrer" class="relative inline-block hover:text-blue-500 transition-colors duration-300">
              {#if skipAnimation}
                @HFG SCHWAEBISCH GMUEND
                <div class="absolute -bottom-1 left-0 w-full h-[3px] bg-blue-500 md-only"></div>
              {:else}
                <TypingAnimation 
                  text="@HFG SCHWAEBISCH GMUEND"
                  speed={50} 
                  delayStart={1300}
                  underline={false}
                />
                <div class="absolute -bottom-1 left-0 w-0 h-[3px] bg-blue-500 animate-underline md-only"></div>
              {/if}
            </a>
            <span class="inline-block whitespace-nowrap">
              {#if skipAnimation}
                &nbsp;&
              {:else}
                <TypingAnimation 
                  text=" "
                  speed={50} 
                  delayStart={1900}
                  underline={false}
                />
                <TypingAnimation 
                  text="&" 
                  speed={50} 
                  delayStart={2000}
                  underline={false}
                />
              {/if}
            </span>
          </div>
        </div>
        
        <div class="text-2xl sm:text-3xl md:text-4xl leading-relaxed hand-drawn-text pl-0 text-left">
          {#if skipAnimation}
            LOOKING 4 AN INTERNSHIP!
          {:else}
            <TypingAnimation 
              text="LOOKING 4 AN INTERNSHIP." 
              speed={50} 
              delayStart={2500}
              underline={false}
              on:complete={handleAllTypingComplete}
            />
          {/if}
        </div>
      {/if}
    </div>
    

  </div>
</section>

<style>
  :global(.animate-underline) {
    animation: underline 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 2.8s;
  }

  @keyframes underline {
    to { width: 100%; }
  }

  a {
    text-decoration: none;
  }

  a:hover {
    color: #3b82f6;
  }
  
  /* Unterstrich nur auf Desktop (md und größer) anzeigen */
  @media (max-width: 767px) {
    .md-only {
      display: none;
    }
  }

  /* Cursor-Effekt Styling */
  .cursor-effect-container {
    position: relative;
  }

  .cursor-glow {
    position: absolute;
    width: 120px;
    height: 120px;
    pointer-events: none;
    transform: translate(-50%, -50%);
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 50%,
      rgba(255, 255, 255, 0.04) 100%
    );
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    box-shadow: 
      0 4px 15px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    z-index: 100;
    opacity: 0.8;
    will-change: transform;
    transform: translate3d(-50%, -50%, 0);
  }

  /* Global Cursor positioning */
  .global-cursor {
    position: fixed;
    z-index: 1000;
  }

  /* Alternative für Browser ohne backdrop-filter Support */
  @supports not (backdrop-filter: blur(15px)) {
    .cursor-glow {
      background: radial-gradient(
        circle,
        rgba(200, 200, 200, 0.4) 0%,
        rgba(180, 180, 180, 0.25) 40%,
        rgba(160, 160, 160, 0.15) 70%,
        transparent 100%
      );
      filter: blur(8px);
    }
  }

  /* Responsive Cursor-Effekt - nur auf Desktop */
  @media (max-width: 768px) {
    .cursor-glow {
      display: none;
    }
  }

  /* Mobile Peek-Effekt */
  .mobile-peek-effect {
    position: fixed;
    width: 80px;
    height: 80px;
    pointer-events: none;
    transform: translate(-50%, -50%);
    background: radial-gradient(
      circle,
      rgba(59, 130, 246, 0.3) 0%,
      rgba(59, 130, 246, 0.15) 40%,
      rgba(59, 130, 246, 0.05) 70%,
      transparent 100%
    );
    border-radius: 50%;
    z-index: 100;
    opacity: 0.8;
    will-change: transform;
    transform: translate3d(-50%, -50%, 0);
    animation: mobile-peek-pulse 2s ease-in-out infinite;
  }

  @keyframes mobile-peek-pulse {
    0%, 100% {
      transform: translate3d(-50%, -50%, 0) scale(1);
      opacity: 0.8;
    }
    50% {
      transform: translate3d(-50%, -50%, 0) scale(1.2);
      opacity: 0.4;
    }
  }

  /* Mobile Peek-Effekt nur auf mobilen Geräten anzeigen */
  @media (min-width: 769px) {
    .mobile-peek-effect {
      display: none;
    }
  }

  /* Swipe Indicator Styles */
  .swipe-indicator {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 150;
    animation: swipe-indicator-fade-in 0.5s ease-out forwards;
    cursor: pointer;
    padding: 12px 20px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 2px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .swipe-animation {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .swipe-icon {
    position: relative;
    width: 40px;
    height: 20px;
    margin-bottom: 4px;
  }

  .swipe-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 30px;
    height: 2px;
    background: #000;
    transform: translateY(-50%);
    border-radius: 2px;
    animation: swipe-line-slide 2s ease-in-out infinite;
  }

  .swipe-arrow {
    position: absolute;
    top: 50%;
    right: 0;
    width: 0;
    height: 0;
    border-left: 6px solid #000;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    transform: translateY(-50%);
    animation: swipe-arrow-pulse 2s ease-in-out infinite;
  }

  .swipe-text {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    letter-spacing: 1px;
    text-align: center;
    margin: 0;
  }

  @keyframes swipe-line-slide {
    0%, 20% {
      transform: translateY(-50%) translateX(0);
      opacity: 1;
    }
    50%, 70% {
      transform: translateY(-50%) translateX(10px);
      opacity: 0.7;
    }
    100% {
      transform: translateY(-50%) translateX(0);
      opacity: 1;
    }
  }

  @keyframes swipe-arrow-pulse {
    0%, 20% {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
    50%, 70% {
      opacity: 0.7;
      transform: translateY(-50%) scale(1.2);
    }
    100% {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }

  @keyframes swipe-indicator-fade-in {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  /* Swipe Indicator nur auf mobilen Geräten anzeigen */
  @media (min-width: 769px) {
    .swipe-indicator {
      display: none;
    }
  }

  /* Verstecke Swipe Indicator bei sehr kleinen Screens */
  @media (max-height: 600px) {
    .swipe-indicator {
      bottom: 20px;
    }
    
    .swipe-text {
      font-size: 11px;
    }
  }

  /* Smooth Cursor Movement auf modernen Browsern */
  @media (prefers-reduced-motion: no-preference) {
    .cursor-glow {
      transition: none;
    }
  }

  /* Reduced Motion für Barrierefreiheit */
  @media (prefers-reduced-motion: reduce) {
    .cursor-glow {
      transition: none;
    }
  }

  /* iPhone SE und sehr kleine Geräte spezifische Anpassungen */
  @media (max-width: 375px) and (max-height: 667px) {
    :global(.section-container) {
      padding-top: 1rem !important;
    }
    
    .text-4xl {
      font-size: 2rem !important;
    }
    
    .text-2xl {
      font-size: 1.25rem !important;
      line-height: 1.4 !important;
    }
    
    .mb-8 {
      margin-bottom: 1rem !important;
    }
    
    .mb-3 {
      margin-bottom: 0.5rem !important;
    }
    
    .px-4 {
      padding-left: 0.75rem !important;
      padding-right: 0.75rem !important;
    }
    
    .px-2 {
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
    }
  }

  /* Extra kleine Screens - Portrait Modus */
  @media (max-width: 320px) {
    .text-4xl {
      font-size: 1.75rem !important;
    }
    
    .text-2xl {
      font-size: 1.125rem !important;
    }
  }
</style>
