<script lang="ts">
  import { onMount } from "svelte";
  import HelloSection from "./HelloSection.svelte";
  import Project from "./Project.svelte";
  import MoreSection from "./MoreSection.svelte";
  import { horizontalScroll } from "../actions/horizontal-scroll";
  import type { ProjectData } from "../types/portfolio";
  import stickFigureWalking from "../assets/Home/stick-figure-walking.gif";
  import stickFigureStatic from "../assets/Home/stick-figure-walking.png";

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
  
  // Email overlay state
  let showEmailOverlay = false;
  let emailCopied = false;
  let cameraPosition = { x: 0, y: 0 };
  
  // Mouse tracking for walking figure eyes
  let mouseX = 0;
  let mouseY = 0;
  let eyeLeftX = 0;
  let eyeLeftY = 0;
  let eyeRightX = 0;
  let eyeRightY = 0;
  let isWalkingFigureHovered = false; // Neuer Zustand für Hover
  let showHelpBubble = false; // Zustand für Sprechblase
  let isNearWalkingFigure = false; // Zustand für Snapping
  let isMouseInCenterOfWalkingFigure = false; // Zustand für Maus im Zentrum
  let helloSectionRef: any = null; // Referenz zur HelloSection
  let currentBubbleText = ""; // Aktueller Sprechblasen-Text

  // Witzige Sprüche für Projekt-Ansichten
  const projectBubbleTexts = [
    "Oops, you found me!",
    "I'm just walking by...",
    "Hey there, stranger!",
    "Don't mind me!",
    "Just passing through!",
    "Am I in your way?",
    "Caught red-handed!",
    "I wasn't looking!",
    "This is awkward...",
    "Nice projects though!",
    "Keep scrolling!",
    "Nothing to see here!",
    "I'm just a pixel!",
    "Digital nomad life!",
    "Professional walker!",
    "Excuse me, coming through!",
    "I love this portfolio!",
    "Mind if I stick around?",
    "Your cursor tickles!",
    "I'm camera shy!",
    "Stop following me!",
    "This is my route!",
    "I'm the Easter egg!",
    "Boop!",
    "Peek-a-boo!"
  ];

  function getRandomBubbleText(): string {
    return projectBubbleTexts[Math.floor(Math.random() * projectBubbleTexts.length)];
  }

  function handleMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    checkProximityToWalkingFigure(event);
    checkMouseInCenterOfWalkingFigure(event);
    updateEyePositions();
  }

  function handleTouchMove(event: TouchEvent) {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const touchEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY
      };
      
      mouseX = touch.clientX;
      mouseY = touch.clientY;
      checkProximityToWalkingFigure(touchEvent);
      checkMouseInCenterOfWalkingFigure(touchEvent);
      updateEyePositions();
    }
  }

  function checkMouseInCenterOfWalkingFigure(event: MouseEvent | {clientX: number, clientY: number}) {
    if (!walkingFigureVisible) return;

    const figureElement = document.querySelector('.walking-figure');
    if (!figureElement) return;

    const rect = figureElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Definiere einen kleinen Bereich um die Mitte (z.B. 30px Radius)
    const centerRadius = isMobile ? 25 : 30;
    const distance = Math.sqrt(
      Math.pow(event.clientX - centerX, 2) + 
      Math.pow(event.clientY - centerY, 2)
    );

    if (distance <= centerRadius && !isMouseInCenterOfWalkingFigure) {
      isMouseInCenterOfWalkingFigure = true;
      isWalkingFigureHovered = true;
      
      // Verschiedene Texte je nach Sektion
      if (currentSection === 'hello') {
        currentBubbleText = "Help me, I'm stuck!";
        showHelpBubble = true;
      } else {
        // Zufälliger witziger Spruch für Projekt-Ansichten
        currentBubbleText = getRandomBubbleText();
        showHelpBubble = true;
      }
    } else if (distance > centerRadius && isMouseInCenterOfWalkingFigure) {
      isMouseInCenterOfWalkingFigure = false;
      isWalkingFigureHovered = false;
      showHelpBubble = false;
      currentBubbleText = "";
    }
  }

  function checkProximityToWalkingFigure(event: MouseEvent | {clientX: number, clientY: number}) {
    if (!walkingFigureVisible) return;

    const figureElement = document.querySelector('.walking-figure');
    if (!figureElement) return;

    const rect = figureElement.getBoundingClientRect();
    const figureCenterX = rect.left + rect.width / 2;
    const figureCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(event.clientX - figureCenterX, 2) + 
      Math.pow(event.clientY - figureCenterY, 2)
    );

    const snapDistance = isMobile ? 80 : 120; // Snapping-Radius
    
    if (distance < snapDistance && !isNearWalkingFigure) {
      isNearWalkingFigure = true;
      // Sanftes "Snapping" des Cursors zur Figur
      if (!isMobile) {
        document.body.style.cursor = 'none';
      }
    } else if (distance >= snapDistance && isNearWalkingFigure) {
      isNearWalkingFigure = false;
      if (!isMobile) {
        document.body.style.cursor = 'auto';
      }
      showHelpBubble = false;
    }
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

  // Email overlay functions
  function handleEmailOverlay() {
    showEmailOverlay = true;
    emailCopied = false;
    
    // Für Mobile: Finde die Kameraposition
    if (isMobile) {
      updateCameraPosition();
    }
    
    // Auto-hide after 5 seconds if not copied
    setTimeout(() => {
      if (showEmailOverlay && !emailCopied) {
        hideEmailOverlay();
      }
    }, 5000);
  }

  function updateCameraPosition() {
    // Suche die Kamera in der MoreSection
    const cameraElement = document.querySelector('.camera-wrapper img[src*="polaroid-camera"]') as HTMLElement;
    if (cameraElement) {
      const rect = cameraElement.getBoundingClientRect();
      cameraPosition = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
  }

  // Export function for external access
  export { handleEmailOverlay };

  function copyEmail() {
    const email = 'maurice.cadau@hfg-gmuend.de';
    navigator.clipboard.writeText(email).then(() => {
      emailCopied = true;
      setTimeout(() => {
        showEmailOverlay = false;
        emailCopied = false;
      }, 1500);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      emailCopied = true;
      setTimeout(() => {
        showEmailOverlay = false;
        emailCopied = false;
      }, 1500);
    });
  }

  function hideEmailOverlay() {
    showEmailOverlay = false;
    emailCopied = false;
  }

  function handleWalkingFigureMouseEnter() {
    // Nur setzen wenn nicht bereits durch Center-Detection aktiv
    if (!isMouseInCenterOfWalkingFigure) {
      // Leere Funktion - wird nur durch Center-Detection gesteuert
    }
  }

  function handleWalkingFigureMouseLeave() {
    // Nur zurücksetzen wenn nicht durch Center-Detection aktiv
    if (!isMouseInCenterOfWalkingFigure) {
      isWalkingFigureHovered = false;
      showHelpBubble = false;
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
    
    // Add touch event listeners for mobile support
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const touchEvent = {
          clientX: touch.clientX,
          clientY: touch.clientY
        };
        
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        checkProximityToWalkingFigure(touchEvent);
        checkMouseInCenterOfWalkingFigure(touchEvent);
        updateEyePositions();
      }
    });

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
      isMobile = containerWidth < 1024; // Walking figure nur ab Desktop-Größe (1024px+)
      const sections = Array.from(scrollContainer.children);
      sections.forEach((section: Element) => {
        (section as HTMLElement).style.minWidth = '100vw';
      });
    }

    window.addEventListener('resize', () => {
      containerWidth = window.innerWidth;
      isMobile = containerWidth < 1024; // Walking figure nur ab Desktop-Größe (1024px+)
      updateEyePositions(); // Recalculate eye positions on resize
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  });

  function handleScroll(scrollPos: number, containerW: number) {
    if (!scrollContainer) return;
    
    // Ermittle die Scrollrichtung
    const scrollDirection = scrollPos < lastScrollPosition ? 'backward' : 'forward';
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
    
    // Walking figure Richtungslogik:
    // 1. Umdrehen wenn rückwärts scrollt
    // 2. Automatisch umgedreht wenn auf "More" Seite
    // 3. Normal ausgerichtet wenn vorwärts scrollt und nicht auf "More" Seite
    if (scrollDirection === 'backward') {
      isMovingBackward = true;
    } else if (newSection === 'more') {
      isMovingBackward = true; // Automatisch umgedreht am Ende
    } else {
      isMovingBackward = false; // Normal ausgerichtet für vorwärts scrollen
    }
    
    if (newSection !== currentSection) {
      currentSection = newSection;
      onSectionChange(newSection);
      
      // Glassmorphism-Effekt nur bei Hello-Sektion
      if (helloSectionRef) {
        if (newSection === 'hello') {
          helloSectionRef.enableCursorEffect();
        } else {
          helloSectionRef.disableCursorEffect();
        }
      }
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
      <HelloSection bind:this={helloSectionRef} on:complete={handleTypingComplete} />
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
  {#if walkingFigureVisible && !isMobile}
    <div class="walking-figure fade-in-from-left {isMovingBackward ? 'moving-backward' : ''}" 
      style="left: {walkingFigurePosition}px; bottom: 70px; 
      transition: left 0.6s linear; position: fixed; z-index: 50; transform-origin: center;"
      on:mouseenter={handleWalkingFigureMouseEnter}
      on:mouseleave={handleWalkingFigureMouseLeave}
      on:touchstart={(event) => {
        if (event.touches.length > 0) {
          const touch = event.touches[0];
          const touchEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY
          };
          checkMouseInCenterOfWalkingFigure(touchEvent);
        }
      }}
      role="img"
      tabindex="0">
      <img src={isWalkingFigureHovered ? stickFigureStatic : stickFigureWalking} alt="Walking Stick Figure" 
           class="w-auto h-[150px]"
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

      <!-- Help Sprechblase für alle Sektionen mit dynamischen Texten -->
      {#if showHelpBubble}
        <div class="help-speech-bubble">
          <div class="speech-bubble-content">
            {currentBubbleText}
          </div>
          <div class="speech-bubble-arrow"></div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Email Overlay above Walking Figure (Desktop) -->
  {#if showEmailOverlay && walkingFigureVisible && !isMobile}
    <div class="email-overlay-backdrop" 
         on:click={hideEmailOverlay}
         on:keydown={(e) => e.key === 'Escape' && hideEmailOverlay()}
         role="button"
         tabindex="-1"
         aria-label="Close email overlay"></div>
    <div class="email-overlay" 
         style="left: {walkingFigurePosition + 15}px; bottom: 230px;">
      <div class="email-container" on:click|stopPropagation>
        <div class="copy-text" class:copied={emailCopied}>
          {emailCopied ? 'Copied!' : 'Copy'}
        </div>
        <div class="email-address" 
             on:click={copyEmail} 
             on:keydown={(e) => e.key === 'Enter' && copyEmail()}
             role="button" 
             tabindex="0">
          maurice.cadau@hfg-gmuend.de
        </div>
        <!-- Arrow pointing to walking figure -->
        <div class="email-arrow"></div>
      </div>
    </div>
  {/if}

  <!-- Email Overlay at Camera Position (Mobile) -->
  {#if showEmailOverlay && isMobile && currentSection === 'more'}
    <div class="email-overlay-backdrop-mobile" 
         on:click={hideEmailOverlay}
         on:keydown={(e) => e.key === 'Escape' && hideEmailOverlay()}
         role="button"
         tabindex="-1"
         aria-label="Close email overlay"></div>
    <div class="email-overlay-mobile" 
         style="left: {cameraPosition.x}px; top: {cameraPosition.y}px;">
      <div class="email-container-mobile" on:click|stopPropagation>
        <div class="email-address-mobile" 
             on:click={copyEmail} 
             on:keydown={(e) => e.key === 'Enter' && copyEmail()}
             role="button" 
             tabindex="0"
             class:copied={emailCopied}>
          {emailCopied ? 'Copied!' : 'maurice.cadau@hfg-gmuend.de'}
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Scroll Hint - only shown when scrolling is disabled and walking figure is visible -->
  {#if !scrollingEnabled && walkingFigureVisible && !isMobile}
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
    overflow-x: auto; /* Ermöglicht horizontales Scrollen auf Mobile */
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
    font-family: var(--font-family) !important;
    letter-spacing: 0.02em;
    font-weight: 700;
  }

  :global(.hand-drawn-title) {
    font-family: var(--font-family) !important;
    letter-spacing: 0.05em;
    font-weight: bold;
  }
  
  .walking-figure {
    pointer-events: auto; /* Enable mouse events for hover */
    will-change: transform, opacity;
    transform: translateZ(0);
    -webkit-font-smoothing: antialiased;
    position: relative;
    height: auto;
    width: auto;
    cursor: pointer;
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
    top: 15%;
    left: 47.5%; /* Zurück zur ursprünglichen Position */
    transform-origin: center;
  }
  
  .right-eye {
    top: 15%;
    left: 52.5%; /* Zurück zur ursprünglichen Position */
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
      top: 12%;
      left: 47.5%; /* Zurück zur ursprünglichen mobilen Position */
    }
    
    .right-eye {
      top: 12%;
      left: 52.5%; /* Zurück zur ursprünglichen mobilen Position */
    }
  }
  
  /* Direction-specific eye adjustments für moving-backward */
  .walking-figure.moving-backward .left-eye {
    left: 48%; /* Ein paar Pixel weiter nach links */
  }
  
  .walking-figure.moving-backward .right-eye {
    left: 42%; /* Ein paar Pixel weiter nach links */
  }
  
  /* Mobile moving-backward adjustments */
  @media (max-width: 768px) {
    .walking-figure.moving-backward .left-eye {
      left: 48%; /* Ein paar Pixel weiter nach links für mobile */
    }
    
    .walking-figure.moving-backward .right-eye {
      left: 42%; /* Ein paar Pixel weiter nach links für mobile */
    }
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

  /* Email Overlay Styles */
  .email-overlay-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 59;
    background: transparent;
    cursor: pointer;
  }

  .email-overlay {
    position: fixed;
    z-index: 80;
    pointer-events: auto;
    animation: fadeInUp 0.3s ease-out forwards;
  }

  .email-container {
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid #000;
    border-radius: 8px;
    padding: 12px 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    text-align: center;
    min-width: 200px;
  }

  .copy-text {
    font-family: var(--font-family);
    font-size: 12px;
    font-weight: 600;
    color: #666;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
  }

  .copy-text.copied {
    color: #10b981;
  }

  .email-address {
    font-family: var(--font-family);
    font-size: 14px;
    font-weight: 500;
    color: #000;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
    word-break: break-all;
  }

  .email-address:hover {
    background: rgba(0, 0, 0, 0.05);
    transform: scale(1.02);
  }

  .email-arrow {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(255, 255, 255, 0.95);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  @media (max-width: 768px) {
    .email-container {
      padding: 8px 12px;
      min-width: 180px;
    }
    
    .copy-text {
      font-size: 10px;
    }
    
    .email-address {
      font-size: 12px;
    }
  }

  /* Mobile Email Overlay Styles */
  .email-overlay-backdrop-mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 89;
    background: transparent;
    cursor: pointer;
  }

  .email-overlay-mobile {
    position: fixed;
    left: calc(50% + 70px); /* Rechts von der Kamera */
    top: 15%; /* Höhe der Kamera */
    z-index: 90;
    pointer-events: auto;
    transform: translateY(-50%);
    animation: fadeInScale 0.3s ease-out forwards;
  }

  .email-container-mobile {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 6px 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    text-align: center;
    min-width: auto;
    max-width: auto;
    white-space: nowrap;
  }

  .email-address-mobile {
    font-family: var(--font-family);
    font-size: 11px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
    line-height: 1.2;
    display: block;
  }

  .email-address-mobile:hover {
    background: rgba(0, 0, 0, 0.05);
    transform: scale(1.05);
  }

  .email-address-mobile.copied {
    background: #10b981;
    color: white;
    transform: scale(1.08);
  }

  /* Anpassungen für verschiedene mobile Bildschirmgrößen */
  @media (max-width: 480px) {
    .email-overlay-mobile {
      left: calc(50% + 50px); /* Näher zur Kamera auf kleinen Bildschirmen */
    }
    
    .email-address-mobile {
      font-size: 10px;
    }
  }

  @media (max-width: 360px) {
    .email-overlay-mobile {
      left: calc(50% + 40px); /* Noch näher auf sehr kleinen Bildschirmen */
    }
    
    .email-address-mobile {
      font-size: 9px;
    }
  }

  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @media (max-width: 480px) {
    .email-container-mobile {
      padding: 14px 18px;
      min-width: 240px;
      max-width: 85vw;
    }
    
    .email-address-mobile {
      font-size: 14px;
      padding: 6px 10px;
    }
  }

  /* Help Speech Bubble */
  .help-speech-bubble {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 15px;
    z-index: 60;
    animation: bounceIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .speech-bubble-content {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 18px;
    padding: 8px 16px;
    font-family: var(--font-family);
    font-size: 14px;
    font-weight: 600;
    color: #333;
    white-space: nowrap;
    box-shadow: 
      0 6px 20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    text-align: center;
    min-width: 120px;
  }

  .speech-bubble-arrow {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(255, 255, 255, 0.95);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: translateX(-50%) scale(0.3) translateY(20px);
    }
    50% {
      opacity: 1;
      transform: translateX(-50%) scale(1.05) translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) scale(1) translateY(0);
    }
  }

  /* Mobile Responsive für Speech Bubble */
  @media (max-width: 768px) {
    .speech-bubble-content {
      font-size: 12px;
      padding: 6px 12px;
      min-width: 100px;
    }
  }

  /* Mobile Scroll Optimierungen */
  @media (max-width: 1024px) {
    .scroll-container {
      overflow-x: auto;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      /* Verbessert das Touch-Scrolling auf iOS */
      touch-action: pan-x;
    }
    
    .viewport-container {
      overflow-x: hidden; /* Verhindert doppeltes Scrollen */
    }
  }
</style>
