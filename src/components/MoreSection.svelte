<script lang="ts">
  import { onMount } from 'svelte';
  import { isFlashing } from '../stores/flash';
  import { selectedPhotoIndex } from '../stores/selectedPolaroid';
  import { isProcessing } from '../stores/photoProcessing';
  import PolaroidCamera from '../assets/polaroid-camera.svg';
  import HeyImage from '../assets/Hey.png';
  import AboutMeImage from '../assets/AboutMe.png';
  import WhatDrivesImage from '../assets/WhatDrives.png';
  import BeyondDesignImage from '../assets/BeyondDesign.png';

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
  let photoAudio: HTMLAudioElement;
  let photos: HTMLImageElement[] = [];
  let isLoading = true;
  let loadError = '';

  const images = [
    { 
      src: HeyImage, 
      alt: 'Hey',
      title: 'Hey! I\'m Maurice.',
      description: 'Frontend Developer with a passion for creating intuitive digital experiences.'
    },
    { 
      src: AboutMeImage, 
      alt: 'About Me',
      title: 'About Me',
      description: 'I combine technical skills with design thinking to build solutions that users love.'
    },
    { 
      src: WhatDrivesImage, 
      alt: 'What Drives Me',
      title: 'What Drives Me',
      description: 'Creating meaningful connections between technology and human needs.'
    },
    { 
      src: BeyondDesignImage, 
      alt: 'Beyond Design',
      title: 'Beyond Design',
      description: 'Always exploring new technologies and pushing creative boundaries.'
    }
  ];

  // Aktuelle Beschreibung basierend auf dem letzten aufgenommenen Foto oder gehovertem Bild
  let hoveredPhotoIndex = -1;
  let lastClickedPhotoIndex = -1; // Letztes angeklicktes Foto bleibt persistent
  let droppedPhotos = new Set(); // Verfolgt welche Fotos bereits gefallen sind
  $: currentDescription = hoveredPhotoIndex >= 0 ? images[hoveredPhotoIndex] :
                         (lastClickedPhotoIndex >= 0 ? images[lastClickedPhotoIndex] : 
                         (currentPhotoIndex > 0 ? images[currentPhotoIndex - 1] : null));

  // Debug: Verfolge Änderungen
  $: {
    console.log('Text state:', {
      hoveredPhotoIndex,
      lastClickedPhotoIndex,
      currentPhotoIndex,
      currentDescription: currentDescription?.title
    });
  }

  onMount(() => {
    const loadResources = async () => {
      try {
        // Create audio element with embedded base64 shutter sound
        photoAudio = new Audio();
        photoAudio.src = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAABQAFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

        await Promise.all(
          images.map(
            (image) =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = () => reject(`Failed to load image: ${image.alt}`);
                img.src = image.src;
              })
          )
        );

        isLoading = false;
        canTakePhoto = true;
      } catch (error) {
        console.error('Failed to load resources:', error);
        loadError = error instanceof Error ? error.message : String(error);
        isLoading = false;
      }
    };

    loadResources();
  });

  async function handleClick() {
    if (!canTakePhoto || isComplete) return;
    canTakePhoto = false;
    $isProcessing = true;
    
    if (currentPhotoIndex < images.length) {
      // Markiere das neue Foto als gefallen nach der Animation
      setTimeout(() => {
        droppedPhotos.add(currentPhotoIndex);
        droppedPhotos = droppedPhotos; // Trigger reactivity
      }, 1500 + (currentPhotoIndex * 200)); // Animation duration + delay
      
      currentPhotoIndex++;
    }

    // Trigger flash effect
    $isFlashing = true;
    setTimeout(() => {
      $isFlashing = false;
    }, 100);
    
    try {
      // Try to play the sound, but don't wait for it
      photoAudio?.play().catch(() => {
        console.log('Audio playback blocked');
      });

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
  style="height: 100vh; opacity: {currentSection === 'more' ? 1 : 0}; visibility: {currentSection === 'more' ? 'visible' : 'hidden'}; transition: opacity 0.3s ease-out, visibility 0.3s ease-out;"
>
  <!-- Zwei-Spalten-Layout -->
  <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8">
    
    <!-- Linke Spalte: Kamera und Fotos -->
    <div 
      class="camera-section relative flex flex-col items-center justify-center order-1 lg:order-1"
      on:click|preventDefault={handleSectionClick}
      on:keydown|preventDefault={handleSectionKeydown}
      role="presentation"
    >
      <button
        type="button"
        class="w-full h-full relative"
        class:cursor-pointer={!isComplete}
        class:cursor-not-allowed={isComplete}
        class:pointer-events-none={!canTakePhoto && !isComplete || currentSection !== 'more' || $isProcessing}
        on:click={handleClick}
        on:keydown|preventDefault={handleButtonKeydown}
        disabled={isComplete || !canTakePhoto || currentSection !== 'more'}
      >
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
          <!-- Kamera -->
          <div class="camera-wrapper">
            <div class="camera-container flex flex-col items-center" class:processing={$isProcessing}>
              <p class="text-center mb-2 hand-drawn-text transition-opacity duration-300" class:text-gray-400={isComplete}>
                {#if isComplete}
                  No more photos
                {:else}
                  Click = Photo
                {/if}
              </p>
              <img 
                src={PolaroidCamera} 
                alt="Polaroid Camera" 
                class="transition-transform duration-300"
                class:camera-disabled={isComplete}
                style="width: clamp(85px, 15.3vw, 136px);"
              />
            </div>
          </div>

          <!-- Fotos -->
          <div class="photos-container overflow-visible pointer-events-all">
            <div class="photos-grid overflow-visible">
              {#each images as image, i}
                {#if i < currentPhotoIndex}
                  <div 
                    class="photo-position"
                    class:selected={$selectedPhotoIndex === i}
                    style="z-index: {images.length - i};"
                    role="button"
                    tabindex="0"
                    on:click|stopPropagation={(event) => handlePhotoClick(i, event)}
                    on:keydown|stopPropagation={event => handlePhotoKeydown(event, i)}
                    on:mouseenter={() => hoveredPhotoIndex = i}
                    on:mouseleave={() => hoveredPhotoIndex = -1}
                  >
                    <div 
                      class="photo-container"
                      class:dropped={droppedPhotos.has(i)}
                      style="--delay: {i * 0.2}s; --index: {i};"
                      class:selected={$selectedPhotoIndex === i}
                    >
                      <div class="polaroid-frame">
                        <div class="photo-wrapper">
                          <img 
                            src={image.src} 
                            alt={image.alt}
                            class="w-full h-full"
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
      </button>
    </div>

    <!-- Rechte Spalte: Dynamischer Text -->
    <div class="text-section flex flex-col justify-center px-8 lg:px-12 order-2 lg:order-2">
      {#if currentDescription}
        <div class="text-content max-w-lg">
          <h2 class="hand-drawn-text text-4xl lg:text-5xl mb-6 text-black">
            {currentDescription.title}
          </h2>
          <p class="text-lg lg:text-xl text-gray-700 leading-relaxed font-light">
            {currentDescription.description}
          </p>
        </div>
      {:else}
        <div class="text-content max-w-lg opacity-50">
          <h2 class="hand-drawn-text text-4xl lg:text-5xl mb-6 text-gray-400">
            Take a photo...
          </h2>
          <p class="text-lg lg:text-xl text-gray-400 leading-relaxed font-light">
            Click the camera to capture moments and see stories unfold.
          </p>
        </div>
      {/if}
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

  .camera-wrapper {
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    z-index: 10;
  }

  @media (max-width: 1024px) {
    .camera-wrapper {
      left: 50%;
      top: 25%;
    }
  }

  @media (max-width: 768px) {
    .camera-wrapper {
      left: 50%;
      top: 30%;
    }

    img[src*="polaroid-camera"] {
      width: clamp(110px, 19.8vw, 176px) !important;
    }
  }

  .camera-container {
    transform: scale(0.98);
  }

  .camera-container:not(.camera-disabled):hover {
    animation: shake 0.8s cubic-bezier(.36,.07,.19,.97) infinite;
  }

  .camera-container.processing:not(.camera-disabled) {
    animation: shake 0.8s cubic-bezier(.36,.07,.19,.97) infinite;
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

  .polaroid-frame {
    all: unset;
    display: block;
    background: white;
    padding: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform-origin: center top;
    position: relative;
    width: 100%;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .photo-position:not(.selected) {
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    .selected ~ .photo-position {
      filter: blur(2px);
      opacity: 0.7;
    }
  }

  .polaroid-frame:hover {
    transform: scale(1.02) rotate(-1deg);
  }

  .photos-container {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translateX(-50%);
    width: min(400px, 80vw);
    height: 50vh;
    overflow: visible;
    pointer-events: all;
    background: transparent;
  }

  @media (max-width: 1024px) {
    .photos-container {
      left: 50%;
      top: 50%;
      width: min(350px, 75vw);
    }
  }

  @media (max-width: 768px) {
    .photos-container {
      left: 50%;
      top: 55%;
      width: min(300px, 70vw);
    }
  }

  .photos-grid {
    width: 100%;
  }

  .photo-position {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%) translateY(calc(var(--index, 0) * 20px));
    transform-style: preserve-3d;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: all;
    padding: 16px;
    margin: -16px;
    background: transparent;
    isolation: isolate;
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

  .photo-container {
    width: min(120px, calc(40vw - 2rem));
    position: relative;
    transform-origin: center;
    animation: photo-drop 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: var(--delay);
    animation-fill-mode: forwards;
    transition: transform 0.3s ease;
    pointer-events: all;
  }

  /* Verhindere Animation nach dem ersten Drop */
  .photo-container.dropped {
    animation: none;
    transform: translateY(calc(var(--index) * 80px)) rotate(0deg) scale(1);
  }

  .photo-position.selected .photo-container {
    width: min(400px, 70vw);
    margin: 0;
    transform: none !important;
    animation: none;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    z-index: 10000;
  }

  @media (max-width: 768px) {
    .photo-position.selected .photo-container {
      width: min(320px, 85vw);
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

  @media (max-width: 768px) {
    .photo-container {
      width: min(100px, calc(35vw - 2rem));
    }
  }

  .photo-container.subsequent {
    transform: translateY(calc(var(--index) * 140px + 400px)) !important;
  }

  .caption-container {
    text-align: center;
    margin-top: 6px;
    color: rgba(0, 0, 0, 0.8);
    font-family: 'Permanent Marker', cursive;
    font-size: 0.9rem;
  }

  .photo-wrapper {
    width: 100%;
    aspect-ratio: 3/2;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
  }

  .photo-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 2px;
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
  
  @keyframes photo-drop {
    0% {
      transform: translateY(-80px) rotate(0deg) scale(0.8);
      opacity: 0;
    }
    30% {
      transform: translateY(calc(var(--index) * 80px - 30px)) rotate(-8deg) scale(1);
      opacity: 1;
    }
    60% {
      transform: translateY(calc(var(--index) * 80px + 10px)) rotate(4deg) scale(1);
    }
    80% {
      transform: translateY(calc(var(--index) * 80px - 5px)) rotate(-2deg) scale(1);
    }
    100% {
      transform: translateY(calc(var(--index) * 80px)) rotate(0deg) scale(1);
    }
  }

  /* Text-Sektion Styles */
  .text-section {
    background: transparent;
    position: relative;
  }

  .text-content {
    transition: all 0.5s ease-in-out;
    animation: fadeIn 0.8s ease-out;
  }

  .text-content h2 {
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 300;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  .text-content p {
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 300;
    line-height: 1.6;
  }

  @media (max-width: 1024px) {
    .text-section {
      padding: 2rem 1.5rem;
      text-align: center;
    }
    
    .text-content h2 {
      font-size: 2.5rem;
    }
    
    .text-content p {
      font-size: 1.125rem;
    }
  }

  @media (max-width: 768px) {
    .text-section {
      padding: 1.5rem 1rem;
    }
    
    .text-content h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    
    .text-content p {
      font-size: 1rem;
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
</style>
