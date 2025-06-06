<script>
  import { onMount } from 'svelte';
  
  function triggerAnimation() {
    console.log('🚀 DIRECT TEST: Triggering animation');
    if (window.testAnimation) {
      window.testAnimation();
    }
    if (window.startNavigationAnimation) {
      window.startNavigationAnimation();
    }
  }

  onMount(() => {
    // Auto-trigger nach 3 Sekunden für automatischen Test
    setTimeout(() => {
      console.log('🧪 AUTO-TRIGGER: Starting animation automatically');
      triggerAnimation();
    }, 3000);
  });
</script>

<!-- Visible test button -->
<button 
  on:click={triggerAnimation}
  style="
    position: fixed;
    top: 20px;
    right: 20px;
    background: red;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 9999;
    font-weight: bold;
  "
>
  🧪 TEST ANIMATION
</button>
