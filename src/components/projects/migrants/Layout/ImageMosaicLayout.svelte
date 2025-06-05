<script lang="ts">
  export let images: {
    src: string;
    alt: string;
  }[] = [];

  // Ensure we have exactly 3 images
  $: if (images.length !== 3) {
    console.warn('ImageMosaicLayout expects exactly 3 images');
  }
</script>

<div class="grid-container">
  <div class="text-content">
    <slot name="text" />
  </div>
  
  <div class="images-grid">
    <div class="main-image">
      <img
        src={images[0]?.src}
        alt={images[0]?.alt}
        class="w-full h-full object-contain"
      />
    </div>
    <div class="side-images">
      <div class="secondary-image">
        <img
          src={images[1]?.src}
          alt={images[1]?.alt}
          class="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div class="secondary-image">
        <img
          src={images[2]?.src}
          alt={images[2]?.alt}
          class="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  </div>
</div>

<style>
  .grid-container {
    width: 100%;
    display: flex;
    gap: 60px;
    align-items: flex-start;
  }

  .text-content {
    width: 45%;
  }

  .images-grid {
    width: 55%;
    display: flex;
    gap: 20px;
  }

  .main-image {
    width: 45%;
    height: 100%;
    display: flex;
    align-items: flex-start;
  }

  .side-images {
    width: 55%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .secondary-image {
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
  }

  @media (max-width: 1080px) {
    .grid-container {
      flex-direction: column;
      gap: 40px;
    }

    .text-content,
    .images-grid {
      width: 100%;
    }

    .main-image {
      width: 50%;
    }

    .side-images {
      width: 50%;
    }
  }

  @media (max-width: 768px) {
    .grid-container {
      gap: 30px;
    }

    .images-grid {
      flex-direction: column;
    }

    .main-image,
    .side-images {
      width: 100%;
    }
  }
</style>
