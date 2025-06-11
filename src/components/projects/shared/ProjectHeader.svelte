<script lang="ts">
  export let logoSrc: string;
  export let title: string;
  export let dividerSrc: string;
  export let year: string;
  export let yearColor: string = "#DE2D2D";
</script>

<div class="w-full flex flex-col items-start">
  <!-- Logo Section -->
  <div class="w-full flex justify-start">
    <img
      src={logoSrc}
      alt="Project Logo"
      class="w-[98px] aspect-[0.89] object-contain object-center"
    />
  </div>

  <!-- Title Section -->
  <div class="mt-[111px] ml-[165px] md:mt-10 md:ml-0 md:max-w-full text-left">
    <h1 class="text-[36px] font-bold text-left text-black" style="font-family: var(--font-family);">{title}</h1>
    <img
      src={dividerSrc}
      alt="Divider"
      class="w-[288px] aspect-[58.82] object-contain mt-[10px] ml-[166px] max-w-full md:ml-2.5"
    />
    <div class="text-[20px] mt-[5px] ml-[166px] md:ml-2.5 text-left" style="color: {yearColor}; font-family: var(--font-family);">
      {year}
    </div>
  </div>
</div>
