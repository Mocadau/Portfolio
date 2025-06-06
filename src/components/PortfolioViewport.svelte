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
  export let onTypingComplete: () => void;

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
  let hasVisitedBefore = false;  // Prüft, ob der Nutzer schon mal da war
  let scrollingEnabled = false;  // Steuerung der Scroll-Funktionalität
  
  // Mouse tracking for walking figure eyes
  let mouseX = 0;
  let mouseY = 0;
  let eyeLeftX = 0;
  let eyeLeftY = 0;
  let eyeRightX = 0;
  let eyeRightY = 0;

  function handleMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    updateEyePositions();
  }

  function updateEyePositions() {
    if (!walkingFigureVisible) return;

    // Calculate walking figure center position
    const figureElement = document.querySelector('.walking-figure');
    if (!figureElement) return;

    const rect = figureElement.getBoundingClientRect();
    const figureCenterX = rect.left + rect.width / 2;
    const figureCenterY = rect.top + rect.height / 2;

    // Eye positions relative to figure (adjust these values based on your GIF)
    const eyeOffsetFromCenter = isMobile ? 3.5 : 6; // Distance between eyes (balanced positioning)
    const eyeYOffset = isMobile ? -20 : -32; // Height adjustment for eyes position (slightly higher)

    const leftEyeCenterX = figureCenterX - eyeOffsetFromCenter;
    const rightEyeCenterX = figureCenterX + eyeOffsetFromCenter;
    const eyeCenterY = figureCenterY + eyeYOffset;

    // Calculate maximum eyeball movement radius (smaller radius for more realistic movement)
    const maxEyeballMovement = isMobile ? 2 : 3;

    // Calculate eyeball positions for left eye
    const leftDeltaX = mouseX - leftEyeCenterX;
    const leftDeltaY = mouseY - eyeCenterY;
    const leftDistance = Math.sqrt(leftDeltaX * leftDeltaX + leftDeltaY * leftDeltaY);
    
    if (leftDistance > 0) {
      const leftLimitedDistance = Math.min(leftDistance, maxEyeballMovement);
      eyeLeftX = (leftDeltaX / leftDistance) * leftLimitedDistance;
      eyeLeftY = (leftDeltaY / leftDistance) * leftLimitedDistance;
    }

    // Calculate eyeball positions for right eye
    const rightDeltaX = mouseX - rightEyeCenterX;
    const rightDeltaY = mouseY - eyeCenterY;
    const rightDistance = Math.sqrt(rightDeltaX * rightDeltaX + rightDeltaY * rightDeltaY);
    
    if (rightDistance > 0) {
      const rightLimitedDistance = Math.min(rightDistance, maxEyeballMovement);
      eyeRightX = (rightDeltaX / rightDistance) * rightLimitedDistance;
      eyeRightY = (rightDeltaY / rightDistance) * rightLimitedDistance;
    }
  }

  function handleTypingComplete() {
    typingAnimationComplete = true;
    
    // Mark that animation has been seen in this session
    try {
      sessionStorage.setItem('hasSeenAnimation', 'true');
    } catch (e) {
      console.error('Could not save to sessionStorage:', e);
    }
    
    // Informiere die Parent-Komponente über das Ende der Typing-Animation
    onTypingComplete();
  }

  $: if (typeof window !== 'undefined' && window.portfolioState) {
    window.portfolioState.isScrolling = isScrolling;
  }
  
  $: walkingFigurePosition = calculateWalkingPosition(scrollPosition, containerWidth, currentSection);
  
  // Separate reactive statement for walking figure visibility
  $: {
    // Show walking figure if typing is complete - regardless of section
    if (typingAnimationComplete) {
      walkingFigureVisible = true;
    } else {
      walkingFigureVisible = false;
    }
  }
  
  // Reactive statement for scrolling enablement
  // Enable scrolling after typing animation is complete
  $: {
    if (typingAnimationComplete && !scrollingEnabled) {
      scrollingEnabled = true;
    }
  }
  
  // Optimierte Positionierungsmethode für das GIF - nur für Position, nicht für Visibility
  function calculateWalkingPosition(scroll: number, width: number, section: string) {
    
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
    // Größerer Puffer für MoreSection, um Verzerrung zu vermeiden
    const additionalMargin = isMobile ? 60 : 100; // Mehr Platz für MoreSection
    const endPosition = isMobile 
      ? width - gifWidth - safeMargin - additionalMargin // Größerer Puffer für mobile Ansicht
      : width - gifWidth - safeMargin - additionalMargin;
    
    // Berechne die gleichmäßige Schrittgröße zwischen den Seiten
    const stepSize = (endPosition - startPosition) / (totalSections - 1);
    
    // Linear interpolieren zwischen Start und Endposition basierend auf aktuellem Seitenindex
    let position = startPosition + (currentPageIndex * stepSize);
    
    // Sicherstellen, dass die Position in gültigen Grenzen bleibt
    position = Math.max(safeMargin, Math.min(position, endPosition));
    
    return position;
  }

  onMount(() => {
    // Add mouse move listener for eye tracking
    window.addEventListener('mousemove', handleMouseMove);

    // Check if animation has been seen in this session
    try {
      hasVisitedBefore = sessionStorage.getItem('hasSeenAnimation') === 'true';
      if (hasVisitedBefore) {
        typingAnimationComplete = true;
        scrollingEnabled = true; // Enable scrolling immediately for within-session navigation
      }
    } catch (e) {
      console.error('Could not read from sessionStorage:', e);
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
      updateEyePositions(); // Recalculate eye positions on resize
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
    } else if (sectionIndex === maxSections - 1) {
      newSection = "more";
    } else {
      newSection = "works";
    }
    
    if (newSection !== currentSection) {
      currentSection = newSection;
      onSectionChange(newSection);
    }

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
    use:horizontalScroll={{ onScroll: handleScroll, scrollSensitivity: 1.2, scrollingEnabled }}
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
      
      <!-- Eyes overlay -->
      <div class="eyes-container">
        <!-- Left Eye -->
        <div class="eye left-eye">
          <div class="eyeball" style="transform: translate({eyeLeftX}px, {eyeLeftY}px);"></div>
        </div>
        
        <!-- Right Eye -->
        <div class="eye right-eye">
          <div class="eyeball" style="transform: translate({eyeRightX}px, {eyeRightY}px);"></div>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Scroll Hint - only shown when scrolling is disabled and walking figure is visible -->
  {#if !scrollingEnabled && walkingFigureVisible}
    <div class="scroll-hint">
      <div class="scroll-hint-text">
        Scroll to explore →
      </div>
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
    font-family: 'Helvetica Neue', sans-serif !important;
    letter-spacing: 0.02em;
    font-weight: 700;
  }

  :global(.hand-drawn-title) {
    font-family: 'Helvetica Neue', sans-serif !important;
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
  
  /* Eyes for the walking figure */
  .eyes-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .eye {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    border: 1px solid #333;
    transition: transform 0.05s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  .eyeball {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #000;
    transition: transform 0.05s ease-out;
    will-change: transform;
  }
  
  .left-eye {
    top: 16%;
    left: 47.5%;
    transform-origin: center;
  }
  
  .right-eye {
    top: 16%;
    left: 52.5%;
    transform-origin: center;
  }
  
  /* Mobile adjustments for eyes */
  @media (max-width: 768px) {
    .eye {
      width: 8px;
      height: 8px;
    }
    
    .eyeball {
      width: 4px;
      height: 4px;
    }
    
    .left-eye {
      top: 13%;
      left: 47.5%;
    }
    
    .right-eye {
      top: 13%;
      left: 52.5%;
    }
  }
  
  /* Direction-specific eye adjustments */
  .walking-figure.moving-backward .left-eye {
    left: 53%;
  }
  
  .walking-figure.moving-backward .right-eye {
    left: 47%;
  }
  
  .scroll-hint {
    position: fixed;
    bottom: 80px;
    right: 40px;
    z-index: 60;
    pointer-events: none;
    animation: fadeInUp 1s ease-out 0.5s forwards;
    opacity: 0;
  }
  
  .scroll-hint-text {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    backdrop-filter: blur(10px);
    animation: pulse 2s infinite;
  }
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    .scroll-hint {
      bottom: 60px;
      right: 20px;
    }
    
    .scroll-hint-text {
      font-size: 12px;
      padding: 6px 12px;
    }
  }
</style>
