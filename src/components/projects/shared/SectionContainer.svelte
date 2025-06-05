<script lang="ts">
  import TextContent from './TextContent.svelte';
  import TextWithImages from './TextWithImages.svelte';

  export let leftComponent: 'text' | 'text-with-images' = 'text';
  export let rightComponent: 'text' | 'text-with-images' = 'text';
  
  export let leftProps: any = {};
  export let rightProps: any = {};
</script>

<div class="section-container">
  <div class="content-wrapper">
    <div class="content-side left">
      {#if leftComponent === 'text'}
        <TextContent {...leftProps} />
      {:else}
        <TextWithImages {...leftProps} />
      {/if}
    </div>
    <div class="content-side right">
      {#if rightComponent === 'text'}
        <TextContent {...rightProps} />
      {:else}
        <TextWithImages {...rightProps} />
      {/if}
    </div>
  </div>
</div>

<style>
  .section-container {
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .content-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 80px;
    position: relative;
  }

  .content-side {
    width: 45%;
    min-width: 0;
  }

  @media (max-width: 1080px) {
    .content-wrapper {
      flex-direction: column;
      gap: 60px;
    }

    .content-side {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .content-wrapper {
      gap: 40px;
    }
  }
</style>
