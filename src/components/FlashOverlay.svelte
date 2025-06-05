<script lang="ts">
  import { isFlashing } from '../stores/flash';
</script>

<div 
  class="fixed inset-0 bg-white w-screen h-screen pointer-events-none transition-opacity duration-100"
  style="z-index: 99999;"
  class:opacity-0={!$isFlashing}
  class:opacity-100={$isFlashing}
/>
