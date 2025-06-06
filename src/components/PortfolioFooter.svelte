<script lang="ts">
  import { navigate } from 'svelte-routing';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  function handleImprint() {
    navigate('/imprint');
  }
  
  function handleEmail() {
    // Trigger the email overlay above the walking figure
    dispatch('showEmailOverlay');
  }
  
  function handleLinkedIn() {
    window.open('https://www.linkedin.com/in/maurice-cadau-39047a319/', '_blank', 'noopener,noreferrer');
  }
</script>

<footer class="portfolio-footer">
  <!-- Links unten: Imprint -->
  <button 
    class="footer-link bottom-left" 
    on:click={handleImprint}
  >
    Imprint
  </button>
  
  <!-- Oben rechts: E-Mail -->
  <button 
    class="footer-link top-right" 
    on:click={handleEmail}
  >
    E-Mail
  </button>
  
  <!-- Unten rechts: LinkedIn -->
  <button 
    class="footer-link bottom-right" 
    on:click={handleLinkedIn}
  >
    LinkedIn
  </button>
</footer>

<style>
  .portfolio-footer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 1000;
  }

  .footer-link {
    position: absolute;
    background: transparent;
    border: none;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    cursor: pointer;
    padding: 8px 0;
    transition: all 0.2s ease;
    text-decoration: none;
    pointer-events: auto;
    white-space: nowrap;
  }

  .footer-link:hover {
    color: #666;
  }

  .footer-link:hover::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #000;
    animation: underline 0.3s ease forwards;
  }

  @keyframes underline {
    from { width: 0; }
    to { width: 100%; }
  }

  /* Positionierung */
  .bottom-left {
    bottom: 40px;
    left: 40px;
  }

  .top-right {
    top: 40px;
    right: 40px;
  }

  .bottom-right {
    bottom: 40px;
    right: 40px;
  }

  /* Mobile Anpassungen */
  @media (max-width: 768px) {
    .footer-link {
      font-size: 14px;
    }
    
    .bottom-left {
      bottom: 20px;
      left: 20px;
    }

    .top-right {
      top: 20px;
      right: 20px;
    }

    .bottom-right {
      bottom: 20px;
      right: 20px;
    }
  }
</style>
