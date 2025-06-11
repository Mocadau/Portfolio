<script lang="ts">
  export let src: string;
  export let alt: string = '';
  export let caption: string = '';
</script>

<div class="image-block">
  <div class="image-wrapper">
    <img {src} {alt} />
  </div>
  {#if caption}
    <p class="caption">{caption}</p>
  {/if}
  <slot />
</div>

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
    }

    .caption {
      font-size: 11px;
    }
  }
</style>
