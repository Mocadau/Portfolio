<script lang="ts">
  export let title: string = '';
  export let description: string = '';
  export let images: { src: string; alt: string; }[] = [];
  export let isGridItem: boolean = false;
  export let isReversed: boolean = false;
</script>

<div class="container {isGridItem ? 'grid-item' : ''} {isReversed ? 'reversed' : ''}">
  <div class="content-wrapper">
    <div class="text">
      {#if title}
        <h2 class="title">{title}</h2>
      {/if}
      {#if description}
        <p class="description">{description}</p>
      {/if}
    </div>

    {#if images.length > 0}
      <div class="images">
        {#each images as image}
          <div class="image-wrapper">
            <img src={image.src} alt={image.alt}>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .grid-item {
    padding: 40px;
    background-color: #FAFAFA;
    border-radius: 16px;
    display: block;
    width: 100%;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }

  .text {
    width: 100%;
  }

  .title {
    color: #000;
    font-family: var(--font-family);
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 16px 0;
  }

  .description {
    color: #000;
    font-family: var(--font-family);
    font-size: 14px;
    font-weight: 300;
    line-height: 1.6;
    margin: 0;
  }

  .images {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .image-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: #F5F5F5;
    overflow: hidden;
    border-radius: 10.416px;
    border: 0.694px solid #000;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  img:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    .grid-item {
      padding: 20px;
    }
  }
</style>
