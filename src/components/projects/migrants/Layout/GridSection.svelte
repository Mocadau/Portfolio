<script lang="ts">
  export let title: string = '';
  export let rightTitle: string = '';
  export let layout: 'default' | 'video-focus' = 'default';
  export let leftColumnWidth: string = '45%';
  export let rightColumnWidth: string = '45%';
</script>

<section class="grid-section">
  <div class="titles">
    {#if title || rightTitle}
      <div class="title-container">
        {#if title}
          <h2 class="title left">{title}</h2>
        {/if}
        {#if rightTitle}
          <h2 class="title right">{rightTitle}</h2>
        {/if}
      </div>
      <div class="divider"></div>
    {/if}
  </div>

  <div class="content-area" class:video-focus={layout === 'video-focus'}>
    {#if layout === 'default'}
      <div class="left-column" style="width: {leftColumnWidth}">
        <div class="text-content">
          <slot name="left-text" />
        </div>
        <div class="image-content">
          <slot name="left-image" />
        </div>
      </div>
      <div class="right-column" style="width: {rightColumnWidth}">
        <slot name="right-content" />
      </div>
    {:else if layout === 'video-focus'}
      <div class="video-section">
        <slot name="left-image" />
      </div>
      <div class="content-columns">
        <div class="text-content">
          <slot name="left-text" />
        </div>
        <div class="right-content">
          <slot name="right-content" />
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .grid-section {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .titles {
    width: 100%;
    margin-bottom: 80px;
  }

  .title-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  .title {
    color: #000;
    font-family: var(--font-family);
    font-size: 48px;
    font-weight: 700;
    margin: 0;
    width: 45%;
  }

  .divider {
    width: 100%;
    height: 1px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .content-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  .content-area:not(.video-focus) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

    .left-column {
      display: flex;
      flex-direction: column;
      gap: 40px;
      flex-shrink: 0;
      width: 100%;
    }

    .image-content {
      width: 100%;
    }

  .right-column {
    flex-shrink: 0;
  }

  .video-section {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-bottom: 80px;
  }

  .video-section :global(.w-full) {
    max-width: 1920px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .content-columns {
    display: flex;
    justify-content: space-between;
    gap: 60px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .content-columns .text-content,
  .content-columns .right-content {
    width: 45%;
  }

  @media (max-width: 1080px) {
    .video-section :global(.w-full) {
      padding: 0 20px;
    }

    .content-columns {
      flex-direction: column;
      padding: 0 20px;
      gap: 40px;
    }

    .content-area.video-focus .content-columns .text-content,
    .content-area.video-focus .content-columns .right-content {
      width: 100%;
    }

    .titles {
      margin-bottom: 60px;
    }

    .title-container {
      flex-direction: column;
      gap: 24px;
    }

    .title {
      width: 100%;
      font-size: 32px;
    }

    .content-area:not(.video-focus) {
      flex-direction: column;
    }

    .content-area:not(.video-focus) .left-column,
    .content-area:not(.video-focus) .right-column {
      width: 100% !important;
      margin-bottom: 60px;
    }
  }

  @media (max-width: 768px) {
    .video-section :global(.w-full) {
      padding: 0 15px;
    }

    .content-columns {
      padding: 0 15px;
      gap: 30px;
    }

    .titles {
      margin-bottom: 40px;
    }

    .left-column {
      gap: 30px;
      margin-bottom: 40px;
    }
  }
</style>
