<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';

  export let text: string;
  export let speed = 100;
  export let delayStart = 0;
  export let underline = false;

  const dispatch = createEventDispatcher();
  
  let displayText = "";
  let isComplete = false;
  let currentIndex = 0;
  let timer: ReturnType<typeof setInterval>;
  
  function startTyping() {
    timer = setInterval(() => {
      if (currentIndex < text.length) {
        displayText = text.substring(0, currentIndex + 1);
        currentIndex++;
      } else {
        clearInterval(timer);
        isComplete = true;
        dispatch('complete');
      }
    }, speed);
  }

  onMount(() => {
    const delayTimer = setTimeout(() => {
      startTyping();
    }, delayStart);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  });
</script>

<div class="typing-container" class:typing-complete={isComplete}>
  <div class="typing-text" class:relative={underline}>
    {displayText}
    {#if underline && isComplete}
      <span class="absolute -bottom-2 left-0 w-full border-b-4 border-black"></span>
    {/if}
  </div>
</div>
