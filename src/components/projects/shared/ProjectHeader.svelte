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
  <div class="mt-[111px] ml-[165px] md:mt-10 md:ml-0 md:max-w-full">
    <h1 class="text-[36px] font-['Sometype_Mono'] font-bold text-center text-black">{title}</h1>
    <img
      src={dividerSrc}
      alt="Divider"
      class="w-[288px] aspect-[58.82] object-contain mt-[10px] ml-[166px] max-w-full md:ml-2.5"
    />
    <div class="text-[20px] font-['Sometype_Mono'] mt-[5px] ml-[166px] md:ml-2.5" style="color: {yearColor}">
      {year}
    </div>
  </div>
</div>
