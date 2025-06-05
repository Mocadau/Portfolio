<script lang="ts">
  export let images: {
    src: string;
    alt: string;
  }[] = [];

  $: if (images.length !== 3) {
    console.warn('ImageMosaicHealthApp expects exactly 3 images');
  }
</script>

<div class="mosaic-grid">
  <div class="main-image">
    <img 
      src={images[0]?.src} 
      alt={images[0]?.alt}
      class="w-full h-auto"
      style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"
    />
  </div>
  <div class="side-images">
    <div class="side-image">
      <img 
        src={images[1]?.src} 
        alt={images[1]?.alt}
        class="w-full h-auto rounded-lg"
        style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"
      />
    </div>
    <div class="side-image">
      <img 
        src={images[2]?.src} 
        alt={images[2]?.alt}
        class="w-full h-auto rounded-lg"
        style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"
      />
    </div>
  </div>
</div>

<style>
  .mosaic-grid {
    display: flex;
    gap: 1.5rem;
    width: 100%;
  }

  .main-image {
    flex: 1;
    max-width: 50%;
  }

  .side-images {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .side-image {
    width: 100%;
  }

  @media (max-width: 1024px) {
    .mosaic-grid {
      gap: 1rem;
    }

    .main-image {
      max-width: 45%;
    }

    .side-images {
      gap: 1rem;
    }
  }

  @media (max-width: 768px) {
    .mosaic-grid {
      flex-direction: row;
      gap: 0.5rem;
      align-items: flex-start;
    }

    .main-image {
      max-width: 50%;
      margin: 0;
    }

    .side-images {
      max-width: 50%;
      margin: 0;
      gap: 0.5rem;
    }

    .side-image img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
</style>
