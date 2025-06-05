<script lang="ts">
  export let title: string = '';
  export let preview: string = '';
  export let description: string = '';
</script>

<div class="text-container">
  {#if title}
    <h2 class="title">{title}</h2>
  {/if}
  {#if preview}
    <p class="preview">{preview}</p>
  {/if}
  {#if description}
    <p class="description">{description}</p>
  {/if}
</div>

<style>
  .text-container {
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .title {
    color: #000;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 16px 0;
    width: 100%;
  }

  .preview {
    color: #000;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
    margin: 0 0 24px 0;
    width: 100%;
  }

  .description {
    color: #000;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.6;
    margin: 0;
    width: 100%;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 20px;
    }

    .preview {
      font-size: 14px;
      margin-bottom: 16px;
    }

    .description {
      font-size: 12px;
    }
  }
</style>
