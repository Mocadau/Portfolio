<script lang="ts">
  import { navigate } from "svelte-routing";
</script>

<div class="flex flex-col items-center justify-center h-screen">
  <h1 class="text-4xl font-bold mb-4 hand-drawn-text">404 - Page Not Found</h1>
  <button 
    class="px-4 py-2 bg-black text-white rounded hand-drawn-text"
    on:click={() => navigate("/")}
  >
    Go Home
  </button>
</div>
