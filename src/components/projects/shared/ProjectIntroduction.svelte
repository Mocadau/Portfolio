<script lang="ts">
  export let title: string = "Introduction";
  export let summary: string;
  export let description: string;
</script>

<section class="mt-8 ml-[162px] md:ml-2.5">
  <h2 class="text-4xl font-normal">{title}</h2>
  <p class="text-sm font-light mt-6 max-w-xl">
    {summary}
  </p>
  <p class="text-sm font-light mt-10 max-w-[503px] md:max-w-full whitespace-pre-line">
    {description}
  </p>
</section>
