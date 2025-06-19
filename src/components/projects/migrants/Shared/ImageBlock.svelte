<script lang="ts">
  import ImageLightbox from '../../../ImageLightbox.svelte';
  import { onMount } from 'svelte';
  
  export let src: string;
  export let alt: string = '';
  export let caption: string = '';
  export let enableLightbox: boolean = true; // Neuer Parameter
  
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
    // Nur auf Desktop und wenn Lightbox aktiviert ist
    if (enableLightbox && !isMobile) {
      showLightbox = true;
    }
  }
  
  function closeLightbox() {
    showLightbox = false;
  }
</script>

<div class="image-block">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div 
    class="image-wrapper {(enableLightbox && !isMobile) ? 'clickable' : ''}" 
    on:click={openLightbox} 
    role={(enableLightbox && !isMobile) ? "button" : null}
    tabindex={(enableLightbox && !isMobile) ? 0 : null}
    on:keydown={(e) => enableLightbox && !isMobile && e.key === 'Enter' && openLightbox()}
  >
    <img {src} {alt} />
  </div>
  {#if caption}
    <p class="caption">{caption}</p>
  {/if}
  <slot />
</div>

{#if enableLightbox}
  <ImageLightbox 
    {src} 
    {alt} 
    isOpen={showLightbox} 
    on:close={closeLightbox} 
  />
{/if}

<style>
  .image-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .image-wrapper {
    width: 100%;
    overflow: hidden;
    border-radius: 0px;
    margin: 0;
    position: relative;
  }

  .image-wrapper.clickable {
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .image-wrapper.clickable:hover {
    transform: scale(1.01);
  }

  .image-wrapper.clickable:focus {
    outline: 2px solid #007acc;
    outline-offset: 2px;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }

  .caption {
    color: #666;
    font-family: var(--font-family);
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    margin: 0;
    opacity: 0.8;
    text-align: left;
  }

  @media (max-width: 768px) {
    .image-block {
      gap: 8px;
    }

    .image-wrapper {
      border-radius: 0px;
      cursor: default;
    }

    .caption {
      font-size: 11px;
    }
  }
</style>
