<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import { initializeCameraAudio } from './lib/cameraSound';
  import Index from './pages/Index.svelte';
  import NotFound from './pages/NotFound.svelte';
  import PerForm from './pages/PerForm.svelte';
  import GlobalMigrants from './pages/GlobalMigrants.svelte';
  import Alignspace from './pages/Alignspace.svelte';
  import IpodShuffle from './pages/IpodShuffle.svelte';
  import Imprint from './pages/Imprint.svelte';
  import FlashOverlay from './components/FlashOverlay.svelte';
  import './app.css';

  export let url = "";

  onMount(() => {
    // Initialize portfolioState
    window.portfolioState = {
      isScrolling: false,
      isTopHalf: false,
      isBottomHalf: false,
      mousePosition: { y: 0 }
    };

    // Initialize camera audio in background (non-blocking)
    initializeCameraAudio().catch(error => {
      console.warn('Failed to initialize camera audio:', error);
    });

    // Global event listener to initialize audio on first user interaction
    const initAudioOnInteraction = () => {
      initializeCameraAudio().catch(error => {
        console.warn('Failed to initialize camera audio on interaction:', error);
      });
      // Remove listeners after first interaction
      document.removeEventListener('click', initAudioOnInteraction);
      document.removeEventListener('touchstart', initAudioOnInteraction);
      document.removeEventListener('keydown', initAudioOnInteraction);
    };

    document.addEventListener('click', initAudioOnInteraction, { once: true });
    document.addEventListener('touchstart', initAudioOnInteraction, { once: true });
    document.addEventListener('keydown', initAudioOnInteraction, { once: true });

    // Optional: Add custom fonts if needed
    // const fonts = [
    //   'https://fonts.googleapis.com/css2?family=Your+Custom+Font&display=swap'
    // ];

    // const links = fonts.map(href => {
    //   const link = document.createElement('link');
    //   link.rel = 'stylesheet';
    //   link.href = href;
    //   document.head.appendChild(link);
    //   return link;
    // });

    return () => {
      // links.forEach(link => document.head.removeChild(link));
      delete window.portfolioState;
    };
  });
</script>

<Router {url}>
  <main>
    <Route path="/" component={Index} />
    <Route path="/PerForm" component={PerForm} />
    <Route path="/GlobalMigrants" component={GlobalMigrants} />
    <Route path="/Alignspace" component={Alignspace} />
    <Route path="/IpodShuffle" component={IpodShuffle} />
    <Route path="/imprint" component={Imprint} />
    <Route path="*" component={NotFound} />
    <FlashOverlay />
  </main>
</Router>

<style>
  :global(body) {
    margin: 0;
    font-family: var(--font-family);
  }

  :global(.hand-drawn-text) {
    font-family: var(--font-family);
  }
</style>
