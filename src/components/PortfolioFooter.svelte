<script lang="ts">
  import { navigate } from 'svelte-routing';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let currentSection = 'hello'; // Prop um aktuelle Sektion zu erhalten
  
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

<!-- Footer nur in der More Section anzeigen -->
{#if currentSection === 'more'}

<footer class="portfolio-footer">
  <!-- Mobile Layout: Alle Links horizontal nebeneinander unten rechts -->
  <div class="mobile-footer-container">
    <button 
      class="footer-link mobile-link" 
      on:click={handleImprint}
    >
      Imprint
    </button>
    
    <button 
      class="footer-link mobile-link" 
      on:click={handleEmail}
    >
      Email
    </button>
    
    <button 
      class="footer-link mobile-link" 
      on:click={handleLinkedIn}
    >
      LinkedIn
    </button>
  </div>

  <!-- Desktop Layout: Original Positionen -->
  <div class="desktop-footer-container">
    <!-- Links unten: Imprint -->
    <button 
      class="footer-link bottom-left desktop-link" 
      on:click={handleImprint}
    >
      Imprint
    </button>
    
    <!-- Oben rechts: Email -->
    <button 
      class="footer-link top-right desktop-link" 
      on:click={handleEmail}
    >
      Email
    </button>
    
    <!-- Unten rechts: LinkedIn -->
    <button 
      class="footer-link bottom-right desktop-link" 
      on:click={handleLinkedIn}
    >
      LinkedIn
    </button>
  </div>
</footer>
{/if}

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

  /* Mobile Footer Container - zentriert horizontal */
  .mobile-footer-container {
    display: none; /* Standardmäßig versteckt */
    position: absolute;
    bottom: 220px; /* Deutlich höher positioniert */
    left: 50%; /* Zentriert horizontal */
    transform: translateX(-50%); /* Perfekt zentriert */
    display: flex;
    flex-direction: row; /* Horizontal nebeneinander */
    gap: 2rem; /* Gleichmäßiger Abstand zwischen den Links */
    pointer-events: auto;
    justify-content: center; /* Zusätzliche Zentrierung */
    align-items: center;
  }

  /* Desktop Footer Container */
  .desktop-footer-container {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .footer-link {
    position: absolute;
    background: transparent;
    border: none;
    font-family: var(--font-family);
    font-size: 16px;
    font-weight: 500;
    color: #000;
    cursor: pointer;
    padding: 10px 0;
    transition: all 0.2s ease;
    text-decoration: none;
    pointer-events: auto;
    white-space: nowrap;
    text-align: left;
    line-height: 1.2;
  }

  /* Mobile Links - relative positioning within flex container */
  .mobile-link {
    position: relative !important;
    padding: 8px 12px; /* Horizontales Padding für bessere Klickbarkeit */
    font-size: 14px;
    background: rgba(255, 255, 255, 0.9); /* Leicht transparenter Hintergrund */
    border-radius: 4px; /* Abgerundete Ecken */
    transition: background 0.2s ease;
  }

  .mobile-link:hover {
    background: rgba(0, 0, 0, 0.05); /* Hover-Effekt */
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
    text-align: left;
  }

  .top-right {
    top: 40px;
    right: 40px;
    text-align: right;
  }

  .bottom-right {
    bottom: 40px;
    right: 40px;
    text-align: right;
  }

  /* Mobile Anpassungen */
  @media (max-width: 1024px) {
    /* Mobile Layout zeigen, Desktop verstecken */
    .mobile-footer-container {
      display: flex !important;
    }
    
    .desktop-footer-container {
      display: none !important;
    }
  }

  /* Tablet Anpassungen */
  @media (max-width: 768px) {
    .mobile-footer-container {
      bottom: 200px; /* Noch höher für Tablets */
      gap: 1.8rem; /* Etwas größerer Abstand für Tablets */
    }
    
    .mobile-link {
      font-size: 13px;
      padding: 6px 12px;
    }
  }

  /* Mobile Phone Anpassungen */
  @media (max-width: 480px) {
    .mobile-footer-container {
      bottom: 180px; /* Hoch positioniert für mobile Phones */
      gap: 1.5rem; /* Angepasster Abstand für kleinere Screens */
    }
    
    .mobile-link {
      font-size: 12px;
      padding: 5px 10px;
      font-weight: 600;
    }
  }

  /* Extra kleine Screens */
  @media (max-width: 375px) {
    .mobile-footer-container {
      bottom: 160px; /* Hoch positioniert für sehr kleine Screens */
      gap: 1.2rem; /* Kleinerer Abstand für sehr kleine Screens */
    }
    
    .mobile-link {
      font-size: 11px;
      padding: 4px 8px;
    }
  }

  /* Desktop Media Queries - nur für Desktop Container */
  @media (min-width: 1025px) {
    .mobile-footer-container {
      display: none !important;
    }
    
    .desktop-footer-container {
      display: block !important;
    }
  }

  /* Safari UI-sicherer Bereich - für Geräte mit Home Indicator */
  @supports (bottom: env(safe-area-inset-bottom)) {
    .mobile-footer-container {
      bottom: calc(160px + env(safe-area-inset-bottom)); /* Berücksichtigt Safari's Safe Area aber höher positioniert */
    }
    
    @media (max-width: 768px) {
      .mobile-footer-container {
        bottom: calc(140px + env(safe-area-inset-bottom));
      }
    }
    
    @media (max-width: 480px) {
      .mobile-footer-container {
        bottom: calc(120px + env(safe-area-inset-bottom));
      }
    }
    
    @media (max-width: 375px) {
      .mobile-footer-container {
        bottom: calc(100px + env(safe-area-inset-bottom));
      }
    }
  }
</style>
