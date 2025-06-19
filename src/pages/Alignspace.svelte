<script lang="ts">
  import TextBlock from '../components/projects/migrants/Shared/TextBlock.svelte';
  import ImageBlock from '../components/projects/migrants/Shared/ImageBlock.svelte';
  import RightContent from '../components/projects/migrants/Shared/RightContent.svelte';
  import ProjectVideo from '../components/projects/shared/ProjectVideo.svelte';
  import ContentGrid from '../components/projects/migrants/Layout/ContentGrid.svelte';
  import ContentSection from '../components/projects/migrants/Layout/ContentSection.svelte';
  import NextProjectNavigation from '../components/NextProjectNavigation.svelte';
  
  // Bild-Importe
  import Bild1 from '../assets/Alignspace/intro.png';
  import Bild2 from '../assets/Alignspace/process1.png';
  import Bild3 from '../assets/Alignspace/designSystem.png';
  import Bild4 from '../assets/Alignspace/overview.png';
  import Bild5 from '../assets/Alignspace/booking.png';
  import Bild6 from '../assets/Alignspace/communication.png';
  import Bild7 from '../assets/Alignspace/service.png';
</script>

<div class="page-container">
  <header class="header">
    <a href="/" class="logo" on:click|preventDefault={() => {
      sessionStorage.setItem('scrollToWorks', 'true');
      window.location.href = '/';
    }}>
      <svg width="99" height="110" viewBox="0 0 99 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 37.3913V109H98V42.8696M1 37.3913C33.3333 37.3913 98 38.487 98 42.8696M1 37.3913L48.1255 1L98 42.8696" stroke="black"/>
      </svg>
    </a>
    
    <h1 class="title">Alignspace</h1>
    <div class="subtitle">
      <svg width="288" height="6" viewBox="0 0 288 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 3H288" stroke="#3B82F6" stroke-width="5"/>
      </svg>
      <div class="date">2024</div>
    </div>
  </header>

  <main>
    <section class="project-meta">
      <div class="meta-section">
        <h3>Team</h3>
        <div class="meta-content">
          <p>Moritz Beder</p>
          <p>Maurice Cadau</p>
        </div>
      </div>

      <div class="meta-section">
        <h3>Role</h3>
        <div class="meta-content">
          <p>UI/UX Design & Prototyping</p>
          <p>User Testing</p>
          <p>Video & Sound Design</p>
        </div>
      </div>

      <div class="meta-section">
        <h3>Duration</h3>
        <div class="meta-content">
          <p>One Semester</p>
        </div>
      </div>
    </section>

    <!-- Video Section -->
    <section class="video-section">
      <ImageBlock
        src={Bild1}
        alt="Alignspace Concept"
        enableLightbox={false}
      />
    </section>

    <!-- Introduction Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>Introduction</h2>
      </div>
      <div class="section-divider"></div>
      <div class="section-content">
        <div class="left-column">
          <TextBlock
            description="Hybrid work is now part of everyday life – but finding and booking the right workspace is often still complicated. Users want flexibility, transparency, and proximity to their team. Current systems lack personalization, real-time updates, or even a clear view of where colleagues are sitting."
          />
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>Process</h2>
      </div>
      <div class="section-divider"></div>
      <div class="section-content">
        <div class="right-column">
          <TextBlock
            description="We began with a mix of quantitative surveys and in-depth interviews with both users of co-working spaces and remote employees. These conversations revealed key pain points – from the need for social interaction and visibility of colleagues to the desire for spontaneous bookings and personalized workspaces."
          />
          <TextBlock
            description="Based on the insights, we developed user personas, including one primary persona that guided our decisions. We then framed a series of How Might We questions, which we grouped into logical categories to identify overlapping needs and unified solutions."
          />
          <TextBlock
            description="We translated these needs into high-level user flows, designed multiple interface versions, and created a consistent style guide to ensure a coherent look and feel. All this led to a fully interactive prototype – mobile and desktop – that covers key features like personalized booking, team visibility, service chat, and flexible workspace planning."
          />
        </div>
      </div>
    </section>

    <!-- Design System Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>Final Design System</h2>
      </div>
      <div class="section-divider"></div>
      <div class="section-content">
        <div class="left-column">
          <TextBlock
            description="Beyond the booking colors, our primary and secondary tones are designed to enhance usability and make interactions more intuitive. They are clearly differentiated from the booking colors to avoid any visual confusion."
          />
        </div>
        <div class="right-column">
          <TextBlock
            description="At the heart of the app is the booking system, structured around three main elements — desks, meeting rooms, and parking spaces — each visually distinguished by its own unique color."
          />
        </div>
      </div>
      <div class="section-content">
        <div class="full-width-content">
          <ImageBlock
            src={Bild3}
            alt="Design System"
            enableLightbox={false}
          />
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>Result</h2>
      </div>
      <div class="section-divider"></div>
      
      <!-- Overview Subsection - Links -->
      <div class="section-content">
        <div class="left-column">
          <TextBlock
            title="Overview"
            description="Alignspace enables users to monitor their current and upcoming bookings through continuous visibility. The platform sends timely reminders for approaching bookings and proactive renewal recommendations before expiration dates."
          />
          <ImageBlock
            src={Bild4}
            alt="Overview Interface"
          />
        </div>
      </div>

      <!-- Booking Subsection - Rechts -->
      <div class="section-content">
        <div class="right-column">
          <TextBlock
            title="Booking"
            description="The core function of Alignspace is the booking of workspaces, which can be reserved according to various filters and sorted by seat neighbors. The app also offers the option of booking meeting rooms and inviting employees to them. Parking spaces can also be reserved via the platform so that the entire working day can be organized efficiently."
          />
          <ImageBlock
            src={Bild5}
            alt="Booking Interface"
          />
        </div>
      </div>

      <!-- Communication Subsection - Links -->
      <div class="section-content">
        <div class="left-column">
          <TextBlock
            title="Communication"
            description="Alignspace offers an integrated communication tool for communicating with employees and inviting them to meetings. This facilitates coordination within the team and ensures that all relevant people are informed about appointments and bookings in good time."
          />
          <ImageBlock
            src={Bild6}
            alt="Communication Interface"
          />
        </div>
      </div>

      <!-- Service Subsection - Rechts -->
      <div class="section-content">
        <div class="right-column">
          <TextBlock
            title="Service"
            description="The service bot is available for all kinds of problems. It analyzes the request and creates a ticket for the person responsible, who then contacts the person seeking help via the communication tool."
          />
          <ImageBlock
            src={Bild7}
            alt="Service Interface"
          />
        </div>
      </div>
    </section>
  </main>
  
  <NextProjectNavigation currentProject="Alignspace" />
