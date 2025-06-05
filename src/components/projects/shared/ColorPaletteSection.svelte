<script lang="ts">
  export let mainImage: string;
  export let colorPaletteImage: string;
  export let colorExampleImage: string;
  export let colors: Array<{hex: string, color: string}>;
  export let description: string;
  export let bulletPoints: string[] = [];
</script>

<div class="self-end mt-[54px] w-[511px] max-w-full md:mt-10">
  <div class="grid grid-cols-2 gap-5 md:grid-cols-1 md:gap-0">
    <div class="text-sm font-light">
      <img
        src={mainImage}
        alt="Color Mapping"
        class="w-full h-auto mb-4"
      />
      <h3 class="font-bold mb-4">Color Mapping & Representation</h3>
      <p>{description}</p>
      {#if bulletPoints.length > 0}
        <ul class="list-disc ml-5 mt-2">
          {#each bulletPoints as point}
            <li>{point}</li>
          {/each}
        </ul>
      {/if}
    </div>

    <div class="flex items-start gap-2">
      <div class="color-palette space-y-2.5">
        <div class="flex items-center gap-2">
          <img src={colorPaletteImage} alt="Color Names" class="w-[105px] h-auto" />
          {#each colors as {hex, color}}
            <div class="flex items-center gap-2">
              <span class="text-sm font-light">#{hex}</span>
              <div class="w-9 h-9 rounded-full" style="background-color: #{color}"></div>
            </div>
          {/each}
        </div>
      </div>

      <div class="mt-2">
        <div class="border border-black rounded-lg p-1">
          <img
            src={colorExampleImage}
            alt="Color Mapping Example"
            class="w-[136px] aspect-[1.25] object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</div>
