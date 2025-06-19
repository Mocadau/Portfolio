<script lang="ts">
  import MoreSection from '../components/MoreSection.svelte';
</script>

<svelte:head>
  <title>More - Portfolio</title>
</svelte:head>

<div class="page-container">
  <header class="header">
    <a href="/" class="logo">
      <svg width="99" height="110" viewBox="0 0 99 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 37.3913V109H98V42.8696M1 37.3913C33.3333 37.3913 98 38.487 98 42.8696M1 37.3913L48.1255 1L98 42.8696" stroke="black"/>
      </svg>
    </a>
    
    <h1 class="title">More</h1>
  </header>

  <main>
    <MoreSection />
  </main>
</div>

<style>
  .page-container {
    min-height: 100vh;
    background: white;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 3rem;
    background: white;
    position: relative;
    z-index: 10;
  }

  .logo {
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  .logo:hover {
    opacity: 0.7;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    font-family: var(--font-family);
  }

  @media (max-width: 768px) {
    .header {
      padding: 1.5rem 2rem;
    }

    .title {
      font-size: 2rem;
    }
  }

  @media (max-width: 480px) {
    .header {
      padding: 1rem 1.5rem;
    }

    .title {
      font-size: 1.5rem;
    }
  }
</style>
