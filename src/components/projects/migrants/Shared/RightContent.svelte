<script lang="ts">
  import ImageMosaicLayout from '../Layout/ImageMosaicLayout.svelte';

  export let title: string = '';
  export let description: string = '';
  export let images: { src: string; alt: string; caption?: string }[] = [];
  export let layout: 'default' | 'mosaic' = 'default';
</script>

{#if layout === 'mosaic'}
  <ImageMosaicLayout {images}>
    <div slot="text">
      {#if title}
        <h3 class="title">{title}</h3>
      {/if}
      {#if description}
        <p class="description">{description}</p>
      {/if}
    </div>
  </ImageMosaicLayout>
{:else}
  <div class="right-content">
    {#if title || description}
      <div class="text-content">
        {#if title}
          <h3 class="title">{title}</h3>
        {/if}
        {#if description}
          <p class="description">{description}</p>
        {/if}
      </div>
    {/if}

    {#if images.length > 0}
      <div class="images-grid">
        {#each images as image}
          <div class="image-wrapper">
            <img src={image.src} alt={image.alt} />
            {#if image.caption}
              <p class="caption">{image.caption}</p>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
    
    <slot />
  </div>
{/if}

<style>
  .right-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 40px;
    border-radius: 16px;
  }

  .text-content {
    width: 100%;
  }

  .title {
    color: #000;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 16px 0;
  }

  .description {
    color: #000;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.6;
    margin: 0;
  }

  .images-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .image-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 10px;
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.02);
  }

  .caption {
    color: #666;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    margin: 0;
    opacity: 0.8;
  }

  @media (max-width: 1080px) {
    .right-content {
      padding: 30px;
    }
  }

  @media (max-width: 768px) {
    .right-content {
      padding: 20px;
      gap: 30px;
    }

    .title {
      font-size: 20px;
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 700;
    }

    .description {
      font-size: 12px;
    }

    .images-grid {
      gap: 15px;
    }

    .caption {
      font-size: 11px;
    }
  }
</style>
