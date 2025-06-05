<script lang="ts">
  export let paragraphs: string[];
</script>

<section class="mt-[196px] ml-[162px] md:mt-10 md:max-w-full">
  <h3 class="text-sm">Reflections & Insights</h3>
  <div class="text-sm mt-4 space-y-4">
    {#each paragraphs as paragraph}
      <p>{paragraph}</p>
    {/each}
  </div>
</section>
