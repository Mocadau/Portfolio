<script lang="ts">
  import { navigate } from "svelte-routing";

  export let previousProject: {
    name: string;
    route: string;
    preview: string;
  };

  export let nextProject: {
    name: string;
    route: string;
    preview: string;
  };

  function goToPrevious() {
    navigate(previousProject.route);
  }

  function goToNext() {
    navigate(nextProject.route);
  }
</script>

<footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-2 gap-4">
      <button
        class="hand-drawn-border p-4 hover:-rotate-1 transition-transform bg-white text-left flex items-center gap-2"
        on:click={goToPrevious}
      >
        <img src={previousProject.preview} alt="Previous Project Preview" class="w-16 h-16 object-cover" />
        <div>
          <span class="hand-drawn-text text-sm block">← Previous</span>
          <h4 class="hand-drawn-text text-lg">{previousProject.name}</h4>
        </div>
      </button>
      <button
        class="hand-drawn-border p-4 hover:rotate-1 transition-transform bg-white text-right flex items-center gap-2 justify-end"
        on:click={goToNext}
      >
        <div>
          <span class="hand-drawn-text text-sm block">Next →</span>
          <h4 class="hand-drawn-text text-lg">{nextProject.name}</h4>
        </div>
        <img src={nextProject.preview} alt="Next Project Preview" class="w-16 h-16 object-cover" />
      </button>
    </div>
  </div>
</footer>
