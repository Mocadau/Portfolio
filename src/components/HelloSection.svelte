<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TypingAnimation from "./TypingAnimation.svelte";
  const dispatch = createEventDispatcher();
  let isTypingComplete = false;
  let hideOriginalHello = false;
  
  function handleTypingComplete() {
    console.log('🎯 HelloSection: handleTypingComplete called');
    isTypingComplete = true;
    
    // Warte kurz, damit der Benutzer das fertige getippte HELLO sehen kann
    setTimeout(() => {
      // Verstecke das originale Hello
      hideOriginalHello = true;
      
      // Starte die Animation zur Navigation 200ms später
      setTimeout(() => {
        console.log('🔥 Dispatching typingAnimationComplete event');
        console.log('🎯 Available window functions:', Object.keys(window).filter(key => key.includes('Animation')));
        
        // Methode 1: Window Event
        window.dispatchEvent(new CustomEvent('typingAnimationComplete'));
        
        // Methode 2: Document Event
        document.dispatchEvent(new CustomEvent('typingAnimationComplete'));
        
        // Methode 3: Direkter Aufruf an Navigation
        const navElements = document.querySelectorAll('.navigation-container, .nav-menu');
        navElements.forEach(el => {
          el.dispatchEvent(new CustomEvent('startAnimation'));
        });
        
        // Methode 4: Direkte Funktions-Aufruf
        if ((window as any).startNavigationAnimation) {
          console.log('🚀 Calling startNavigationAnimation directly');
          (window as any).startNavigationAnimation();
        } else {
          console.error('❌ startNavigationAnimation function not found on window');
        }
        
      }, 200);
    }, 500);
    
    dispatch('complete');
  }
</script>

<section class="section-container bg-white flex flex-col md:flex-row justify-between items-center relative overflow-x-hidden">
  <div class="w-full md:w-auto flex justify-start mt-20 md:mt-32 min-h-[350px] scale-75 md:scale-100 origin-top-center md:mx-auto"> <!-- Ausrichtung links statt zentriert -->
    <div class="px-4 md:px-6 ml-0 max-w-[90%] md:max-w-none text-left"> <!-- Konsistente Ausrichtung links -->
    <h1 class="hidden md:block text-5xl font-bold mb-12 hand-drawn-title relative hello-element" class:hello-fade-out={hideOriginalHello}>
      <span class="relative inline-block">
        HELLO
        <div class="absolute -bottom-3 left-0 w-full h-[6px] overflow-hidden">
          <div class="w-full h-full bg-black animate-underline-slide" style="border-radius: 3px;"></div>
        </div>
      </span>
    </h1>
    <div class="text-3xl md:text-4xl mb-4 md:mb-8 leading-relaxed hand-drawn-text pl-0">
      <TypingAnimation 
        text="I AM AN PRODUCT DESIGNER." 
        speed={50} 
        delayStart={500}
        underline={false}
      />
    </div>
    
    <div class="text-3xl md:text-4xl mb-4 md:mb-8 leading-relaxed hand-drawn-text relative">
      <div class="flex flex-wrap items-start md:flex-nowrap md:items-center gap-1 md:gap-4 mx-0 w-full">
        <span class="inline-block">
          <TypingAnimation 
            text="STUDYING"
            speed={50} 
            delayStart={2000}
            underline={false}
          />
        </span>
        <span class="inline-block">
          <TypingAnimation 
            text=" "
            speed={50} 
            delayStart={2150}
            underline={false}
          />
        </span>
        <a href="https://www.hfg-gmuend.de" target="_blank" rel="noopener noreferrer" class="relative inline-block hover:text-blue-500 transition-colors duration-300">
          <TypingAnimation 
            text="@HFG SCHWAEBISCH GMUEND"
            speed={50} 
            delayStart={2300}
            underline={false}
          />
          <div class="absolute -bottom-1 left-0 w-0 h-[3px] bg-blue-500 animate-underline md-only">
          </div>
        </a>
        <span class="inline-block">
          <TypingAnimation 
            text=" "
            speed={50} 
            delayStart={2900}
            underline={false}
          />
        </span>
        <span class="inline-block">
          <TypingAnimation 
            text="&" 
            speed={50} 
            delayStart={3000}
            underline={false}
          />
        </span>
      </div>
    </div>
    
    <div class="text-3xl md:text-4xl leading-relaxed hand-drawn-text pl-0">
      <TypingAnimation 
        text="LOOKING 4 AN INTERNSHIP." 
        speed={50} 
        delayStart={3500}
        underline={false}
        on:complete={handleTypingComplete}
      />
    </div>
  </div>
  
  {#if isTypingComplete}
    <div class="absolute bottom-6 right-4 md:bottom-20 md:right-32 hand-drawn-text font-bold text-xl md:text-3xl animate-fade-in text-right scale-75 md:scale-100 origin-bottom-right">
   
    </div>
  {/if}
</section>

<style>
  :global(.animate-fade-in) {
    animation: fadeIn 0.5s ease-in forwards;
  }

  :global(.animate-bounce-right) {
    animation: bounceRight 1s ease-in-out infinite;
  }

  :global(.animate-underline-slide) {
    transform: translateX(-101%) scaleX(0.5);
    animation: underlineSlide 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    animation-delay: 0.5s;
  }

  .hello-fade-out {
    animation: helloFadeOut 0.5s ease-out forwards;
  }

  @keyframes helloFadeOut {
    0% { 
      opacity: 1;
      transform: scale(1);
    }
    100% { 
      opacity: 0;
      transform: scale(0.85);
      visibility: hidden;
    }
  }
  
  .hello-element {
    transition: all 0.3s ease-out;
  }

  @keyframes bounceRight {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(10px); }
  }

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

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Unterstrich nur auf Desktop (md und größer) anzeigen */
  @media (max-width: 767px) {
    .md-only {
      display: none;
    }
  }
</style>
