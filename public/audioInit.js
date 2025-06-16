// Initialize audio context before any user interaction
(function() {
  try {
    // Add an attribute to document body that we can observe
    document.body.dataset.audioInit = 'pending';

    const init = () => {
      // Using type assertion to handle webkitAudioContext
      /** @type {typeof AudioContext} */
      const AudioContext = window.AudioContext || /** @type {any} */(window.webkitAudioContext);
      const ctx = new AudioContext();
      
      // Create and play silent audio to unlock WebAudio
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      
      // Store context in window for later use
      window.preInitializedAudioContext = ctx;
      
      // Mark as initialized
      document.body.dataset.audioInit = 'complete';
    };

    // Try immediate initialization
    init();

    // Backup: also try on document load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    }

  } catch (e) {
    console.warn('Audio preinitialization failed:', e);
    document.body.dataset.audioInit = 'failed';
  }
})(); // Added closing parenthesis for IIFE
