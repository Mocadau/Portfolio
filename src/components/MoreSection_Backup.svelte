<script lang="ts">
  import { selectedPhotoIndex } from '../stores/selectedPolaroid';
  import PolaroidCamera from '../assets/polaroid-camera.svg';
  import HeyImage from '../assets/AboutMe.png';
  import AboutMeImage from '../assets/Background.png';
  import WhatDrivesImage from '../assets/WhatDrives.png';
  import BeyondDesignImage from '../assets/BeyondDesign.png';
  import MyApproachImage from '../assets/MyApproach.png';
  import PhilosophyImage from '../assets/Philosophy.png';

  export let className = '';
  export let currentSection = 'hello';
  
  let currentPhotoIndex = 0;
  let lastClickedPhotoIndex = -1;
  let hasClickedOnce = false;

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
      description: 'After completing my banking apprenticeship and earning my university entrance qualification, I\'m currently in my 4th semester studying Interaction Design at HfG Schwäbisch Gmünd.'
    },
    { 
      src: WhatDrivesImage, 
      alt: 'What Drives Me',
      title: 'What Drives Me',
      description: 'I\'m deeply passionate about invention design, AI, strategic design, and VR/AR technologies. There\'s something magical about creating solutions that don\'t just solve problems.'
    },
    { 
      src: BeyondDesignImage, 
      alt: 'Beyond Design',
      title: 'Beyond Design',
      description: 'When I\'m not designing, you\'ll find me exploring new technologies, traveling to gain fresh perspectives, or simply enjoying life\'s simple pleasures with friends and family.'
    },
    { 
      src: MyApproachImage, 
      alt: 'My Approach',
      title: 'My Approach',
      description: 'I believe great design comes from understanding people, challenging assumptions, and embracing failure as a learning opportunity. Every project is a chance to create something meaningful.'
    },
    { 
      src: PhilosophyImage, 
      alt: 'Philosophy',
      title: 'Philosophy',
      description: 'Design isn\'t just about making things look good – it\'s about making them work better, feel right, and create positive impact in people\'s lives.'
    }
  ];

  function handleClick() {
    if (currentPhotoIndex < images.length) {
      hasClickedOnce = true;
      currentPhotoIndex++;
    }
  }

  function handlePhotoClick(index: number, event: MouseEvent) {
    event.stopPropagation();
    lastClickedPhotoIndex = index;
    $selectedPhotoIndex = $selectedPhotoIndex === index ? -1 : index;
  }

  function closeFullscreen() {
    $selectedPhotoIndex = -1;
  }
</script>

<section 
  class={`more-section ${className}`}
  style="opacity: {currentSection === 'more' ? 1 : 0}; visibility: {currentSection === 'more' ? 'visible' : 'hidden'};"
  on:click={closeFullscreen}
  on:keydown={(e) => e.key === 'Escape' && closeFullscreen()}
  role="button"
  tabindex="0"
