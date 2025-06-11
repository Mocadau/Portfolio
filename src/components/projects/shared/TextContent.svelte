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
    text-align: left;
  }

  .title {
    color: #000;
    font-family: var(--font-family);
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 20px 0;
    width: 100%;
    text-align: left;
    line-height: 1.2;
  }

  .preview {
    color: #000;
    font-family: var(--font-family);
    font-size: 18px;
    font-weight: 500;
    line-height: 1.6;
    margin: 0 0 28px 0;
    width: 100%;
    text-align: left;
  }

  .description {
    color: #000;
    font-family: var(--font-family);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.7;
    margin: 0;
    width: 100%;
    text-align: left;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 24px;
      margin-bottom: 16px;
    }

    .preview {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .description {
      font-size: 14px;
      line-height: 1.6;
    }
  }

  @media (max-width: 480px) {
    .title {
      font-size: 22px;
      margin-bottom: 14px;
    }

    .preview {
      font-size: 15px;
      margin-bottom: 18px;
    }

    .description {
      font-size: 13px;
    }
  }
</style>
