<script lang="ts">
  import TextBlock from '../components/projects/migrants/Shared/TextBlock.svelte';
  import ImageBlock from '../components/projects/migrants/Shared/ImageBlock.svelte';
  import RightContent from '../components/projects/migrants/Shared/RightContent.svelte';
  import ProjectVideo from '../components/projects/shared/ProjectVideo.svelte';
  import ImageMosaicHealthApp from '../components/projects/migrants/Layout/ImageMosaicHealthApp.svelte';
  import AlternatingLayoutBlock from '../components/projects/migrants/Layout/AlternatingLayoutBlock.svelte';
  import ContentGrid from '../components/projects/migrants/Layout/ContentGrid.svelte';
  import ContentSection from '../components/projects/migrants/Layout/ContentSection.svelte';
  import NextProjectNavigation from '../components/NextProjectNavigation.svelte';
  import datasetsImage from '../assets/Migrants/Datasets.png';
  import ColorNames from '../assets/Migrants/ColorNames.png';
  import ColorMappingExample1 from '../assets/Migrants/ColorMappingExample1.png';
  import ColorMappingExample2 from '../assets/Migrants/ColorMappingExample2.png';
  import GlobeOverview from '../assets/Migrants/GlobeOverview.png';
  import InfoCardExample from '../assets/Migrants/InfoCardExample.png';
  import TimeSlider from '../assets/Migrants/TimeSlider.png';
  import FilterOptions from '../assets/Migrants/FilterOptions.png';
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
    
    <h1 class="title">Global Missing Migrants</h1>
    <div class="subtitle">
      <svg width="288" height="6" viewBox="0 0 288 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 3H288" stroke="#CE1010" stroke-width="5"/>
      </svg>
      <div class="date">2024</div>
    </div>
  </header>

  <main>
    <section class="project-meta">
      <div class="meta-section">
        <h3>Team</h3>
        <div class="meta-content">
          <p>Franz Anhäupl</p>
          <p>Helen Frank</p>
          <p>Lisa-Marie Rapp</p>
          <p>Maurice Cadau</p>
        </div>
      </div>

      <div class="meta-section">
        <h3>Role</h3>
        <div class="meta-content">
          <p>Concept & Research</p>
          <p>UI/UX Design</p>
          <p>Illustration</p>
          <p>Video & Sound Design</p>
        </div>
      </div>

      <div class="meta-section">
        <h3>Duration</h3>
        <div class="meta-content">
          <p>Two weeks</p>
        </div>
      </div>
    </section>

    <section class="video-section">
      <ProjectVideo
        src="9C-4w9QFXig"
        alt="Global Missing Migrants - Datenvisualisierung"
        isYouTube={true}
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
            subtitle="An interactive 3D globe that visualizes global migration routes, risk zones, and key patterns—bringing human stories behind the statistics to the surface."
            description="We worked with the Missing Migrants dataset to uncover patterns in global migration crises. Some visuals confirmed our assumptions—others challenged them. Mapping the data onto a globe revealed surprising, often overlooked narratives."
          />
        </div>
      </div>
    </section>

    <!-- Dataset Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>Dataset</h2>
      </div>
      <div class="section-divider"></div>

      <div class="section-content">
        <div class="right-column">
          <TextBlock
            description="Quick overview of our dataset Missing Migrants 2014-2023"
          />
          <ImageBlock
            src={datasetsImage}
            alt="Dataset Overview"
          />
        </div>
      </div>
    </section>

    <!-- Color Mapping & Representation Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>Color Mapping & Representation</h2>
      </div>
      <div class="section-divider"></div>

      <div class="section-content">
        <div class="left-column">
          <TextBlock
            description="We used a clear color system to distinguish data points: Gray marks inactive or unselected states. Active incidents are shown using a color gradient and varying dot sizes to convey severity and impact."
          />
          <ImageMosaicHealthApp
            images={[
              { src: ColorNames, alt: "Color Names" },
              { src: ColorMappingExample1, alt: "Color Mapping Example 1" },
              { src: ColorMappingExample2, alt: "Color Mapping Example 2" }
            ]}
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>Features</h2>
      </div>
      <div class="section-divider"></div>
      <div class="section-content">
        <!-- Globe Overview (Right Column) -->
        <div class="right-column">
          <TextBlock
            title="Globe Overview"
            description="The 3D globe view displays all incidents with pins. Red dots scale in size and brightness to show intensity, providing an immediate visual understanding of critical areas."
          />
          <ImageBlock
            src={GlobeOverview}
            alt="Globe Overview"
          />
        </div>

        <!-- Infocard (Left Column) -->
        <div class="left-column">
          <TextBlock
            title="Infocard"
            description="Expandable info cards give detailed context about each event. An integrated speaker button plays an AI-generated voice reading the text aloud."
          />
          <ImageBlock
            src={InfoCardExample}
            alt="Info Card Example"
          />
        </div>

        <!-- Time Slider (Right Column) -->
        <div class="right-column">
          <TextBlock
            title="Time Slider"
            description="A dynamic timeline lets users explore how migration patterns evolved over the years. The slider updates the globe view in real-time, showing changes in routes and hotspots."
          />
          <ImageBlock
            src={TimeSlider}
            alt="Time Slider"
          />
        </div>

        <!-- Filter Options (Left Column) -->
        <div class="left-column">
          <TextBlock
            title="Filter Options"
            description="Advanced filtering system lets users sort incidents by multiple criteria including time period, cause of death, and gender. This granular control helps uncover specific patterns in the data."
          />
          <ImageBlock
            src={FilterOptions}
            alt="Filter Options"
          />
        </div>
      </div>
    </section>

    <div class="section-spacer"></div>

    <!-- Reflections Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>Reflections</h2>
      </div>
      <div class="section-divider"></div>
      <div class="section-content">
        <div class="reflection-text">
          <p>This project was a deep dive into both the technical side of 3D visualization and the responsibility that comes with working on real-world data. Building with Three.js sharpened our skills in interactive design, while engaging with the dataset taught us how to extract and communicate meaningful insights.</p>
          <p>Using the globe and time slider, we uncovered migration hotspots like the Mexican border, the Darién Gap, and the Mediterranean Sea—regions where risk and tragedy converge. Some patterns aligned with what we expected; others surprised us and shifted our understanding.</p>
          <p>More than anything, this project reminded us that behind every data point is a human story. It reinforced the importance of visibility, empathy, and design's role in raising awareness around urgent global issues like forced migration.</p>
        </div>
      </div>
    </section>
  </main>
  
  <NextProjectNavigation currentProject="GlobalMigrants" />
