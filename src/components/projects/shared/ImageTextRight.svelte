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
    gap: 28px;
    text-align: left;
  }
  
  .text-content {
    text-align: left;
  }
  
  .section-title {
    color: #000;
    font-family: var(--font-family);
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: left;
    line-height: 1.2;
  }
  
  .description {
    color: #000;
    font-family: var(--font-family);
    font-size: 16px;
    font-weight: 300;
    max-width: 550px;
    line-height: 1.7;
    text-align: left;
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
      gap: 48px;
    }
    .text-content {
      flex: 1;
      text-align: left;
    }
    .image-container {
      flex: 1;
    }
  }

  @media (max-width: 768px) {
    .grid-item {
      gap: 24px;
    }
    
    .section-title {
      font-size: 24px;
      margin-bottom: 16px;
    }
    
    .description {
      font-size: 15px;
      max-width: 100%;
    }
    
    .image-grid {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .section-title {
      font-size: 22px;
      margin-bottom: 14px;
    }
    
    .description {
      font-size: 14px;
    }
    
    .image-grid {
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    
    .small-image {
      width: 120px;
      height: 100px;
    }
  }
</style>
