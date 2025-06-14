<script lang="ts">
  import { navigate } from 'svelte-routing';
  
  function goBack() {
    navigate('/');
  }
</script>

<div class="imprint-page">
  <header class="header">
    <button on:click={goBack} class="back-button">
      <svg width="99" height="110" viewBox="0 0 99 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 37.3913V109H98V42.8696M1 37.3913C33.3333 37.3913 98 38.487 98 42.8696M1 37.3913L48.1255 1L98 42.8696" stroke="black"/>
      </svg>
    </button>
  </header>

  <main class="content">
    <h1>Imprint</h1>
    
    <section class="imprint-section">
      <h2>Information according to § 5 TMG</h2>
      <div class="contact-info">
        <p><strong>Maurice Cadau</strong></p>
        <p>c/o HfG Schwäbisch Gmünd</p>
        <p>Rektor-Klaus-Straße 100</p>
        <p>73525 Schwäbisch Gmünd</p>
        <p>Germany</p>
      </div>
    </section>

    <section class="imprint-section">
      <h2>Contact</h2>
      <div class="contact-info">
        <p>E-Mail: <a href="mailto:maurice.cadau@hfg-gmuend.de">maurice.cadau@hfg-gmuend.de</a></p>
        <p>Telephone: upon request</p>
      </div>
    </section>

    <section class="imprint-section">
      <h2>Person responsible for content according to § 18 (2) MStV</h2>
      <div class="contact-info">
        <p>Maurice Cadau</p>
      </div>
    </section>

    <section class="imprint-section">
      <h2>Note on VAT identification number</h2>
      <div class="contact-info">
        <p>A VAT identification number is not required, as according to § 27a UStG no value added tax is applied.</p>
      </div>
    </section>

    <section class="imprint-section">
      <h2>Privacy Policy</h2>
      
      <h3>1. Data protection at a glance</h3>
      <div class="contact-info">
        <p><strong>General information</strong></p>
        <p>The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data are all data with which you can be personally identified.</p>
        
        <p><strong>Data collection on this website</strong></p>
        <p><strong>Who is responsible for data collection on this website?</strong></p>
        <p>Data processing on this website is carried out by the website operator. You can find the operator's contact details in the imprint of this website.</p>
      </div>

      <h3>2. Hosting</h3>
      <div class="contact-info">
        <p>This website is hosted by an external service provider (host). The personal data collected on this website is stored on the host's servers. This may include, but is not limited to, IP addresses, contact inquiries, meta and communication data, contract data, contact data, names, website accesses, and other data generated through a website.</p>
      </div>

      <h3>3. General notes and mandatory information</h3>
      <div class="contact-info">
        <p><strong>Data protection</strong></p>
        <p>The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with legal data protection regulations as well as this privacy policy.</p>
      </div>

      <h3>4. Data collection on this website</h3>
      <div class="contact-info">
        <p><strong>Cookies</strong></p>
        <p>This website does not use cookies.</p>
        <p><strong>Server log files</strong></p>
        <p>The provider of the pages automatically collects and stores information in so-called server log files that your browser automatically sends to us.</p>
      </div>

      <h3>5. Your rights</h3>
      <div class="contact-info">
        <p>You have the right at any time to obtain free information about the origin, recipient, and purpose of your stored personal data.</p>
      </div>
    </section>

    <section class="imprint-section">
      <h2>Copyright notice</h2>
      
      <h3>Copyright</h3>
      <div class="contact-info">
        <p>© Copyright Maurice Cadau 2025. All rights reserved. Text, images, graphics, sound, animations, and videos on this website are protected by copyright law and other protective laws. The content of this website may not be copied, distributed, modified, or made accessible to third parties.</p>
      </div>
    </section>

    <section class="imprint-section">
      <h2>Disclaimer of liability</h2>
      
      <h3>Liability</h3>
      <div class="contact-info">
        <p>This website has been compiled with the greatest care. However, no guarantee can be given for the accuracy, completeness, and timeliness of the content. Any liability for damages arising directly or indirectly from the use of this website is excluded, unless they are based on intent or gross negligence. If this website contains links to external websites operated by third parties, the operator is not responsible for their content.</p>
      </div>
    </section>
  </main>
</div>

<style>
  .imprint-page {
    min-height: 100vh;
    background: white;
    color: #000;
    font-family: var(--font-family);
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
    cursor: pointer;
    padding: 8px;
    transition: all 0.2s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back-button svg {
    width: 40px;
    height: 44px;
    transition: transform 0.2s ease;
  }

  .back-button:hover svg {
    transform: scale(1.05);
  }

  .content {
    max-width: 900px;
    margin: 0 auto;
    padding: 60px 40px;
    text-align: left;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: #000;
    letter-spacing: -0.02em;
    text-align: left;
    line-height: 1.1;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    margin-top: 2.5rem;
    color: #000;
    text-align: left;
    line-height: 1.2;
  }

  h3 {
    font-size: 1.375rem;
    font-weight: 500;
    margin-bottom: 1rem;
    margin-top: 2rem;
    color: #000;
    text-align: left;
    line-height: 1.3;
  }

  .imprint-section {
    margin-bottom: 3.5rem;
    text-align: left;
  }

  .contact-info {
    text-align: left;
    padding-left: 0;
  }

  .contact-info p {
    margin-bottom: 0.875rem;
    line-height: 1.7;
    color: #333;
    font-size: 1rem;
    text-align: left;
  }

  .contact-info strong {
    font-weight: 600;
    color: #000;
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
      padding: 25px 20px;
    }

    .content {
      padding: 50px 25px;
      max-width: 100%;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 2.5rem;
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.25rem;
    }

    h3 {
      font-size: 1.25rem;
    }

    .contact-info p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    .content {
      padding: 40px 20px;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    h2 {
      font-size: 1.375rem;
    }

    .contact-info p {
      font-size: 0.9rem;
      line-height: 1.6;
    }
  }
</style>
