<script lang="ts">
  export let title: string = '';
  export let subtitle: string = '';
  export let description: string = '';
</script>

<div class="text-block">
  {#if title}
    <h3 class="title">{title}</h3>
  {/if}
  {#if subtitle}
    <p class="subtitle">{subtitle}</p>
  {/if}
  {#if description}
    <p class="description">{description}</p>
  {/if}
  <slot />
</div>
 
<style>
  .text-block {
    width: 100%;
    text-align: left;
  }

  .title {
    color: #000;
    font-family: var(--font-family);
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 16px 0;
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
      font-size: 32px; 
      font-family: var(--font-family);
      font-weight: 700;
    }

    .subtitle {
      font-size: 16px;
      margin-bottom: 16px;
      line-height: 1.7;
    }

    .description {
      font-size: 16px;
      line-height: 1.7;
    }
  }
</style>
