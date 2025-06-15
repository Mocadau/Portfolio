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
      showCursorEffect = true;
      setupGlobalMouseHandler();
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

  // Export function to be called by parent component
  export function disableCursorEffect() {
    removeGlobalMouseHandler();
  }

  export function enableCursorEffect() {
    if (isTypingComplete) {
      showCursorEffect = true;
      setupGlobalMouseHandler();
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
    // Check if animation has been seen in this session
    try {
      skipAnimation = sessionStorage.getItem('hasSeenAnimation') === 'true';
      if (skipAnimation) {
        // Skip animation and show everything immediately
        helloComplete = true;
        showRestContent = true;
        isTypingComplete = true;
        showCursorEffect = true;
        // Dispatch complete immediately for skip case
        setTimeout(() => {
          dispatch('complete');
          setupGlobalMouseHandler();
        }, 100);
      }
    } catch (e) {
      console.error('Could not read from sessionStorage:', e);
    }

    return () => {
      if (globalMouseHandler) {
        document.removeEventListener('mousemove', globalMouseHandler);
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

  <div class="w-full md:w-auto flex justify-start items-center h-screen md:mt-32 min-h-[350px] scale-75 md:scale-100 origin-center md:mx-auto px-4">
    <div class="px-2 md:px-6 ml-0 max-w-[90%] md:max-w-none text-left">
      
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
              text="I AM AN PRODUCT DESIGNER." 
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
            <span class="inline-block">
              {#if skipAnimation}
                &nbsp;
              {:else}
                <TypingAnimation 
                  text=" "
                  speed={50} 
                  delayStart={1900}
                  underline={false}
                />
              {/if}
            </span>
            <span class="inline-block">
              {#if skipAnimation}
                &
              {:else}
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
    
    .mt-8 {
      margin-top: 0.5rem !important;
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
