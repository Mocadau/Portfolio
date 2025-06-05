<script lang="ts">
  export let spacing: string = 'gap-24';
</script>

<div class="content-grid {spacing}">
  <slot />
</div>

<style>
  .content-grid {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2.5rem;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  @media (max-width: 1080px) {
    .content-grid {
      padding: 0 1.25rem;
    }
  }

  @media (max-width: 768px) {
    .content-grid {
      padding: 0 1rem;
    }
  }
</style>
