/**
 * Camera Sound Utility
 * Provides a unified camera shutter sound for all camera components
 * Optimized for all devices including mobile
 */

let audioContext: AudioContext | null = null;
let audioInitialized = false;
let audioElement: HTMLAudioElement | null = null;

// Base64 encoded camera shutter sound (optimized for mobile)
const shutterSoundBase64 = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjmLz/K6ayEFLYfR8diJOQcWarvq4p9NEAo=";

async function initializeAudioContext(): Promise<boolean> {
  if (audioInitialized && audioContext) {
    return true;
  }

  try {
    // Create audio context
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    audioInitialized = true;
    return true;
  } catch (error) {
    console.warn('Failed to initialize audio context:', error);
    return false;
  }
}

async function createCameraClickSound(): Promise<void> {
  if (!(await initializeAudioContext()) || !audioContext) {
    return;
  }

  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filterNode = audioContext.createBiquadFilter();
    
    // Configure filter for a more realistic camera sound
    filterNode.type = 'highpass';
    filterNode.frequency.setValueAtTime(800, audioContext.currentTime);
    
    // Connect nodes
    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configure oscillator for mobile-friendly sound
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.05);
    
    // Configure gain envelope for sharp click (mobile optimized)
    const currentTime = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(0.25, currentTime + 0.001); // Slightly louder for mobile
    gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.05);
    
    // Play the sound
    oscillator.start(currentTime);
    oscillator.stop(currentTime + 0.05);
    
  } catch (error) {
    console.warn('Camera click sound failed:', error);
  }
}

async function playShutterSoundFromBase64(): Promise<void> {
  try {
    // Create or reuse audio element
    if (!audioElement) {
      audioElement = new Audio(shutterSoundBase64);
      audioElement.volume = 0.4; // Slightly louder for better mobile experience
      audioElement.preload = 'auto';
    }
    
    // Reset playback position for instant replay
    audioElement.currentTime = 0;
    
    // Try to play the sound
    await audioElement.play();
  } catch (error) {
    console.warn('Base64 shutter sound failed, falling back to generated sound:', error);
    // Fallback to generated sound
    await createCameraClickSound();
  }
}

// Detect if device is mobile
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
}

export async function playCameraSound(): Promise<void> {
  try {
    // For mobile devices, prefer the audio element approach
    if (isMobileDevice()) {
      await playShutterSoundFromBase64();
    } else {
      // For desktop, try audio element first, fallback to Web Audio API
      try {
        await playShutterSoundFromBase64();
      } catch (error) {
        await createCameraClickSound();
      }
    }
  } catch (error) {
    console.warn('All camera sound methods failed:', error);
  }
}

// Initialize audio context on user interaction
export async function initializeCameraAudio(): Promise<void> {
  // Quick initialization - don't wait for everything
  try {
    await initializeAudioContext();
    
    // Pre-load audio element in background without waiting
    if (!audioElement) {
      audioElement = new Audio(shutterSoundBase64);
      audioElement.volume = 0.4;
      audioElement.preload = 'auto';
      
      // Preload without waiting (fire and forget)
      audioElement.load();
    }
  } catch (error) {
    console.warn('Camera audio initialization failed:', error);
    // Don't throw error - camera should still work
  }
}
