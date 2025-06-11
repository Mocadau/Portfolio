<script lang="ts">
  export let title: string = '';
  export let description: string = '';
  export let imageSrc: string = '';
  export let imageAlt: string = '';
  export let marginTop: string = '0';
  export let customClass: string = '';
</script>

<div class="grid-item {customClass}" style="margin-top: {marginTop}">
  <div class="text-content">
    {#if title}
      <h2 class="section-title">{title}</h2>
    {/if}
    <div class="description">{description}</div>
  </div>
  <div class="image-container">
    <img src={imageSrc} alt={imageAlt} style="width: 100%; height: auto;">
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
  img {
    transition: transform 0.3s ease;
  }
  img:hover {
    transform: scale(1.02);
  }

  @media (min-width: 768px) {
    .grid-item {
      flex-direction: row;
      justify-content: flex-start;
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
  }

  @media (max-width: 480px) {
    .section-title {
      font-size: 22px;
      margin-bottom: 14px;
    }
    
    .description {
      font-size: 14px;
    }
  }
</style>