</div>

<style>
  .page-container {
    width: 100%;
  }

  .header {
    width: 100%;
    padding: 24px 0 100px;
    text-align: center;
  }

  .logo {
    position: absolute;
    left: 55px;
    top: 24px;
    width: 99px;
    height: 110px;
    cursor: pointer;
    transition: transform 0.2s ease;
    display: block;
  }

  .logo:hover {
    transform: scale(1.05);
  }

  .title {
    padding-top: 100px;
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  .subtitle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .date {
    font-size: 1.25rem;
    color: #333;
    font-weight: 500;
  }

  .project-meta {
    max-width: 1280px;
    margin: 0 auto 60px;
    padding: 0 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }

  .meta-section {
    min-width: 200px;
  }

  .meta-section h3 {
    font-size: 1.125rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
    color: #666;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .meta-section h3 {
      font-size: 1rem; 
    }
  }

  .meta-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .meta-content p {
    font-size: 1.25rem;
    color: #222;
    line-height: 1.4;
    margin: 0;
  }

  .section-titles {
    margin-bottom: 40px;
  }

  .section-titles h2 {
    color: #000;
    font-family: var(--font-family);
    font-size: 3.25rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }

  .section-divider {
    width: 100%;
    height: 1px;
    background-color: #000;
    opacity: 0.1;
    margin-bottom: 60px;
  }

  .video-section,
  .content-section {
    max-width: 1280px;
    margin: 0 auto 120px;
    padding: 0 40px;
  }

  .section-content {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 60px;
    margin-bottom: 180px;
  }

  .section-content:last-child {
    margin-bottom: 0;
  }

  .full-width-content {
    width: 100%;
    margin-bottom: 60px;
  }

  .section-content .right-column,
  .section-content .left-column {
    width: 45%;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .section-content .right-column {
    margin-left: auto;
  }

  /* Result Section - Größere Bilder */
  .section-content :global(.image-block) {
    transform: scale(1.4);
    transform-origin: center;
    margin: 3rem 0;
  }

  /* Design System Bild - kleiner mit margin wie rand */
  .full-width-content :global(.image-block) {
    transform: scale(1) !important;
    margin: 0 px !important;
  }

  @media (max-width: 1024px) {
    .project-meta {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 32px 24px;
    }

    .video-section,
    .content-section {
      padding: 0 20px;
    }

    .section-content {
      gap: 40px;
      margin-bottom: 120px;
    }
  }

  @media (max-width: 768px) {
    .header {
      padding: 20px 0 60px;
    }

    .logo {
      left: 24px;
      top: 24px;
    }

    .logo svg {
      width: 60px;
      height: 66px;
    }

    .title {
      padding-top: 80px;
      font-size: 2rem; 
    }

    .section-content {
      flex-direction: column;
      gap: 40px;
      margin-bottom: 100px;
    }

    .section-content .right-column,
    .section-content .left-column {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    .project-meta {
      padding: 0 20px;
      gap: 24px 20px;
    }

    .meta-section h3 {
      margin-bottom: 0.75rem;
    }

    .meta-content {
      gap: 0.5rem;
    }

    .meta-content p {
      font-size: 1rem;
    }

    .video-section,
    .content-section {
      padding: 0 20px;
      margin-bottom: 80px;
    }

    .section-titles h2 {
      font-size: 2rem; 
    }

    .section-content {
      margin-bottom: 80px;
    }
  }
</style>
