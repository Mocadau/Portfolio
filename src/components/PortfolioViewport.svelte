<script lang="ts">
  import { onMount } from "svelte";
  import HelloSection from "./HelloSection.svelte";
  import Project from "./Project.svelte";
  import MoreSection from "./MoreSection.svelte";
  import { horizontalScroll } from "../actions/horizontal-scroll";
  import type { ProjectData } from "../types/portfolio";
  import stickFigureWalking from "../assets/Home/stick-figure-walking.gif";

  export let projects: ProjectData[];
  export let onSectionChange: (section: string) => void;

  let isScrolling = false;
  let currentSection = 'hello';
  let scrollTimeout: number;
  let scrollContainer: HTMLElement;
  let walkingFigurePosition = 0;  // Position in px
  let walkingFigureVisible = false;  // Anfangs nicht sichtbar
  let containerWidth = 0;
  let scrollPosition = 0;
  let lastScrollPosition = 0;
  let isMovingBackward = false;
  let prevSection = 'hello';
  let isMobile = false;  // Neuer Zustand für die Mobilansicht
  let typingAnimationComplete = false;  // Neuer Zustand für die Schreibanimation
  let initialAnimationShown = false;  // Neuer Zustand, der speichert, ob die Startanimation schon mal gezeigt wurde

  function handleTypingComplete() {
    console.log("Typing animation complete");
    typingAnimationComplete = true;
    initialAnimationShown = true; // Markiere, dass die initiale Animation gezeigt wurde
    
    // Speichere im localStorage, dass die initiale Animation bereits gezeigt wurde
    try {
      localStorage.setItem('initialAnimationShown', 'true');
    } catch (e) {
      console.error('Could not save animation state to localStorage:', e);
    }
    
    // Zeige die laufende Figur an, nachdem die Schreibanimation abgeschlossen ist
    walkingFigureVisible = true;
  }

  $: if (typeof window !== 'undefined' && window.portfolioState) {
    window.portfolioState.isScrolling = isScrolling;
  }
  
  $: walkingFigurePosition = calculateWalkingPosition(scrollPosition, containerWidth, currentSection);
  
  // Optimierte Positionierungsmethode für das GIF
  function calculateWalkingPosition(scroll: number, width: number, section: string) {
    // Wenn die initiale Animation bereits gezeigt wurde, zeige die Figur sofort an
    if (initialAnimationShown) {
      walkingFigureVisible = true;
    } 
    // Wenn die Schreibanimation nicht abgeschlossen ist und die initiale Animation noch nie gezeigt wurde, Figur nicht anzeigen
    else if (!typingAnimationComplete) {
      walkingFigureVisible = false;
      return 0;
    }
    
    // Figur immer sichtbar machen
    walkingFigureVisible = true;
    
    // Berechne den aktuellen Seitenindex basierend auf der Scroll-Position
    const currentPageIndex = Math.round(scroll / width);
    
    // Gesamtzahl der Sektionen (Home + Projekte + More)
    const totalSections = projects.length + 2;
    
    // Sicherheitsabstand zum Rand
    const safeMargin = isMobile ? 20 : 40;
    
    // GIF-Größe
    const gifWidth = isMobile ? 120 : 150;
    
    // Startposition (ganz links mit Abstand)
    const startPosition = safeMargin;
    
    // Endposition (rechts mit sicherem Abstand zum Rand)
    // Für mobile Geräte wählen wir eine kleinere Endposition, um Verzerrung zu vermeiden
    const endPosition = isMobile 
      ? width - gifWidth - safeMargin - 20 // zusätzlicher Puffer für mobile Ansicht
      : width - gifWidth - safeMargin;
    
    // Berechne die gleichmäßige Schrittgröße zwischen den Seiten
    const stepSize = (endPosition - startPosition) / (totalSections - 1);
    
    // Linear interpolieren zwischen Start und Endposition basierend auf aktuellem Seitenindex
    let position = startPosition + (currentPageIndex * stepSize);
    
    // Sicherstellen, dass die Position in gültigen Grenzen bleibt
    position = Math.max(safeMargin, Math.min(position, endPosition));
    
    return position;
  }

  onMount(() => {
    // Prüfen, ob wir diese Information im localStorage speichern können, um sie zwischen Sitzungen zu behalten
    const savedAnimationState = localStorage.getItem('initialAnimationShown');
    if (savedAnimationState === 'true') {
      initialAnimationShown = true;
    }
    
    // Ensure More section is reachable
    if (scrollContainer) {
      containerWidth = window.innerWidth;
      isMobile = containerWidth < 768;
      const sections = Array.from(scrollContainer.children);
      sections.forEach((section: Element) => {
        (section as HTMLElement).style.minWidth = '100vw';
      });
    }

    window.addEventListener('resize', () => {
      containerWidth = window.innerWidth;
      isMobile = containerWidth < 768;
    });

    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  });

  function handleScroll(scrollPos: number, containerW: number) {
    if (!scrollContainer) return;
    
    // Ermittle die Scrollrichtung
    isMovingBackward = scrollPos < lastScrollPosition;
    lastScrollPosition = scrollPos;
    
    scrollPosition = scrollPos;
    containerWidth = containerW;
    
    const sectionIndex = Math.round(scrollPosition / containerWidth);
    const maxSections = projects.length + 2;
    
    // Update current section based on scroll position
    prevSection = currentSection;
    let newSection = 'hello';
    if (sectionIndex === 0) {
      newSection = "hello";
      
      // Wenn wir zur Hello-Sektion zurückkehren und die initiale Animation bereits gezeigt wurde,
      // setzen wir typingAnimationComplete auf true, sodass die GIF-Figur sofort angezeigt wird
      if (initialAnimationShown && prevSection !== "hello") {
        typingAnimationComplete = true;
        walkingFigureVisible = true;
      }
    } else if (sectionIndex === maxSections - 1) {
      newSection = "more";
    } else {
      newSection = "works";
    }
    
    currentSection = newSection;
    onSectionChange(newSection);

    // Update scrolling state
    isScrolling = true;
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = window.setTimeout(() => {
      isScrolling = false;
    }, 150);
  }
