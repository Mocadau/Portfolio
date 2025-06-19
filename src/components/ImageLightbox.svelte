<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let src: string;
  export let alt: string = '';
  export let isOpen: boolean = false;

  const dispatch = createEventDispatcher();

  function closeLightbox() {
    dispatch('close');
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeLightbox();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div 
    class="lightbox-overlay" 
    on:click={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    aria-label="Bildvergrößerung"
  >
    <div class="lightbox-content">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <img 
        {src} 
        {alt}
        on:click={closeLightbox}
      />
    </div>
  </div>
{/if}

<style>
  .lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 20px;
    box-sizing: border-box;
  }

  .lightbox-content {
    position: relative;
    max-width: 70vw; /* 30% kleiner */
    max-height: 70vh; /* 30% kleiner */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lightbox-content img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    cursor: pointer;
    border-radius: 0; /* Keine gerundeten Ecken */
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  /* Mobile Anpassungen */
  @media (max-width: 768px) {
    .lightbox-overlay {
      padding: 10px;
    }

    .lightbox-content {
      max-width: 75vw; /* Etwas größer auf Mobile */
      max-height: 75vh;
    }
  }
</style>