</div>

<style>
  .page-container {
    width: 100%;
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
    font-family: var(--font-family);
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

  @media (max-width: 1024px) {
    .project-meta {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 32px 24px;
    }

    .meta-section h3 {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .meta-content p {
      font-size: 1rem; 
    }
  }

  @media (max-width: 480px) {
    .project-meta {
      padding: 0 20px;
      gap: 24px 20px;
    }

    .meta-section h3 {
      margin-bottom: 0.75rem;
      font-family: var(--font-family);
      font-size: 1rem;
    }

    .meta-content {
      gap: 0.5rem;
    }

    .meta-content p {
      font-size: 1rem;
    }
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
  }

    @media (max-width: 768px) {
      .header {
        padding: 20px 0 60px;
      }

      .logo {
        position: absolute;
        left: 24px;
        top: 24px;
      }
      
      .logo svg {
        width: 60px;
        height: 66px;
      }

      .title {
        padding-top: 80px;
      }
    }

  .title {
    font-size: 4rem;  /* Larger, more impactful title */
    font-weight: 700;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
    line-height: 1.1;
    font-family: var(--font-family);
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
    font-family: var(--font-family);
  }

  .video-section,
  .content-section {
    max-width: 1280px;
    margin: 0 auto 120px;
    padding: 0 40px;
  }

  .section-titles {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  .section-titles h2 {
    color: #000;
    font-family: var(--font-family);
    font-size: 3.25rem;
    font-weight: 700;
    margin: 0;
    width: 45%;
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

  .section-content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 180px;
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

  .reflection-text {
    width: 45%;
    margin-right: auto;
    margin-left: 0;
    font-size: 1.375rem;  /* 22px */
    line-height: 1.8;
    color: #222;
    font-family: var(--font-family);
    font-weight: 400;
  }

  .reflection-text p {
    margin-bottom: 32px;
  }

  .reflection-text p:last-child {
    margin-bottom: 0;
  }



  @media (max-width: 1080px) {
    .video-section,
    .content-section {
      padding: 0 20px;
    }

    .section-titles {
      flex-direction: column;
      gap: 24px;
      margin-bottom: 30px;
    }

    .section-titles h2 {
      font-size: 32px;
      width: 100%;
      font-family: var(--font-family);
      font-weight: 700;
    }

    .section-divider {
      margin-bottom: 40px;
    }

    .section-content {
      gap: 120px;
    }

    .section-content .right-column,
    .section-content .left-column,
    .reflection-text {
      width: 100%;
    }

    .header {
      margin: 120px 0 80px;
    }
  }

  @media (max-width: 768px) {
    .video-section,
    .content-section {
      padding: 0 15px;
    }

    .section-content {
      gap: 100px;
    }

    .reflection-text {
      font-size: 16px;
      font-family: var(--font-family);
      font-weight: 400;
    }

    .header {
      margin: 100px 0 60px;
    }

    /* Features Section Titles - smaller on mobile */
    .content-section:nth-child(7) :global(.text-block .title) {
      font-size: 16px !important;
    }
  }

  @media (max-width: 480px) {
    /* Features Section Titles - even smaller on small mobile */
    .content-section:nth-child(7) :global(.text-block .title) {
      font-size: 14px !important;
    }
  }
</style>
