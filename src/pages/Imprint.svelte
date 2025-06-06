<script lang="ts">
  import { navigate } from 'svelte-routing';
  
  function goBack() {
    navigate('/');
  }
</script>

<div class="imprint-page">
  <header class="header">
    <button on:click={goBack} class="back-button">
      ← Back to Portfolio
    </button>
  </header>

  <main class="content">
    <h1>Imprint</h1>
    
    <section class="imprint-section">
      <h2>Information according to § 5 TMG</h2>
      <div class="contact-info">
        <p><strong>Maurice Cadau</strong></p>
        <p>Portfolio Website</p>
        <p>Student at HfG Schwäbisch Gmünd</p>
      </div>
    </section>

    <section class="imprint-section">
      <h2>Contact</h2>
      <div class="contact-info">
        <p>E-Mail: <a href="mailto:contact@maurice-cadau.com">contact@maurice-cadau.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/maurice-cadau-39047a319/" target="_blank" rel="noopener noreferrer">Maurice Cadau</a></p>
      </div>
    </section>

    <section class="imprint-section">
      <h2>Disclaimer</h2>
      <div class="contact-info">
        <h3>Liability for Contents</h3>
        <p>As service providers, we are liable for own contents of these websites according to Sec. 7, para.1 German Telemedia Act (TMG). However, according to Sec. 8 to 10 German Telemedia Act (TMG), service providers are not under obligation to permanently monitor submitted or stored information or to search for evidences that indicate illegal activities.</p>
        
        <h3>Liability for Links</h3>
        <p>Our offer includes links to external third party websites. We have no influence on the contents of those websites, therefore we cannot guarantee for those contents. Providers or administrators of linked websites are always responsible for the contents of the linked websites.</p>
      </div>
    </section>
  </main>
</div>

<style>
  .imprint-page {
    min-height: 100vh;
    background: white;
    color: #000;
    font-family: 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
  }

  .header {
    padding: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .back-button {
    background: transparent;
    border: none;
    font-family: 'Helvetica Neue', sans-serif;
    font-size: 16px;
    color: #000;
    cursor: pointer;
    padding: 8px 0;
    transition: all 0.2s ease;
    text-decoration: none;
    position: relative;
  }

  .back-button:hover {
    color: #666;
  }

  .back-button:hover::after {
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

  .content {
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 40px;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: #000;
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #000;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1rem;
    margin-top: 2rem;
    color: #000;
  }

  .imprint-section {
    margin-bottom: 3rem;
  }

  .contact-info p {
    margin-bottom: 0.75rem;
    line-height: 1.6;
    color: #333;
  }

  .contact-info a {
    color: #000;
    text-decoration: none;
    position: relative;
    transition: color 0.2s ease;
  }

  .contact-info a:hover {
    color: #666;
  }

  .contact-info a:hover::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: #000;
    animation: underline 0.3s ease forwards;
  }

  @media (max-width: 768px) {
    .header {
      padding: 20px;
    }

    .content {
      padding: 40px 20px;
    }

    h1 {
      font-size: 2.5rem;
    }
  }
</style>
