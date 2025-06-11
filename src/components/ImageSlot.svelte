<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TypingAnimation from './TypingAnimation.svelte';
  import { fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let index: number;
  export let image: string | null = null;
  export let text: string = '';
  export let className = '';

  const dispatch = createEventDispatcher();
  let isDragOver = false;
  let isImageLoaded = false;

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
      isDragOver = true;
    }
  }

  function handleDragLeave() {
    isDragOver = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragOver = false;
    const data = e.dataTransfer?.getData('text/plain');
    if (data) {
      dispatch('drop', { index, data: JSON.parse(data) });
    }
  }

  function handleImageLoad() {
    isImageLoaded = true;
  }
</script>

<div
  class="polaroid-frame {className} {isDragOver ? 'drag-over' : ''} {image ? 'has-image' : ''}"
  style="--rotation: {Math.random() * 6 - 3}deg"
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
  role="button"
  tabindex="0"
>
  <div class="image-container">
    {#if image}
      <img 
        src={image} 
        alt="Polaroid {index + 1}"
        class="polaroid-image {isImageLoaded ? 'loaded' : ''}"
        on:load={handleImageLoad}
      />
    {:else}
      <div class="empty-frame">
        <div class="placeholder-text">Drop a photo here</div>
      </div>
    {/if}
  </div>

  <div class="polaroid-caption" class:empty={!text}>
    {#if text}
      <TypingAnimation text={text} />
    {:else}
      <span class="caption-placeholder">Write your caption...</span>
    {/if}
  </div>
</div>

<style>
  .polaroid-frame {
    width: 100%;
    padding: 12px;
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    position: relative;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: rotate(var(--rotation, 0deg));
    border: none;
    box-sizing: border-box;
  }

  .image-container {
    width: 100%;
    aspect-ratio: 1;
    background: #f0f0f0;
    position: relative;
    overflow: hidden;
  }

  .polaroid-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    transform: scale(1.1);
    filter: contrast(1.05) saturate(1.1);
  }

  .polaroid-image.loaded {
    opacity: 1;
    transform: scale(1);
    filter: contrast(1.05) saturate(1.1);
  }

  .empty-frame {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    border: 2px dashed #ccc;
    position: relative;
  }

  .placeholder-text {
    font-family: var(--font-family);
    color: #666;
    font-size: 1.2rem;
    transform: rotate(-2deg);
    text-align: center;
    line-height: 1.4;
  }

  .polaroid-caption {
    margin-top: 8px;
    font-family: var(--font-family);
    text-align: center;
    color: #333;
    font-size: 0.9rem;
    line-height: 1.3;
  }

  .caption-placeholder {
    color: #999;
    font-style: italic;
  }

  .polaroid-frame.drag-over {
    transform: scale(1.05) rotate(0deg) !important;
    box-shadow: 
      0 20px 40px rgba(0,0,0,0.15),
      0 12px 24px rgba(0,0,0,0.1);
    z-index: 10;
  }

  .polaroid-frame.drag-over .empty-frame {
    border-color: #666;
    background-color: #f0f0f0;
  }

  .polaroid-frame:hover {
    transform: translateY(-6px) scale(1.02) rotate(var(--rotation, 0deg));
  }
</style>
