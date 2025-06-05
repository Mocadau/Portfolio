<script lang="ts">
  export let title: string = '';
  export let description: string = '';
  export let imageSrc: string = '';
  export let imageAlt: string = '';
  export let reverse: boolean = false;
</script>

<div class="grid-item" class:reverse>
  <div class="text-content">
    <div class="description">{title} {description}</div>
  </div>
  <div class="image-container">
    <img src={imageSrc} alt={imageAlt} style="width: 100%; height: auto;">
  </div>
</div>

<style>
  .grid-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
    padding: 20px 0;
  }
  .reverse {
    flex-direction: row-reverse;
  }
  .text-content {
    flex: 1;
  }
  .image-container {
    flex: 1;
  }
  .description {
    color: #000;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.6;
    max-width: 503px;
  }
  img {
    transition: transform 0.3s ease;
  }
  img:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    .grid-item,
    .reverse {
      flex-direction: column;
    }
    .image-container {
      width: 100%;
    }
  }
</style>
