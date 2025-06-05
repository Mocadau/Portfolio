<script lang="ts">
  export let padding: string = 'py-24';
</script>

<section class="content-section {padding}">
  <slot />
</section>

<style>
  .content-section {
    width: 100%;
    position: relative;
  }
</style>
