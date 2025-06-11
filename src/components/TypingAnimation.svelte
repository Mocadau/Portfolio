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

  // Initialize AudioContext properly with user interaction
  async function initializeAudio() {
    if (audioInitialized && audioContext && audioContext.state === 'running') {
      return true;
    }

    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      audioInitialized = true;
      return true;
    } catch (e) {
      console.error('Audio initialization failed:', e);
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
    // Nur beim allerersten Text und nur einmal global
    if (hasPlayedIntroSounds || !isFirstAnimation || text !== "HELLO") {
      return;
    }
    
    // Global flag setzen, damit es nie wieder abgespielt wird
    if (typeof window !== 'undefined') {
      if (window.hasPlayedGlobalIntroSounds) {
        return;
      }
      window.hasPlayedGlobalIntroSounds = true;
    }
    
    hasPlayedIntroSounds = true;

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
    timer = setInterval(async () => {
      if (currentIndex < text.length) {
        displayText = text.substring(0, currentIndex + 1);
        currentIndex++;
        
        // Spiele normale Typewriter-Sounds nur für sichtbare Zeichen (nicht Leerzeichen)
        if (text[currentIndex - 1] !== ' ') {
          await createTypewriterSound();
        }
      } else {
        clearInterval(timer);
        isComplete = true;
        dispatch('complete');
      }
    }, speed);
  }

  onMount(async () => {
    // Initialize audio context early
    const initAudio = async () => {
      try {
        await initializeAudio();
      } catch (e) {
        console.warn('Initial audio setup failed, will retry on user interaction');
      }
    };

    // Try to initialize immediately
    initAudio();

    // Also try on first user interaction
    const handleFirstInteraction = async () => {
      await initializeAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    const delayTimer = setTimeout(async () => {
      // Spiele tiefe Intro-Sounds nur beim allerersten "HELLO" Text
      if (text === "HELLO" && isFirstAnimation && !hasPlayedIntroSounds) {
        await playIntroTypingSounds();
        // Warte bis Intro-Sounds fertig sind, dann starte Typing
        setTimeout(() => {
          startTyping();
        }, 650);
      } else {
        // Alle anderen Texte starten sofort ohne Intro-Sounds
        startTyping();
      }
      
      // Nach dem ersten Text ist es nicht mehr die erste Animation
      isFirstAnimation = false;
    }, delayStart);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
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
