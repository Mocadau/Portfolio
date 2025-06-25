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
  
  // Mouse velocity tracking für Liquid Glass Effekt
  let lastMouseX = 0;
  let lastMouseY = 0;
  let lastMouseTime = 0;
  let mouseVelocity = 0;
  let velocityDecayTimeout: NodeJS.Timeout;
  let intensityLevel = 1; // 1 = normal, höhere Werte = stärkere Animation
  
  // Mobile peek effect variables
  let showMobilePeek = false;
  let peekX = 0;
  let peekY = 0;
  let touchHandler: ((event: TouchEvent) => void) | null = null;
  let isMobile = false;
  
  // Scroll indicator variables
  let showScrollIndicator = false;
  let scrollIndicatorTimeout: NodeJS.Timeout;
  
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
    
    // Aktiviere Cursor-Effekt nach einer kurzen Verzögerung
    setTimeout(() => {
      if (isMobile) {
        showMobilePeek = true;
        setupMobileTouchHandler();
        // Zeige Scroll-Indicator für mobile Geräte
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
    
    // Reset velocity tracking
    mouseVelocity = 0;
    intensityLevel = 1;
    if (velocityDecayTimeout) {
      clearTimeout(velocityDecayTimeout);
    }
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
      const currentTime = performance.now();
      
      // Berechne Mausgeschwindigkeit für Apple-Style Liquid Morphing
      if (lastMouseTime > 0) {
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;
        const deltaTime = currentTime - lastMouseTime;
        
        if (deltaTime > 16) { // Limit to ~60fps updates
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const velocity = distance / deltaTime;
          
          // Viel glattere Geschwindigkeitsanpassung mit weniger Flackern
          mouseVelocity = mouseVelocity * 0.9 + velocity * 0.1;
          
          // Sanftere Intensitätslevel-Übergänge (1-2.5x statt 1-4x)
          const targetIntensity = mouseVelocity > 1.5 ? 
            Math.min(2.5, 1 + mouseVelocity * 0.5) : 
            Math.max(1, 1 + mouseVelocity * 0.3);
          
          // Sanfte Interpolation zur Ziel-Intensität
          intensityLevel = intensityLevel * 0.85 + targetIntensity * 0.15;
          
          // Aktualisiere letzte Position und Zeit nur bei tatsächlichen Updates
          lastMouseX = event.clientX;
          lastMouseY = event.clientY;
          lastMouseTime = currentTime;
        }
      } else {
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        lastMouseTime = currentTime;
      }
      
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        cursorX = event.clientX;
        cursorY = event.clientY;
      });
      
      // Sanfterer Velocity Decay
      clearTimeout(velocityDecayTimeout);
      velocityDecayTimeout = setTimeout(() => {
        mouseVelocity *= 0.95;
        intensityLevel = intensityLevel * 0.98 + 1 * 0.02; // Sanft zurück zu 1
      }, 100);
    }
  }
  
  onMount(() => {
    // Check if device is mobile
    isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    // Check if animation has been seen in this session
    try {
      skipAnimation = sessionStorage.getItem('hasSeenAnimation') === 'true';
      if (skipAnimation) {
        // Skip animation and show everything immediately
        helloComplete = true;
        showRestContent = true;
        isTypingComplete = true;
        
        if (isMobile) {
          showMobilePeek = true;
          showScrollIndicator = true;
        } else {
          showCursorEffect = true;
        }
        
        // Dispatch complete immediately for skip case
        setTimeout(() => {
          dispatch('complete');
          if (isMobile) {
            setupMobileTouchHandler();
            startScrollIndicatorTimer();
          } else {
            setupGlobalMouseHandler();
          }
        }, 100);
      }
    } catch (e) {
      console.error('Could not read from sessionStorage:', e);
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
      if (velocityDecayTimeout) {
        clearTimeout(velocityDecayTimeout);
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
      style="left: {cursorX}px; top: {cursorY}px; --intensity: {intensityLevel}; --velocity: {mouseVelocity};"
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

  <div class="w-full md:w-auto flex justify-center md:justify-start items-center h-screen md:mt-32 min-h-[350px] scale-75 md:scale-100 origin-center md:mx-auto px-4 md:px-4">
    <div class="px-2 md:px-6 max-w-[100%] sm:max-w-[95%] md:max-w-none text-left w-full md:w-auto">
      
      <!-- HELLO als getippter Text oder statischer Text -->
      <h1 class="text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 hand-drawn-title relative">
        <span class="relative inline-block">
          {#if skipAnimation}
            HELLO
            <span class="absolute -bottom-2 left-0 w-full border-b-4 border-black"></span>
          {:else}
            <TypingAnimation 
              text="HELLO"
              speed={100} 
              delayStart={500}
              underline={true}
              on:complete={handleHelloComplete}
            />
          {/if}
        </span>
      </h1>
      
      <!-- Rest des Inhalts wird nur angezeigt wenn Hello fertig ist -->
      {#if showRestContent}
        <div class="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-8 leading-relaxed hand-drawn-text pl-0">
          {#if skipAnimation}
            I AM AN INTERACTION DESIGNER.
          {:else}
            <TypingAnimation 
              text="I AM AN INTERACTION DESIGNER." 
              speed={50} 
              delayStart={0}
              underline={false}
            />
          {/if}
        </div>
        
        <div class="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-8 leading-relaxed hand-drawn-text relative">
          <div class="flex flex-wrap items-start md:flex-nowrap md:items-center gap-1 md:gap-4 mx-0 w-full">
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
        
        <div class="text-2xl sm:text-3xl md:text-4xl leading-relaxed hand-drawn-text pl-0">
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
    width: 140px;
    height: 140px;
    pointer-events: none;
    transform: translate(-50%, -50%);
    background: 
      radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(129, 140, 248, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, 
        rgba(255, 255, 255, 0.1) 0%,
        rgba(199, 210, 254, 0.15) 30%,
        rgba(165, 180, 252, 0.1) 70%,
        rgba(255, 255, 255, 0.05) 100%
      );
    backdrop-filter: blur(15px) saturate(1.8);
    -webkit-backdrop-filter: blur(15px) saturate(1.8);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.1),
      0 2px 8px rgba(129, 140, 248, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    z-index: 100;
    opacity: 0.9;
    will-change: transform, border-radius;
    transform: translate3d(-50%, -50%, 0);
    
    /* Sanftere Animation mit weniger Flackern */
    animation: liquid-morph calc(6s / var(--intensity, 1)) ease-in-out infinite;
    
    /* Reduzierte Verzerrung für weniger Flackern */
    filter: blur(calc(0.5px * var(--velocity, 0))) saturate(calc(1.1 + var(--velocity, 0) * 0.1));
    
    /* Sanfte Übergänge */
    transition: filter 0.3s ease-out;
  }

  /* Sanftere Apple-Style Liquid Glass Morphing Keyframes */
  @keyframes liquid-morph {
    0%, 100% {
      border-radius: 50%;
      transform: translate3d(-50%, -50%, 0) scale(1) rotate(0deg);
    }
    25% {
      border-radius: calc(42% + 8% * var(--intensity, 1)) calc(48% + 10% * var(--intensity, 1)) calc(52% + 12% * var(--intensity, 1)) calc(48% + 8% * var(--intensity, 1));
      transform: translate3d(-50%, -50%, 0) scale(calc(1.02 + var(--intensity, 1) * 0.02)) rotate(calc(90deg * var(--intensity, 1)));
    }
    50% {
      border-radius: calc(48% + 12% * var(--intensity, 1)) calc(42% + 8% * var(--intensity, 1)) calc(48% + 8% * var(--intensity, 1)) calc(52% + 10% * var(--intensity, 1));
      transform: translate3d(-50%, -50%, 0) scale(calc(0.98 - var(--intensity, 1) * 0.02)) rotate(calc(180deg * var(--intensity, 1)));
    }
    75% {
      border-radius: calc(46% + 6% * var(--intensity, 1)) calc(54% + 8% * var(--intensity, 1)) calc(52% + 6% * var(--intensity, 1)) calc(48% + 4% * var(--intensity, 1));
      transform: translate3d(-50%, -50%, 0) scale(calc(1.01 + var(--intensity, 1) * 0.03)) rotate(calc(270deg * var(--intensity, 1)));
    }
  }

  /* Global Cursor positioning */
  .global-cursor {
    position: fixed;
    z-index: 1000;
  }

  /* Alternative für Browser ohne backdrop-filter Support */
  @supports not (backdrop-filter: blur(15px)) {
    .cursor-glow {
      background: 
        radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 70% 70%, rgba(129, 140, 248, 0.3) 0%, transparent 50%),
        radial-gradient(
          circle,
          rgba(220, 230, 255, 0.6) 0%,
          rgba(199, 210, 254, 0.4) 30%,
          rgba(165, 180, 252, 0.3) 60%,
          rgba(255, 255, 255, 0.2) 80%,
          transparent 100%
        );
      filter: blur(12px) saturate(1.5);
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
