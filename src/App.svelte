<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
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
