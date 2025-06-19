<script lang="ts">
  import ImageLightbox from './ImageLightbox.svelte';
  import { onMount } from 'svelte';
  
  export let src: string;
  export let alt: string = '';
  export let className: string = '';
  export let style: string = '';
  
  let showLightbox = false;
  let isMobile = false;
  
  // Detect if device is mobile
  onMount(() => {
    const checkIsMobile = () => {
      isMobile = window.innerWidth <= 768;
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  });
  
  function openLightbox() {
    // Nur auf Desktop
    if (!isMobile) {
      showLightbox = true;
    }
  }
  
  function closeLightbox() {
    showLightbox = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div 
  class="clickable-image {className} {!isMobile ? 'desktop-clickable' : ''}" 
  {style}
  on:click={openLightbox}
  role={!isMobile ? "button" : null}
  tabindex={!isMobile ? 0 : null}
  on:keydown={(e) => !isMobile && e.key === 'Enter' && openLightbox()}
>
  <img {src} {alt} />
</div>

<ImageLightbox 
  {src} 
  {alt} 
  isOpen={showLightbox} 
  on:close={closeLightbox} 
/>

<style>
  .clickable-image {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }

  .desktop-clickable {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .desktop-clickable:hover {
    transform: scale(1.01);
  }

  .desktop-clickable:focus {
    outline: 2px solid #007acc;
    outline-offset: 2px;
  }

  .clickable-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Mobile Anpassungen */
  @media (max-width: 768px) {
    .clickable-image {
      cursor: default;
    }
  }
</style>
