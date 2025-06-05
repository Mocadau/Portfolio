<script lang="ts">
  export let title: string = '';
  export let description: string = '';
  export let imageSrc: string = '';
  export let imageAlt: string = '';
  export let marginTop: string = '0';
  export let customClass: string = '';
  export let imageComponents: { src: string; alt: string; }[] = [];
</script>

<div class="grid-item {customClass}" style="margin-top: {marginTop}">
  <div class="text-content">
    {#if title}
      <h2 class="section-title">{title}</h2>
    {/if}
    <div class="description">{description}</div>
  </div>
  <div class="image-container">
    {#if imageComponents.length > 0}
      <div class="image-grid">
        {#each imageComponents as image}
          <div class="small-image">
            <img src={image.src} alt={image.alt} style="width: 100%; height: 100%; object-fit: cover;">
          </div>
        {/each}
      </div>
    {:else}
      <img src={imageSrc} alt={imageAlt} style="width: 100%; height: auto;">
    {/if}
  </div>
</div>

<style>
  .grid-item {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .section-title {
    color: #000;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
  }
  .description {
    color: #000;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-weight: 300;
    max-width: 503px;
    line-height: 1.6;
  }
  .image-grid {
    display: flex;
    gap: 20px;
    justify-content: flex-end;
  }
  .small-image {
    width: 144px;
    height: 122px;
    border-radius: 10.416px;
    border: 0.694px solid #000;
    overflow: hidden;
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  .small-image:hover {
    transform: scale(1.05);
  }
  img {
    transition: transform 0.3s ease;
  }
  img:hover {
    transform: scale(1.02);
  }

  @media (min-width: 768px) {
    .grid-item {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: 40px;
    }
    .text-content {
      flex: 1;
    }
    .image-container {
      flex: 1;
    }
  }
</style>
