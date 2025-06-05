<script lang="ts">
  export let alignment: 'left' | 'right' = 'left';
  export let offsetTopClass: string = '';
</script>

<div class="block {alignment === 'right' ? 'ml-auto' : ''} {offsetTopClass}">
  <slot />
</div>

<style>
  .block {
    width: 45%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  @media (max-width: 1080px) {
    .block {
      width: 100%;
      margin-left: 0;
    }
  }
</style>