>
  <div class="container">
    <!-- Left Side: Camera and Photos -->
    <div class="camera-photos-side">
      <!-- Camera -->
      <div class="camera-wrapper">
        <button 
          class="camera-button"
          class:wobble={!hasClickedOnce}
          on:click={handleClick}
          disabled={currentPhotoIndex >= images.length}
        >
          <img src={PolaroidCamera} alt="Polaroid Camera" class="camera" />
        </button>
        
        <!-- Photos coming out of camera -->
        <div class="photos-container">
          {#each images.slice(0, currentPhotoIndex) as image, index}
            <div 
              class="photo"
              class:selected={$selectedPhotoIndex === index}
              style="--index: {index}; --delay: {index * 150}ms;"
              on:click={(e) => handlePhotoClick(index, e)}
              on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePhotoClick(index, e)}
              role="button"
              tabindex="0"
            >
              <div class="polaroid">
                <img src={image.src} alt={image.alt} />
                <div class="polaroid-bottom"></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Right Side: Text -->
    <div class="text-section">
      {#if lastClickedPhotoIndex >= 0}
        <div class="text-content">
          <h2>{images[lastClickedPhotoIndex].title}</h2>
          <p>{images[lastClickedPhotoIndex].description}</p>
        </div>
      {/if}
    </div>
  </div>

  <!-- Backdrop für Fullscreen -->
  {#if $selectedPhotoIndex !== -1}
    <div 
      class="backdrop" 
      on:click={closeFullscreen}
      on:keydown={(e) => e.key === 'Escape' && closeFullscreen()}
      role="button"
      tabindex="0"
      aria-label="Close fullscreen photo"
    ></div>
  {/if}
</section>

<style>
  .more-section {
    height: 100vh;
    transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
    padding: 1rem;
    overflow: hidden;
  }

  .container {
    height: 100%;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: flex-start;
  }

  .camera-photos-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    position: relative;
  }

  /* Camera */
  .camera-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    position: relative;
    z-index: 10;
  }

  .camera-button {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .camera-button:hover:not(:disabled) {
    transform: scale(1.05);
  }

  .camera-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .camera {
    width: 120px;
    height: auto;
  }

  .wobble {
    animation: wobble 2s ease-in-out infinite;
  }

  @keyframes wobble {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-2deg); }
    75% { transform: rotate(2deg); }
  }

  /* Photos coming out of camera */
  .photos-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -20px; /* Overlap with camera for "coming out" effect */
    z-index: 5;
  }

  .photo {
    cursor: pointer;
    transition: all 0.3s ease;
    animation: slideOut 1s ease-out forwards;
    animation-delay: var(--delay);
    opacity: 0;
    transform: translateY(-50px);
    margin-bottom: 10px;
  }

  @keyframes slideOut {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .polaroid {
    background: white;
    padding: 12px;
    padding-bottom: 40px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: rotate(var(--rotation, 0deg));
    transition: all 0.3s ease;
    width: 120px;
  }

  .photo:nth-child(odd) .polaroid { --rotation: -3deg; }
  .photo:nth-child(even) .polaroid { --rotation: 3deg; }

  .polaroid img {
    width: 100%;
    height: 90px;
    object-fit: cover;
    display: block;
  }

  .polaroid-bottom {
    height: 28px;
    background: white;
  }

  .photo:hover .polaroid {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  /* Selected Photo */
  .photo.selected .polaroid {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
    width: 300px;
    z-index: 1000;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .photo.selected .polaroid img {
    height: 240px;
  }

  /* Text Section */
  .text-section {
    display: flex;
    align-items: flex-start;
    padding-top: 8rem; /* Align with first photo position */
    height: 100%;
  }

  .text-content {
    opacity: 0;
    animation: fadeIn 0.5s ease-out 0.3s forwards;
  }

  .text-content h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #2c3e50;
    line-height: 1.2;
  }

  .text-content p {
    font-size: 1.3rem;
    line-height: 1.6;
    color: #666;
  }

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  /* Backdrop */
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: transparent;
    z-index: 999;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      gap: 2rem;
    }

    .camera-photos-side {
      align-items: center;
    }

    .camera {
      width: 100px;
    }

    .polaroid {
      width: 100px;
    }

    .polaroid img {
      height: 75px;
    }

    .polaroid-bottom {
      height: 24px;
    }

    .photo.selected .polaroid {
      width: 250px;
      bottom: 20px;
      top: auto;
      left: 50%;
      transform: translateX(-50%) !important;
    }

    .photo.selected .polaroid img {
      height: 200px;
    }

    .text-section {
      padding-top: 1rem;
      justify-content: center;
      text-align: center;
    }

    .text-content h2 {
      font-size: 2.2rem;
      margin-bottom: 1.5rem;
    }

    .text-content p {
      font-size: 1.1rem;
    }
  }
</style>
