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
  let audioContext: AudioContext | null = null;
  let hasPlayedIntroSounds = false;
  let audioInitialized = false;
  let isFirstAnimation = true; // Track if this is the very first animation

  let initTimer: ReturnType<typeof setInterval>;

  // Check if animation has already played
  function hasAnimationPlayed() {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('animationCompleted') === 'true';
    }
    return false;
  }

  // Mark animation as played
  function markAnimationAsPlayed() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('hasPlayedAnimation', 'true');
    }
  }

  // Initialize AudioContext with continuous attempts
  async function initializeAudio() {
    try {
      if (!audioContext) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContext = new AudioContext({ latencyHint: "interactive" });
      }

      // Try to resume immediately
      await audioContext.resume();

      // Create a buffer with very quiet pink noise
      const sampleRate = audioContext.sampleRate;
      const buffer = audioContext.createBuffer(2, sampleRate * 0.1, sampleRate);
      for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const data = buffer.getChannelData(channel);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0;
        for (let i = 0; i < buffer.length; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + white * 0.5362) * 0.00001;
        }
      }

      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.00001; // Extremely quiet
      source.buffer = buffer;
      source.loop = true;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      source.start(0);
      
      // Keep checking audio context state
      if (!initTimer) {
        initTimer = setInterval(() => {
          if (audioContext.state === 'running') {
            audioInitialized = true;
            clearInterval(initTimer);
          } else {
            audioContext.resume().catch(() => {});
          }
        }, 100);
      }

      audioInitialized = audioContext.state === 'running';
      return audioInitialized;
    } catch (e) {
      console.warn('Audio initialization attempt:', e);
      return false;
    }
  }

  async function createTypewriterSound() {
    if (!(await initializeAudio())) return;
    
    try {
      const oscillator = audioContext!.createOscillator();
      const gainNode = audioContext!.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext!.destination);
      
      // Zufällige Frequenz für mechanischen Typewriter-Effekt
      const baseFreq = 800 + Math.random() * 200;
      const currentTime = audioContext!.currentTime;
      
      oscillator.frequency.setValueAtTime(baseFreq, currentTime);
      
      // Kurzer Klick-Sound mit besserer Envelope
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, currentTime + 0.001);
      gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.02);
      
      oscillator.start(currentTime);
      oscillator.stop(currentTime + 0.02);
    } catch (e) {
      console.warn('Typewriter sound failed:', e);
    }
  }

  async function createDeepTypingSound(frequency = 300, duration = 0.08, volume = 0.15) {
    if (!(await initializeAudio())) return;
    
    try {
      const oscillator = audioContext!.createOscillator();
      const gainNode = audioContext!.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext!.destination);
      
      const currentTime = audioContext!.currentTime;
      
      // Tiefere Frequenz für dramatischen Effekt
      oscillator.frequency.setValueAtTime(frequency, currentTime);
      
      // Längerer, tieferer Sound mit besserer Envelope
      gainNode.gain.setValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, currentTime + 0.002);
      gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + duration);
      
      oscillator.start(currentTime);
      oscillator.stop(currentTime + duration);
    } catch (e) {
      console.warn('Deep typing sound failed:', e);
    }
  }

  async function playIntroTypingSounds() {
    // Check if animation has already played
    if (hasPlayedIntroSounds || !isFirstAnimation || text !== "HELLO" || hasAnimationPlayed()) {
      return;
    }
    
    hasPlayedIntroSounds = true;
    markAnimationAsPlayed();

    // Initialize audio first
    if (!(await initializeAudio())) {
      console.warn('Audio not available for intro sounds');
      return;
    }

    // Sequenz von tiefen Typing-Geräuschen vor dem eigentlichen Tippen
    const introSounds = [
      { freq: 250, delay: 0, duration: 0.1, volume: 0.12 },
      { freq: 280, delay: 150, duration: 0.08, volume: 0.15 },
      { freq: 260, delay: 280, duration: 0.09, volume: 0.13 },
      { freq: 290, delay: 420, duration: 0.07, volume: 0.16 },
      { freq: 270, delay: 520, duration: 0.08, volume: 0.14 }
    ];

    for (const sound of introSounds) {
      setTimeout(() => {
        createDeepTypingSound(sound.freq, sound.duration, sound.volume);
      }, sound.delay);
    }
  }

  function startTyping() {
    // If HELLO text and animation has already played, show immediately
    if (text === "HELLO" && hasAnimationPlayed()) {
      displayText = text;
      isComplete = true;
      dispatch('complete');
      return;
    }

    timer = setInterval(async () => {
      if (currentIndex < text.length) {
        displayText = text.substring(0, currentIndex + 1);
        currentIndex++;
        
        // Only play sound for first visit or non-HELLO text
        if (text[currentIndex - 1] !== ' ' && (!hasAnimationPlayed() || text !== "HELLO")) {
          await createTypewriterSound();
        }
      } else {
        clearInterval(timer);
        isComplete = true;
        dispatch('complete');
      }
    }, speed);
  }

  onMount(() => {
    const startAudioAndAnimation = async () => {
      // Check if animation has already played
      const hasPlayed = hasAnimationPlayed();

      if (!hasPlayed) {
        // Try multiple parallel initialization attempts for first-time visitors
        const attempts = [
          initializeAudio(),
          new Promise(resolve => setTimeout(() => initializeAudio().then(resolve), 100)),
          new Promise(resolve => setTimeout(() => initializeAudio().then(resolve), 300)),
          new Promise(resolve => setTimeout(() => initializeAudio().then(resolve), 500))
        ];

        Promise.any(attempts)
          .then(async () => {
            if (text === "HELLO" && isFirstAnimation && !hasPlayedIntroSounds) {
              await playIntroTypingSounds();
            }
          })
          .catch(console.warn);
      }
    };

    // Start audio initialization if needed
    startAudioAndAnimation();

    // Start the animation
    const delayTimer = setTimeout(() => {
      if (text === "HELLO" && hasAnimationPlayed()) {
        // If HELLO text and not first visit, show immediately without animation
        displayText = text;
        isComplete = true;
        dispatch('complete');
      } else {
        startTyping();
      }
      
      // No longer first animation after any animation completes
      isFirstAnimation = false;
    }, delayStart);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
      clearInterval(initTimer);
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
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
