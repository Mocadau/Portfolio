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
