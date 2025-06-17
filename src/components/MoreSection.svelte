<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { isFlashing } from '../stores/flash';
  import { selectedPhotoIndex } from '../stores/selectedPolaroid';
  import { isProcessing } from '../stores/photoProcessing';
  import { playCameraSound, initializeCameraAudio } from '../lib/cameraSound';
  import PolaroidCamera from '../assets/polaroid-camera.svg';
  import HeyImage from '../assets/AboutMe.png';
  import AboutMeImage from '../assets/Background.png';
  import WhatDrivesImage from '../assets/WhatDrives.png';
  import BeyondDesignImage from '../assets/BeyondDesign.png';
  import MyApproachImage from '../assets/MyApproach.png';
  import PhilosophyImage from '../assets/Philosophy.png';

  function handleButtonKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  function handlePhotoClick(index: number, event: MouseEvent) {
    event.stopPropagation();
    console.log('Photo clicked:', index, 'Current selected:', $selectedPhotoIndex);
    
    // Immer den Text für das angeklickte Bild anzeigen
    lastClickedPhotoIndex = index;
    
    // Toggle fullscreen: Wenn das gleiche Foto bereits ausgewählt ist, minimiere es
    if ($selectedPhotoIndex === index) {
      $selectedPhotoIndex = -1;
    } else {
      $selectedPhotoIndex = index;
    }
  }

  function closeFullscreen() {
    $selectedPhotoIndex = -1;
    // lastClickedPhotoIndex bleibt bestehen für persistenten Text
  }

  function handleContainerClick() {
    if ($selectedPhotoIndex !== -1) {
      closeFullscreen();
    }
  }

  function handlePhotoKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      $selectedPhotoIndex = $selectedPhotoIndex === index ? -1 : index;
    }
  }

  function handleSectionClick() {
    if ($selectedPhotoIndex !== -1) {
      $selectedPhotoIndex = -1;
    }
  }

  function handleSectionKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && $selectedPhotoIndex !== -1) {
      $selectedPhotoIndex = -1;
    }
  }

  $: {
    console.log('Selected photo index changed:', $selectedPhotoIndex);
  }

  export let className = '';
  export let currentSection = 'hello';
  
  let currentPhotoIndex = 0;
  let canTakePhoto = false;
  let isComplete = false;
  let hasClickedOnce = false; // Verfolgt ob bereits einmal geklickt wurde
  let photos: HTMLImageElement[] = [];
  let isLoading = true;
  let loadError = '';

  const images = [
    { 
      src: HeyImage, 
      alt: 'About Me',
      title: 'About Me',
      description: 'Hi, I\'m Maurice – a 23-year-old interaction designer from Aalen, Germany, with a passion for pushing creative boundaries and exploring new possibilities.'
    },
    { 
      src: AboutMeImage, 
      alt: 'Background',
      title: 'Background',
      description: 'After completing my banking apprenticeship and earning my university entrance qualification, I\'m currently in my 4th semester studying Interaction Design at HfG Schwäbisch Gmünd. My journey from finance to design reflects my curiosity and willingness to embrace new challenges.'
    },
    { 
      src: WhatDrivesImage, 
      alt: 'What Drives Me',
      title: 'What Drives Me',
      description: 'I\'m deeply passionate about invention design, AI, strategic design, and VR/AR technologies. There\'s something magical about creating solutions that don\'t just solve problems, but reimagine how we interact with the world around us.'
    },
    { 
      src: BeyondDesignImage, 
      alt: 'Beyond Design',
      title: 'Beyond Design',
      description: 'When I\'m not buried in design projects, you\'ll either find me backpacking solo through remote villages on the other side of the globe, or hanging out with friends for spontaneous activities like volleyball, spikeball, or game nights.'
    },
    { 
      src: MyApproachImage,
      alt: 'My Approach',
      title: 'My Approach',
      description: 'I consider myself an idea generator and creative out-of-the-box thinker. My mind constantly buzzes with new concepts, and I love making connections others might miss. New inventions and tools with technical capabilities immediately capture my attention.'
    },
    { 
      src: PhilosophyImage,
      alt: 'Philosophy',
      title: 'Philosophy',
      description: 'I believe the world is a playground of possibilities where every conversation is an opportunity to explore new concepts and challenge the status quo. I see potential where others might see problems, and I approach every challenge with enthusiasm and creativity.'
    }
  ];

  // Aktuelle Beschreibung basierend auf dem letzten aufgenommenen Foto oder gehovertem Bild
  let hoveredPhotoIndex = -1;
  let lastClickedPhotoIndex = -1; // Letztes angeklicktes Foto bleibt persistent
  let droppedPhotos = new Set(); // Verfolgt welche Fotos bereits gefallen sind
  let hoverTimeout: number | null = null;
  
  // Optimierte reactive Beschreibung mit weniger Updates
  $: currentDescription = hoveredPhotoIndex >= 0 ? images[hoveredPhotoIndex] :
                         (lastClickedPhotoIndex >= 0 ? images[lastClickedPhotoIndex] : 
                         (currentPhotoIndex > 0 ? images[currentPhotoIndex - 1] : null));

  // Debounced hover functions
  function handleMouseEnter(index: number) {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    hoveredPhotoIndex = index;
  }

  function handleMouseLeave() {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    hoverTimeout = window.setTimeout(() => {
      hoveredPhotoIndex = -1;
      hoverTimeout = null;
    }, 50); // Kurze Verzögerung um Flickering zu vermeiden
  }

  onMount(() => {
    // Make camera available immediately
    isLoading = false;
    canTakePhoto = true;

    const loadResources = async () => {
      try {
        // Initialize camera audio in background - don't wait
        initializeCameraAudio().catch(error => {
          console.warn('Audio initialization failed, camera will work without sound:', error);
        });

        // Load images in background without blocking camera
        Promise.all(
          images.map(
            (image) =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = () => {
                  console.warn(`Failed to load image: ${image.alt}`);
                  resolve(null); // Don't block on individual image failures
                };
                img.src = image.src;
              })
          )
        ).catch(error => {
          console.warn('Some images failed to load:', error);
        });

      } catch (error) {
        console.error('Failed to initialize resources:', error);
        // Camera remains available even if some resources fail
      }
    };

    // Run in background
    loadResources();
  });

  async function handleClick() {
    if (!canTakePhoto || isComplete) return;
    canTakePhoto = false;
    $isProcessing = true;
    hasClickedOnce = true; // Stoppe die Wobble-Animation nach dem ersten Klick
    
    if (currentPhotoIndex < images.length) {
      // Markiere das neue Foto als gefallen nach der Animation
      setTimeout(() => {
        droppedPhotos.add(currentPhotoIndex);
        droppedPhotos = droppedPhotos; // Trigger reactivity
      }, 1200 + (currentPhotoIndex * 150)); // Animation duration + delay
      
      currentPhotoIndex++;
    }

    // Trigger flash effect
    $isFlashing = true;
    setTimeout(() => {
      $isFlashing = false;
    }, 100);
    
    try {
      // Play camera sound using the unified system
      await playCameraSound();

      // Wait a moment for the flash effect
      await new Promise(resolve => setTimeout(resolve, 200));
      
      if (currentPhotoIndex >= images.length) {
        isComplete = true;
      } else {
        canTakePhoto = true;
      }
    } finally {
      $isProcessing = false;
    }
  }

  onDestroy(() => {
    // Cleanup timeouts
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
  });
