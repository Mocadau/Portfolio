<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import TypingAnimation from "./TypingAnimation.svelte";
  const dispatch = createEventDispatcher();
  
  let helloComplete = false;
  let showRestContent = false;
  let isTypingComplete = false;
  let skipAnimation = false;
  
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
        // Dispatch complete immediately for skip case
        setTimeout(() => {
          dispatch('complete');
        }, 100);
      }
    } catch (e) {
      console.error('Could not read from sessionStorage:', e);
    }
  });
</script>

<section class="section-container bg-white flex flex-col md:flex-row justify-between items-center relative overflow-x-hidden">
  <div class="w-full md:w-auto flex justify-start mt-20 md:mt-32 min-h-[350px] scale-75 md:scale-100 origin-top-center md:mx-auto">
    <div class="px-4 md:px-6 ml-0 max-w-[90%] md:max-w-none text-left">
      
      <!-- HELLO als getippter Text oder statischer Text -->
      <h1 class="text-5xl font-bold mb-12 hand-drawn-title relative">
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
        <div class="text-3xl md:text-4xl mb-4 md:mb-8 leading-relaxed hand-drawn-text pl-0">
          {#if skipAnimation}
            I AM AN PRODUCT DESIGNER.
          {:else}
            <TypingAnimation 
              text="I AM AN PRODUCT DESIGNER." 
              speed={50} 
              delayStart={0}
              underline={false}
            />
          {/if}
        </div>
        
        <div class="text-3xl md:text-4xl mb-4 md:mb-8 leading-relaxed hand-drawn-text relative">
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
        
        <div class="text-3xl md:text-4xl leading-relaxed hand-drawn-text pl-0">
          {#if skipAnimation}
            LOOKING 4 AN INTERNSHIP.
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
</style>
