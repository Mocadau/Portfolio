<script lang="ts">
  import { selectedPolaroid } from '../stores/selectedPolaroid';
  import { isProcessing } from '../stores/photoProcessing';
  import { fade, scale } from 'svelte/transition';
  import { onMount } from 'svelte';
  import ImageUploader from './ImageUploader.svelte';

  let dialogElement: HTMLDialogElement;

  function handleClose() {
    if (dialogElement) {
      dialogElement.close();
    }
    $selectedPolaroid = null;
  }

  function handleUpload(event: CustomEvent) {
    const { url } = event.detail;
    if ($selectedPolaroid) {
      $selectedPolaroid.src = url;
    }
  }

  $: if ($selectedPolaroid && dialogElement) {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      if (dialogElement) {
        dialogElement.showModal();
      }
    }, 0);
  }
</script>

{#if $selectedPolaroid}
  <dialog 
    bind:this={dialogElement}
    class="fixed inset-0 z-[999] p-0 m-0 w-full h-full bg-transparent"
    on:close={handleClose}
  >
    <div
      class="w-full h-full flex items-center justify-center"
      style="backdrop-filter: blur(10px); background: rgba(0, 0, 0, 0.5);"
      transition:fade={{ duration: 200 }}
      on:click={() => !$isProcessing && handleClose()}
      on:keydown={(e) => {
        if (e.key === 'Escape' && !$isProcessing) handleClose();
      }}
      role="presentation"
      class:pointer-events-none={$isProcessing}
    >
      <div
        class="polaroid-frame"
        transition:scale={{ duration: 300 }}
      >
        <div class="polaroid-content">
          <div class="image-container">
            <img 
              src={$selectedPolaroid.src} 
              alt={$selectedPolaroid.alt}
              class="polaroid-image"
            />
            <div class="absolute bottom-4 right-4 z-10">
              <ImageUploader on:upload={handleUpload} />
            </div>
          </div>
          {#if $selectedPolaroid.caption}
            <div class="sticky-note">
              <p class="note-text">{$selectedPolaroid.caption}</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </dialog>
{/if}

<style>
  .polaroid-frame {
    transform-origin: center;
    position: relative;
    max-width: 90vh;
    max-height: 90vh;
    transform: rotate(-1deg);
    transition: transform 0.3s ease;
  }

  .polaroid-frame:hover {
    transform: rotate(0deg);
  }

  .polaroid-content {
    background: #ffffff;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: none;
    position: relative;
    box-sizing: border-box;
  }

  .polaroid-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
  }

  .image-container {
    width: 100%;
    aspect-ratio: 1;
    background: #f5f5f5;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .polaroid-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  .sticky-note {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%) rotate(-1deg);
    background: #fdfaaa;
    padding: 6px 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    max-width: 80%;
    transition: all 0.3s ease;
  }

  .note-text {
    font-family: var(--font-family);
    font-size: 1.25rem;
    color: #2c3e50;
    margin: 0;
    line-height: 1.3;
    text-align: center;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .polaroid-frame:hover .sticky-note {
    transform: translateX(-50%) rotate(1deg);
  }
</style>