</script>


<!-- Fullscreen backdrop - transparent overlay für close on outside click -->
{#if $selectedPhotoIndex !== -1}
  <div 
    class="fullscreen-backdrop"
    on:click|stopPropagation={closeFullscreen}
    on:keydown={e => e.key === 'Escape' && closeFullscreen()}
    role="button"
    tabindex="-1"
  ></div>
{/if}

<section 
  class="py-12 {className} relative overflow-hidden bg-white"
  style="height: 100vh; opacity: {currentSection === 'more' ? 1 : 0}; visibility: {currentSection === 'more' ? 'visible' : 'hidden'}; transition: opacity 0.3s ease-out, visibility 0.3s ease-out; padding-bottom: 4rem;"
>
  <!-- Zwei-Spalten-Layout für alle Bildschirmgrößen -->
  <div class="w-full h-full grid grid-cols-2 gap-3 md:gap-6 lg:gap-8 pr-4 md:pr-6 lg:pr-8 pb-4 md:pb-6 lg:pb-8">
    
    <!-- Linke Spalte: Kamera und Fotos Container -->
    <div 
      class="camera-section relative flex flex-col flex-shrink-0"
      on:click|preventDefault={handleSectionClick}
      on:keydown|preventDefault={handleSectionKeydown}
      role="presentation"
    >
      <!-- Kamera und Fotos in einem Container -->
      <div class="camera-photos-container flex-1 relative">
          {#if isLoading}
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="loading-text hand-drawn-text text-lg">
                Loading camera...
              </div>
            </div>
          {:else if loadError}
            <div class="absolute inset-0 flex items-center justify-center">
              <p class="text-red-500 hand-drawn-text text-lg">
                Oops! Something went wrong: {loadError}
              </p>
            </div>
          {/if}

          <div class="w-full h-full pointer-events-none relative">
            <!-- Kamera am oberen Bereich -->
            <div class="camera-wrapper">
              <div class="camera-container flex flex-col items-center" 
                   class:processing={$isProcessing}
                   class:camera-disabled={isComplete}>
                <!-- Klickbarer Kamera-Button -->
                <button
                  type="button"
                  class="camera-button relative"
                  class:cursor-pointer={!isComplete}
                  class:cursor-not-allowed={isComplete}
                  class:pointer-events-none={!canTakePhoto && !isComplete || currentSection !== 'more' || $isProcessing}
                  on:click={handleClick}
                  on:keydown|preventDefault={handleButtonKeydown}
                  disabled={isComplete || !canTakePhoto || currentSection !== 'more'}
                >
                  <img 
                    src={PolaroidCamera} 
                    alt="Polaroid Camera" 
                    class="camera-image transition-transform duration-300"
                    class:camera-disabled={isComplete}
                    class:no-wobble={hasClickedOnce}
                    style="width: clamp(85px, 15.3vw, 136px);"
                  />
                </button>
              </div>
            </div>

            <!-- Fotos direkt unter der Kamera -->
            <div class="photos-container overflow-visible pointer-events-all" class:has-selection={$selectedPhotoIndex !== -1}>
              <div class="photos-grid overflow-visible">
                {#each images as image, i}
                  {#if i < currentPhotoIndex}
                    <div 
                      class="photo-position"
                      class:selected={$selectedPhotoIndex === i}
                      class:blur-others={$selectedPhotoIndex !== -1 && $selectedPhotoIndex !== i}
                      style="z-index: {images.length - i};"
                      role="button"
                      tabindex="0"
                      on:click|stopPropagation={(event) => handlePhotoClick(i, event)}
                      on:keydown|stopPropagation={event => handlePhotoKeydown(event, i)}
                      on:mouseenter={() => handleMouseEnter(i)}
                      on:mouseleave={handleMouseLeave}
                    >
                      <div 
                        class="photo-container"
                        class:dropped={droppedPhotos.has(i)}
                        style="--delay: {i * 0.15}s; --index: {i};"
                        class:selected={$selectedPhotoIndex === i}
                      >
                        <div class="polaroid-frame">
                          <div class="photo-wrapper">
                            <img 
                              src={image.src} 
                              alt={image.alt}
                              class="w-full h-full"
                              loading="lazy"
                              bind:this={photos[i]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  {/if}
                {/each}
              </div>
            </div>
          </div>
      </div>
    </div>

    <!-- Rechte Spalte: Dynamischer Text - auf Kamera-Höhe ausgerichtet -->
    <div class="text-section flex flex-col justify-start pl-0 sm:pl-4 md:pl-4 lg:pl-8 xl:pl-12 pr-4 sm:pr-8 md:pr-10 lg:pr-12 xl:pr-16">
      <div class="text-content-wrapper">
        {#if currentDescription}
          <div class="text-content text-left">
            <h2 class="hand-drawn-text text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl mb-6 sm:mb-7 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-10 text-black font-bold leading-tight">
              {currentDescription.title}
            </h2>
            <p class="text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-700 leading-relaxed font-light max-w-none tracking-wide mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20">
              {currentDescription.description}
            </p>
          </div>
        {/if}
      </div>
    </div>

  </div>
</section>


<style>
  .loading-text {
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }

  /* Smooth text transitions */
  .text-content-wrapper {
    will-change: contents; /* Optimierung für häufige Updates */
    transform: translateZ(0); /* Hardware-Beschleunigung aktivieren */
  }

  .text-content {
    transition: opacity 0.2s ease-out, transform 0.2s ease-out;
    will-change: opacity, transform;
  }

  .text-content h2 {
    transition: opacity 0.15s ease-out;
    will-change: opacity;
  }

  .text-content p {
    transition: opacity 0.15s ease-out;
    will-change: opacity;
  }

  /* Camera section layout */
  .camera-section {
    height: 100%;
    padding: 0.5rem;
  }

  @media (min-width: 1024px) {
    .camera-section {
      padding: 1rem;
    }
  }

  /* Camera-Photos Container */
  .camera-photos-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* Text section styling - aligned to first photo position */
  .text-section {
    height: 100%;
    display: flex;
    align-items: flex-start;
    padding: 0.5rem;
    padding-top: calc(1rem + 110px); /* Align with first photo position */
    text-align: left;
  }

  @media (min-width: 1024px) {
    .text-section {
      padding: 1rem;
      padding-top: calc(1rem + 110px);
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }

  @media (max-width: 1024px) {
    .text-section {
      padding-top: calc(1rem + 100px);
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    .text-section {
      padding-top: calc(1rem + 120px); /* Weiter nach unten */
      padding-left: 0rem !important; /* Ganz nach links */
      padding-right: 3rem !important; /* Container breiter nach rechts */
      padding-bottom: 3rem; /* Mehr Abstand nach unten */
      width: calc(100% + 1rem); /* Container breiter machen */
      margin-left: -0.5rem; /* Leicht nach links verschieben */
    }
  }

  @media (max-width: 480px) {
    .text-section {
      padding: 0rem !important; /* Ganz nach links */
      padding-top: calc(0.75rem + 160px) !important; /* Noch weiter nach unten */
      padding-left: 0rem !important;
      padding-right: 2.5rem !important; /* Container noch breiter nach rechts */
      padding-bottom: 2.5rem !important; /* Mehr Abstand nach unten */
      width: calc(100% + 1.5rem); /* Container noch breiter machen */
      margin-left: -0.75rem; /* Weiter nach links verschieben */
    }
  }

  .text-content-wrapper {
    width: 100%;
    margin-top: 0;
    padding-bottom: 1rem; /* Weniger Abstand nach unten */
  }

  .text-content {
    width: 100%;
    max-width: none;
    margin-right: 1rem; /* Zusätzlicher Abstand nach rechts */
  }

  /* Responsive Wrapper-Anpassungen */
  @media (max-width: 768px) {
    .text-content-wrapper {
      padding-bottom: 1.5rem;
      padding-left: 0rem !important; /* Ganz nach links */
    }
    
    .text-content {
      margin-right: 0.75rem;
      margin-left: 0rem !important; /* Ganz nach links */
    }
  }

  @media (max-width: 480px) {
    .text-content-wrapper {
      padding-bottom: 1rem; /* Noch weniger Abstand */
      padding-left: 0rem !important; /* Ganz nach links */
    }
    
    .text-content {
      margin-right: 0.5rem;
      margin-left: 0rem !important; /* Ganz nach links */
    }
  }

  @media (max-width: 768px) {
    .text-content h2 {
      font-size: 1.75rem !important;
      margin-bottom: 1rem !important;
      line-height: 1.1 !important;
      margin-left: 0rem !important; /* Ganz nach links */
      padding-left: 0rem !important; /* Ganz nach links */
    }
    
    .text-content p {
      font-size: 1rem !important;
      line-height: 1.4 !important;
      margin-bottom: 1rem !important; /* Weniger Abstand nach unten */
      padding-right: 1rem !important; /* Mehr Abstand nach rechts */
      margin-left: 0rem !important; /* Ganz nach links */
      padding-left: 0rem !important; /* Ganz nach links */
    }
  }

  @media (max-width: 480px) {
    .text-content h2 {
      font-size: 1.5rem !important; /* Noch kleiner für sehr kleine Bildschirme */
      margin-bottom: 0.75rem !important;
      line-height: 1.05 !important;
      margin-left: 0rem !important; /* Ganz nach links */
      padding-left: 0rem !important; /* Ganz nach links */
    }
    
    .text-content p {
      font-size: 1rem !important;
      line-height: 1.35 !important;
      margin-bottom: 0.75rem !important; /* Weniger Abstand nach unten */
      padding-right: 1.25rem !important; /* Noch mehr Abstand nach rechts */
      margin-left: 0rem !important; /* Ganz nach links */
      padding-left: 0rem !important; /* Ganz nach links */
    }
  }

  .camera-wrapper {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    z-index: 5; /* Lower than photos */
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    .camera-wrapper {
      margin-top: 0.75rem;
    }
    
    img[src*="polaroid-camera"] {
      width: clamp(80px, 16vw, 120px) !important;
    }
  }

  @media (max-width: 480px) {
    .camera-wrapper {
      top: 1%;
      margin-top: 0.5rem;
    }
    
    img[src*="polaroid-camera"] {
      width: clamp(70px, 14vw, 100px) !important;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .camera-wrapper {
      top: 4%;
    }
    
    img[src*="polaroid-camera"] {
      width: clamp(100px, 12vw, 140px) !important;
    }
  }

  .camera-container {
    transform: scale(0.98);
  }

  /* Kamera-Button Styling */
  .camera-button {
    background: transparent;
    border: none;
    padding: 0;
    outline: none !important;
    pointer-events: auto;
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .camera-button:focus {
    outline: none !important;
    box-shadow: none !important;
  }

  .camera-button:focus-visible {
    outline: none !important;
    box-shadow: none !important;
  }

  .camera-button:hover:not(:disabled) {
    transform: scale(1.02);
  }

  /* Stärkere Wackel-Animation für die Kamera - wiederholt bis zum ersten Klick */
  .camera-image:not(.camera-disabled):not(.no-wobble) {
    animation: gentle-wobble 2s ease-in-out infinite;
  }

  .camera-container:not(.camera-disabled):hover {
    animation: shake 0.8s cubic-bezier(.36,.07,.19,.97) infinite;
  }

  .camera-container:not(.camera-disabled):hover .camera-image {
    animation: none; /* Stoppe die sanfte Animation beim Hover */
  }

  .camera-container.processing:not(.camera-disabled) {
    animation: shake 0.8s cubic-bezier(.36,.07,.19,.97) infinite;
  }

  /* Stoppe alle Animationen wenn die Kamera deaktiviert ist (isComplete) */
  .camera-container.camera-disabled,
  .camera-container.camera-disabled:hover,
  .camera-container.camera-disabled.processing {
    animation: none !important;
  }

  .camera-container.camera-disabled .camera-image {
    animation: none !important;
  }

  @keyframes gentle-wobble {
    0%, 100% {
      transform: scale(0.98) rotate(0deg);
    }
    20% {
      transform: scale(0.98) rotate(-2deg);
    }
    40% {
      transform: scale(0.98) rotate(2deg);
    }
    60% {
      transform: scale(0.98) rotate(-1.5deg);
    }
    80% {
      transform: scale(0.98) rotate(1.5deg);
    }
  }

  @keyframes shake {
    10%, 90% {
      transform: scale(0.98) translate3d(-1px, 0, 0);
    }
    20%, 80% {
      transform: scale(0.98) translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
      transform: scale(0.98) translate3d(-2px, 0, 0);
    }
    40%, 60% {
      transform: scale(0.98) translate3d(2px, 0, 0);
    }
  }

  .camera-disabled {
    opacity: 0.5;
    filter: grayscale(100%);
    transform: scale(0.98);
  }

  /* Verbesserte Polaroid-Animationen */
  .polaroid-frame {
    all: unset;
    display: block;
    background: #ffffff;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform-origin: center top;
    position: relative;
    width: 100%;
    transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
    cursor: pointer;
    opacity: 1;
    z-index: 1;
    border: none;
    box-sizing: border-box;
    will-change: transform;
  }

  @media (max-width: 768px) {
    .polaroid-frame {
      padding: 14px;
      box-shadow: 0 5px 14px rgba(0, 0, 0, 0.18);
    }
  }

  @media (max-width: 480px) {
    .polaroid-frame {
      padding: 13px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
    }
  }

  .photo-position:not(.selected) {
    transition: all 0.3s ease;
  }

  .polaroid-frame:hover {
    transform: scale(1.02) rotate(-1deg);
  }

  .photos-container {
    position: absolute;
    left: 50%;
    top: calc(1rem + 120px); /* Deutlich mehr Abstand zur Kamera */
    transform: translateX(-50%);
    width: min(450px, 85vw) !important;
    height: 75vh !important;
    overflow: visible;
    pointer-events: all;
    background: transparent;
    z-index: 15; /* Ensure photos are above camera */
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (max-width: 1024px) {
    .photos-container {
      left: 50%;
      top: calc(1rem + 110px); /* Mehr Abstand zur Kamera auf Tablets */
      width: min(400px, 80vw) !important;
      height: 70vh !important;
      margin: 0 auto;
      box-sizing: border-box;
    }
  }

  @media (max-width: 768px) {
    .photos-container {
      left: 50%;
      top: calc(0.75rem + 100px);
      width: min(350px, 78vw) !important;
      height: 68vh !important;
      margin: 0 auto;
      box-sizing: border-box;
    }
  }

  @media (max-width: 480px) {
    .photos-container {
      left: 50%;
      top: calc(0.75rem + 110px);
      width: min(320px, 75vw) !important;
      height: 65vh !important;
      margin: 0 auto;
      box-sizing: border-box;
    }
  }

  .photos-grid {
    width: 100%;
  }

  .photo-position {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%) translateY(calc(var(--index, 0) * 45px));
    transform-style: preserve-3d;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: all;
    padding: 16px;
    margin: -16px;
    background: transparent;
    isolation: isolate;
    will-change: transform;
  }

  @media (max-width: 768px) {
    .photo-position {
      transform: translateX(-50%) translateY(calc(var(--index, 0) * 55px));
      padding: 18px;
      margin: -18px;
    }
  }

  @media (max-width: 480px) {
    .photo-position {
      transform: translateX(-50%) translateY(calc(var(--index, 0) * 50px));
      padding: 16px;
      margin: -16px;
    }
  }

  .photo-position.selected {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    z-index: 9999 !important;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .photo-position.selected {
      position: fixed;
      left: 10px; /* Weiter nach links verschoben */
      top: auto;
      right: auto;
      bottom: 60px; /* Weiter nach unten verschoben */
      transform: none;
      width: auto;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      z-index: 9999 !important;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
  }



  .photo-container {
    width: min(80px, calc(30vw - 1rem));
    position: relative;
    transform-origin: center;
    animation: polaroid-slide 1.2s ease-out forwards;
    animation-delay: var(--delay);
    animation-fill-mode: forwards;
    transition: transform 0.3s ease;
    pointer-events: all;
    opacity: 1;
    background: white;
    box-sizing: border-box;
  }

  .photo-container .polaroid-frame {
    width: 100% !important;
    height: 100% !important;
    padding: 8px !important;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .photo-container .photo-wrapper {
    flex: 1 !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
  }

  @media (min-width: 640px) {
    .photo-container {
      width: min(120px, calc(40vw - 1.5rem)) !important;
    }
  }

  @media (min-width: 1024px) {
    .photo-container {
      width: min(140px, calc(45vw - 2rem)) !important;
    }
  }

  @media (max-width: 768px) {
    .photo-container {
      width: min(110px, calc(38vw - 1rem)) !important;
    }
  }

  @media (max-width: 480px) {
    .photo-container {
      width: min(100px, calc(35vw - 0.5rem)) !important;
    }
  }

  /* Verhindere Animation nach dem ersten Drop */
  .photo-container.dropped {
    animation: none;
    transform: translateY(calc(var(--index) * 45px)) rotate(0deg) scale(1);
  }

  @media (max-width: 768px) {
    .photo-container.dropped {
      transform: translateY(calc(var(--index) * 55px)) rotate(0deg) scale(1);
    }
  }

  @media (max-width: 480px) {
    .photo-container.dropped {
      transform: translateY(calc(var(--index) * 50px)) rotate(0deg) scale(1);
    }
  }

  .photo-position.selected .photo-container {
    width: 500px !important;
    height: 600px !important;
    margin: 0;
    transform: translate(150px, 100px) !important; /* Position nach links verschoben */
    animation: moveToNewPosition 0.6s ease-out;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    z-index: 10000;
  }

  /* iPad-spezifische Anpassungen (768px - 1024px) */
  @media (min-width: 769px) and (max-width: 1024px) {
    .photo-position.selected .photo-container {
      width: 380px !important; /* Kleiner für iPad */
      height: 460px !important; /* Proportional kleiner */
      transform: translate(120px, 30px) !important; /* Noch weiter nach oben verschoben */
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
    }
  }

  .photo-position.selected .photo-wrapper {
    width: 100% !important;
    height: 100% !important;
    aspect-ratio: auto !important;
  }

  .photo-position.selected .photo-wrapper img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    object-position: center !important;
  }

  @media (max-width: 768px) {
    .photo-position.selected .photo-container {
      width: 280px !important;
      height: 340px !important;
      transform: translate(140px, 80px) !important; /* Nach links und unten verschoben */
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 480px) {
    .photo-position.selected .photo-container {
      width: 220px !important; /* Vergrößert für sehr kleine Bildschirme */
      height: 260px !important;
      transform: translate(100px, 60px) !important; /* Nach links und unten verschoben für kleine Bildschirme */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }

  /* Blur-Effekte nur wenn ein Bild ausgewählt ist */
  @media (max-width: 768px) {
    .photo-position.blur-others {
      filter: blur(3px);
      opacity: 0.6;
      transition: all 0.3s ease;
    }
  }

  @media (min-width: 769px) {
    .photo-position.blur-others {
      filter: blur(4px);
      opacity: 0.5;
      transition: all 0.3s ease;
    }
  }

  .photo-container.selected {
    margin: 0;
  }

  .photo-container.selected .polaroid-frame {
    background: white;
    padding: 16px;
    box-shadow: none;
    border-radius: 8px;
  }

  .photo-container.subsequent {
    transform: translateY(calc(var(--index) * 180px + 400px)) !important;
  }

  .caption-container {
    text-align: center;
    margin-top: 6px;
    color: rgba(0, 0, 0, 0.8);
    font-family: var(--font-family) !important;
    font-size: 1rem;
    font-weight: 300;
  }

  .photo-wrapper {
    width: 100%;
    aspect-ratio: 1/1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
  }

  .photo-wrapper img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    max-width: none !important;
    max-height: none !important;
    transform: scale(1) !important;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes moveToNewPosition {
    0% {
      transform: translateY(calc(var(--index) * 45px)) scale(1);
    }
    100% {
      transform: translate(150px, 100px) scale(1);
    }
  }

  @media (max-width: 768px) {
    @keyframes moveToNewPosition {
      0% {
        transform: translateY(calc(var(--index) * 55px)) scale(1);
      }
      100% {
        transform: translate(160px, 60px) scale(1);
      }
    }
  }

  @media (max-width: 480px) {
    @keyframes moveToNewPosition {
      0% {
        transform: translateY(calc(var(--index) * 50px)) scale(1);
      }
      100% {
        transform: translate(120px, 40px) scale(1);
      }
    }
  }
  
  @keyframes polaroid-slide {
    0% {
      transform: translateY(-50px) scale(0.9);
      opacity: 0;
    }
    30% {
      transform: translateY(-20px) scale(0.95);
      opacity: 0.6;
    }
    60% {
      transform: translateY(calc(var(--index) * 45px - 5px)) scale(1.02);
      opacity: 0.9;
    }
    100% {
      transform: translateY(calc(var(--index) * 45px)) scale(1);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    @keyframes polaroid-slide {
      0% {
        transform: translateY(-60px) scale(0.9);
        opacity: 0;
      }
      30% {
        transform: translateY(-25px) scale(0.95);
        opacity: 0.6;
      }
      60% {
        transform: translateY(calc(var(--index) * 55px - 6px)) scale(1.02);
        opacity: 0.9;
      }
      100% {
        transform: translateY(calc(var(--index) * 55px)) scale(1);
        opacity: 1;
      }
    }
  }

  @media (max-width: 480px) {
    @keyframes polaroid-slide {
      0% {
        transform: translateY(-55px) scale(0.9);
        opacity: 0;
      }
      30% {
        transform: translateY(-22px) scale(0.95);
        opacity: 0.6;
      }
      60% {
        transform: translateY(calc(var(--index) * 50px - 5px)) scale(1.02);
        opacity: 0.9;
      }
      100% {
        transform: translateY(calc(var(--index) * 50px)) scale(1);
        opacity: 1;
      }
    }
  }

  /* Text-Sektion Styles */
  .text-section {
    background: transparent;
    position: relative;
    min-height: auto;
  }

  .camera-section {
    position: relative;
    height: 100vh;
  }

  @media (min-width: 1025px) {
    .camera-section {
      height: 100% !important;
    }
  }

  .text-content {
    transition: all 0.5s ease-in-out;
    animation: fadeIn 0.8s ease-out;
  }

  .text-content h2 {
    font-family: var(--font-family) !important;
    font-weight: 300;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  .text-content p {
    font-family: var(--font-family) !important;
    font-weight: 300;
    line-height: 1.6;
  }

  @media (max-width: 1024px) {
    .camera-section {
      height: 55vh !important;
      max-height: 55vh;
      flex-shrink: 0;
    }
    
    .text-section {
      padding: 1.5rem 1rem;
      text-align: center;
      min-height: auto;
      flex: 1;
      justify-content: flex-start !important;
      padding-top: calc(1rem + 100px) !important;
    }
    
    .text-content h2 {
      font-size: 1.875rem;
      margin-bottom: 0.75rem;
    }
    
    .text-content p {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    .camera-section {
      height: 50vh !important;
      max-height: 50vh;
    }
    
    .text-section {
      padding: 1rem 0rem; /* Links kein Padding, rechts mehr Platz */
      margin-top: 0;
      padding-top: calc(0.5rem + 60px) !important;
      padding-right: 2.5rem !important; /* Mehr Platz nach rechts */
      width: calc(100% + 1rem); /* Breiter machen */
      margin-left: -0.5rem; /* Nach links verschieben */
    }
    
    .text-content h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .text-content p {
      font-size: 1rem;
      line-height: 1.4;
    }
  }

  @media (max-width: 480px) {
    .text-section {
      padding-top: calc(0.5rem + 100px) !important;
      padding-right: 2rem !important; /* Noch mehr Platz nach rechts */
      width: calc(100% + 1.5rem); /* Noch breiter machen */
      margin-left: -0.75rem; /* Weiter nach links verschieben */
    }
  }

  /* Fullscreen Backdrop */
  .fullscreen-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: transparent;
    z-index: 9998;
    cursor: pointer;
  }

  /* Responsive Section-Container */
  @media (max-width: 768px) {
    section {
      padding-bottom: 3rem !important;
      height: auto !important;
      min-height: 100vh !important;
      padding-left: 0rem !important; /* Ganz nach links */
    }
    
    .grid {
      gap: 1rem !important;
      padding-right: 1rem !important;
      padding-bottom: 2rem !important;
      padding-left: 0rem !important; /* Ganz nach links */
    }
  }

  @media (max-width: 480px) {
    section {
      padding-bottom: 2.5rem !important;
      padding-left: 0rem !important; /* Ganz nach links */
    }
    
    .grid {
      gap: 0.75rem !important;
      padding-right: 0.75rem !important;
      padding-bottom: 1.5rem !important;
      padding-left: 0rem !important; /* Ganz nach links */
    }
  }

  @media (max-width: 768px) {
    section {
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
