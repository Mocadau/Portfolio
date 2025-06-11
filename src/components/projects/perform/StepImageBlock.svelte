<script lang="ts">
  export let src: string;
  export let alt: string = '';
  export let caption: string = '';
</script>

<div class="step-image-block">
  <div class="image-wrapper">
    <img {src} {alt} />
  </div>
  {#if caption}
    <p class="caption">{caption}</p>
  {/if}
  <slot />
</div>

<style>
  .step-image-block {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .image-wrapper {
    width: 250px;
    height: 150px;
    overflow: hidden;
    border-radius: 0px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .caption {
    font-size: 0.9rem;
    line-height: 1.4;
    margin: 12px 0 0;
    text-align: center;
    color: #555;
    width: 250px;
  }

  @media (max-width: 768px) {
    .step-image-block {
      width: 100%;
      max-width: 250px;
      margin: 0 auto;
    }
    
    .image-wrapper {
      width: 250px;
      height: 150px;
    }
  }
  
  @media (max-width: 480px) {
    .image-wrapper {
      width: 250px;
      height: 150px;
    }
  }
</style>
