<script lang="ts">
  export let src: string; // Für YouTube: die Video-ID. Für Bilder: der Pfad zum Bild.
  export let alt: string = "Project Media";
  export let isYouTube: boolean = false;
  export let aspectRatioPercent: number = 56.25; // Standard 16:9. Für "weniger hoch" z.B. 50
</script>

<div class="video-wrapper w-full" style="aspect-ratio: 100 / {aspectRatioPercent};">
  {#if isYouTube}
    <div
      class="relative w-full h-full overflow-hidden"
    >
      <iframe
        class="absolute inset-0 w-full h-full border-0"
        src={`https://www.youtube.com/embed/${src}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&fs=0&origin=${encodeURIComponent(window.location.origin)}`}
        title={alt}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  {:else}
    <img
      {src}
      {alt}
      class="w-full h-full object-cover block"
    />
  {/if}
</div>