</script>

<div class="viewport-container fixed inset-0 w-screen h-screen">
  <div 
    bind:this={scrollContainer}
    use:horizontalScroll={{ onScroll: handleScroll, scrollSensitivity: 1.2 }}
    class="scroll-container relative flex h-full"
  >
    <!-- Initial Landing Page -->
    <div class="section-container">
      <HelloSection on:complete={handleTypingComplete} />
    </div>
    
    <!-- Projects -->
    {#each projects as project, index}
      <div class="section-container">
        <Project 
          title={project.title}
          description={project.description}
          field={project.field}
          category={project.category}
          index={index + 1}
          className="w-full h-full"
        />
      </div>
    {/each}

    <!-- More Section -->
    <div class="section-container">
      <MoreSection className="w-full h-full" currentSection={currentSection} />
    </div>
  </div>
  
  <!-- Walking Figure -->
  {#if walkingFigureVisible}
    <div class="walking-figure fade-in-from-left {isMovingBackward ? 'moving-backward' : ''}" 
      style="left: {walkingFigurePosition}px; bottom: {isMobile ? '15px' : '30px'}; 
      transition: left 0.6s linear; position: fixed; z-index: 50; transform-origin: center;">
      <img src={stickFigureWalking} alt="Walking Stick Figure" 
           class="w-auto {isMobile ? 'h-[120px]' : 'h-[150px]'}"
           style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
    </div>
  {/if}
</div>

<style>
  .viewport-container {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .scroll-container {
    display: flex;
    overflow-x: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .scroll-container::-webkit-scrollbar {
    display: none;
  }

  :global(.section-container) {
    min-width: 100vw;
    width: 100vw;
    min-height: 100vh;
    flex-shrink: 0;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    overflow-y: auto;
  }

  :global(.hand-drawn-text) {
    font-family: 'Indie Flower', cursive;
    letter-spacing: 0.02em;
  }

  :global(.hand-drawn-title) {
    font-family: 'Indie Flower', cursive;
    letter-spacing: 0.05em;
    font-weight: bold;
  }
  
  .walking-figure {
    pointer-events: none;
    will-change: transform, opacity;
    transform: translateZ(0);
    -webkit-font-smoothing: antialiased;
    position: relative;
    height: auto;
    width: auto;
  }
  
  .fade-in-from-left {
    animation: fadeInFromLeft 1.2s ease-out forwards;
  }
  
  @keyframes fadeInFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-100px) scaleX(1);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scaleX(1);
    }
  }
  
  /* Separate Transformationsstile für die Richtung */
  .walking-figure img {
    transform: scaleX(1);
    transition: transform 0.3s ease;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
  
  .walking-figure.moving-backward img {
    transform: scaleX(-1);
  }
</style>
