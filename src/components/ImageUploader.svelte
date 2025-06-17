<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { isProcessing } from '../stores/photoProcessing';
  import { isFlashing } from '../stores/flash';
  import { playCameraSound, initializeCameraAudio } from '../lib/cameraSound';
  import camera from '../assets/polaroid-camera.svg';
  const dispatch = createEventDispatcher();
  let fileInput: HTMLInputElement;

  async function handleCameraClick() {
    if (!$isProcessing && fileInput) {
      // Play camera sound
      await playCameraSound();
      fileInput.click();
    }
  }

  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (!file) return;
    
    isProcessing.set(true);
    
    // Create object URL for the file
    const imageUrl = URL.createObjectURL(file);
    
    // Trigger flash effect
    isFlashing.set(true);
    
    // Reset flash and processing state after transition
    setTimeout(() => {
      isFlashing.set(false);
      dispatch('upload', { url: imageUrl });
      isProcessing.set(false);
      if (fileInput) fileInput.value = '';
    }, 200); // Match the duration-100 class (100ms) plus a small buffer
  }
</script>

<div class="relative">
  <input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    on:change={handleFileSelect}
    class="hidden"
    disabled={$isProcessing}
  />
  
  <button
    class="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md relative cursor-pointer"
    on:click|preventDefault={handleCameraClick}
    aria-label="Upload image"
  >
    <img
      src={camera}
      alt="Camera"
      class="w-6 h-6"
      class:opacity-50={$isProcessing}
    />
  </button>
</div>
