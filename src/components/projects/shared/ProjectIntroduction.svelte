<script lang="ts">
  export let title: string = "Introduction";
  export let summary: string;
  export let description: string;
</script>

<section class="mt-8 ml-[162px] md:ml-2.5 text-left">
  <h2 class="text-4xl font-normal text-left" style="font-family: var(--font-family);">{title}</h2>
  <p class="text-base font-light mt-6 max-w-xl text-left leading-relaxed" style="font-family: var(--font-family);">
    {summary}
  </p>
  <p class="text-base font-light mt-10 max-w-[550px] md:max-w-full whitespace-pre-line text-left leading-relaxed" style="font-family: var(--font-family);">
    {description}
  </p>
</section>
