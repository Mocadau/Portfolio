<script lang="ts">
  export let title: string = '';
  export let subtitle: string = '';
  export let description: string = '';
</script>

<div class="text-block">
  {#if title}
    <h3 class="title">{title}</h3>
  {/if}
  {#if subtitle && subtitle.trim()}
    <p class="subtitle">{subtitle}</p>
  {/if}
  {#if description && description.trim()}
    <p class="description">{description}</p>
  {/if}
  <slot />
</div>
 
<style>
  .text-block {
    width: 100%;
    text-align: left;
    margin-bottom: 0;
  }

  .title {
    color: #000;
    font-family: var(--font-family);
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 12px 0;
    text-align: left;
  }

  .subtitle {
    color: #000;
    font-family: var(--font-family);
    font-size: 1.375rem;  /* Match description text size */
    font-weight: 400;
    line-height: 1.8;
    margin: 0 0 24px 0;
    text-align: left;
  }

  .description {
    color: #222;
    font-family: var(--font-family);
    font-size: 1.375rem;  /* Match reflection text size */
    font-weight: 400;
    line-height: 1.8;
    margin: 0;
    text-align: left;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 18px; 
      font-family: var(--font-family);
      font-weight: 700;
    }

    .subtitle {
      font-size: 14px;
      margin-bottom: 12px;
      line-height: 1.6;
    }

    .description {
      font-size: 14px;
      line-height: 1.6;
    }
  }

  @media (max-width: 480px) {
    .title {
      font-size: 16px; 
      margin: 0 0 12px 0;
    }

    .subtitle {
      font-size: 13px;
      margin-bottom: 10px;
    }

    .description {
      font-size: 13px;
      line-height: 1.5;
    }
  }
</style>
