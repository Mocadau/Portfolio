<script lang="ts">
  import { optimizeImageSize } from '../lib/utils';

  export let src: string;
  export let id: string;
  export let text: string;
  export let className = '';

  // Optimize image size based on container dimensions
  $: optimizedSrc = optimizeImageSize(src, 200);

  function handleDragStart(e: DragEvent) {
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', JSON.stringify({ 
        id, 
        src: optimizedSrc,
        text 
      }));
      e.dataTransfer.effectAllowed = 'move';
    }
  }
</script>

<div 
  class="draggable-image {className}"
  draggable="true"
  on:dragstart={handleDragStart}
  role="button"
  tabindex="0"
>
  <div class="frame">
    <div class="polaroid">
      <div class="image-container">
        <img src={optimizedSrc} alt={text} loading="lazy" />
      </div>
      {#if text}
        <div class="sticky-note">
          <p class="note-text">{text}</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .draggable-image {
    cursor: grab;
    user-select: none;
    transition: all 0.3s ease;
    perspective: 1000px;
  }

  .draggable-image:hover {
    transform: translateY(-4px) rotate(1deg);
  }

  .frame {
    padding: 4px;
    position: relative;
  }

  .polaroid {
    background: white;
    padding: 12px 12px 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: transform 0.3s ease;
  }

  .polaroid::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
  }

  .image-container {
    width: 200px;
    height: 200px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: center;
    pointer-events: none;
    transition: transform 0.3s ease;
    background: #f5f5f5;
  }

  .draggable-image:hover img {
    transform: scale(1.05);
  }

  .sticky-note {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%) rotate(-1deg);
    background: #fdfaaa;
    padding: 4px 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    max-width: 180px;
    transition: all 0.3s ease;
  }

  .note-text {
    font-family: var(--font-family);
    font-size: 0.95rem;
    color: #2c3e50;
    margin: 0;
    line-height: 1.2;
    text-align: center;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .draggable-image:hover .sticky-note {
    transform: translateX(-50%) rotate(1deg);
  }
</style>
