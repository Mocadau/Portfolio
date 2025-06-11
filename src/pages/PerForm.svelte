<script lang="ts">
  import { onMount } from 'svelte';
  import TextBlock from '../components/projects/migrants/Shared/TextBlock.svelte';
  import ImageBlock from '../components/projects/migrants/Shared/ImageBlock.svelte';
  import StepImageBlock from '../components/projects/perform/StepImageBlock.svelte';
  import RightContent from '../components/projects/migrants/Shared/RightContent.svelte';
  import ProjectVideo from '../components/projects/shared/ProjectVideo.svelte';
  import ImageMosaicHealthApp from '../components/projects/migrants/Layout/ImageMosaicHealthApp.svelte';
  import AlternatingLayoutBlock from '../components/projects/migrants/Layout/AlternatingLayoutBlock.svelte';
  import ContentGrid from '../components/projects/migrants/Layout/ContentGrid.svelte';
  import ContentSection from '../components/projects/migrants/Layout/ContentSection.svelte';
  import NextProjectNavigation from '../components/NextProjectNavigation.svelte';
  
  import Bild1 from '../assets/PerForm/intro.png';
  import Bild2 from '../assets/PerForm/process1.png';
  import Bild3 from '../assets/PerForm/process2.png';
  import Bild4 from '../assets/PerForm/step1.png';
  import Bild5 from '../assets/PerForm/step2.png';
  import Bild6 from '../assets/PerForm/step3.png';
  import Bild7 from '../assets/PerForm/userInterviews.png';
  import Bild8 from '../assets/PerForm/trainerInterviews.png';
  import Bild9 from '../assets/PerForm/result1.png';
  import Bild10 from '../assets/PerForm/result2.png';
  import Bild11 from '../assets/PerForm/result3.png';
  import Bild12 from '../assets/PerForm/result4.png';
  import Bild13 from '../assets/PerForm/result5.png';
  import Bild14 from '../assets/PerForm/result6.png';
  import Bild15 from '../assets/PerForm/analysis.png';
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
    
    <h1 class="title">PerForm</h1>
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
          <p>Helen Frank</p>
          <p>Annalena Stein</p>
          <p>Jasmina Kramer</p>
          <p>Maurice Cadau</p>
        </div>
      </div>

      <div class="meta-section">
        <h3>Role</h3>
        <div class="meta-content">
          <p>Concept & Research</p>
          <p>UI/UX Design</p>
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

    <section class="video-section">
      <ProjectVideo
        src="W8jN416JFbI"
        alt="PerForm - VR Fitness Experience"
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
        <div class="intro-text">
          <TextBlock
            description="The desire to increase the safety and effectiveness of fitness exercises. Beginners in particular often perform incorrect movements, which can lead to injuries or ineffective training."
          />
        </div>
        <div class="intro-layout">
          <div class="intro-image">
            <ImageBlock
              src={Bild1}
              alt="VR Fitness Concept"
            />
          </div>
          <div class="intro-text-right">
            <TextBlock
              description="The goal of our project is a VR fitness app that uses body tracking and real-time feedback to help users perform exercises precisely and correctly by visualizing postural errors and providing step-by-step instructions."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>Process</h2>
      </div>
      <div class="section-divider"></div>
      <div class="section-content process-content">
        <div class="process-images">
          <div class="process-image">
            <ImageBlock
              src={Bild3}
              alt="Process Steps"
            />
          </div>
          <div class="process-image">
            <ImageBlock
              src={Bild2}
              alt="Process Visualization"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Steps Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>Steps</h2>
      </div>
      <div class="section-divider"></div>
      <div class="section-content">
        <div class="steps-description">
          <p>The exercise process is divided into three clear steps that guide users through proper form correction using VR technology and real-time feedback.</p>
        </div>
        <div class="steps-grid">
          <div class="step-item">
            <h3>Exercise Step 1</h3>
            <StepImageBlock
              src={Bild4}
              alt="Exercise Step 1"
              caption="User tries to do exercise correctly, wrong posture, visual aid shows him, video stops."
            />
          </div>
          
          <div class="step-item">
            <h3>Exercise Step 2</h3>
            <StepImageBlock
              src={Bild5}
              alt="Exercise Step 2"
              caption="User improves his posture with the help of visual aids"
            />
          </div>
          
          <div class="step-item">
            <h3>Exercise Step 3</h3>
            <StepImageBlock
              src={Bild6}
              alt="Exercise Step 3"
              caption="User is in the perfect position and the video continues to run so that he can move to the next position."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- First interviews Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>First interviews</h2>
        <div class="subtitle-text">9 people interviewed between the ages of 19 and 55.</div>
      </div>
      <div class="section-divider"></div>
      <div class="section-content">
        <div class="centered-column">
          <ImageBlock
            src={Bild7}
            alt="User Interview Results"
          />
        </div>
      </div>
    </section>

    <!-- Trainer Interviews Section -->
    <section class="content-section">
      <div class="section-titles">
        <h2>Interviews with trainers</h2>
        <div class="subtitle-text">3 interviewed trainers between the ages of 25 and 40.</div>
      </div>
      <div class="section-divider"></div>
      <div class="section-content">
        <div class="centered-column">
          <ImageBlock
            src={Bild8}
            alt="Trainer Interview Results"
          />
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section class="content-section results-section">
      <div class="section-titles">
        <h2>Result</h2>
      </div>
      <div class="section-divider"></div>
      <div class="section-content">
        <div class="left-column">
          <ImageBlock
            src={Bild9}
            alt="Result Visual 1"
          />
        </div>
        
        <div class="right-column">
          <ImageBlock
            src={Bild10}
            alt="Result Visual 2"
          />
        </div>
        
        <div class="left-column">
          <ImageBlock
            src={Bild11}
            alt="Result Visual 3"
          />
        </div>
        
        <div class="right-column">
          <ImageBlock
            src={Bild12}
            alt="Result Visual 4"
          />
        </div>
        
        <div class="left-column">
          <ImageBlock
            src={Bild13}
            alt="Result Visual 5"
          />
        </div>
        
        <div class="right-column">
          <ImageBlock
            src={Bild14}
            alt="Result Visual 6"
          />
        </div>
      </div>
    </section>

    <!-- Analysis Section -->
    <section class="content-section analysis-section">
      <div class="section-titles">
        <h2>Analysis</h2>
      </div>
      <div class="section-divider"></div>
      <div class="section-content">
        <div class="centered-column">
          <ImageBlock
            src={Bild15}
            alt="Analysis"
          />
        </div>
      </div>
    </section>
  </main>

  <!-- Next Project Navigation -->
  <NextProjectNavigation currentProject="PerForm" />
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

  .subtitle-text {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.5rem;
    font-weight: normal;
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
    flex-direction: column;
    gap: 180px;
  }

  .process-content {
    gap: 0;
  }

  .process-images {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 32px;
    width: 100%;
  }

  .process-image {
    width: 45%;
  }

  .steps-description {
    width: 100%;
    text-align: center;
    margin-bottom: 3rem;
  }

  .steps-description p {
    font-size: 1.25rem;
    line-height: 1.6;
    color: #666;
    max-width: 800px;
    margin: 0 auto;
  }

  .steps-grid {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
    margin: 0 auto;
    width: 100%;
    max-width: 1000px;
  }

  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    max-width: 280px;
  }

  .step-item h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #222;
  }

  .centered-column {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
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

  /* Introduction Section Layout */
  .intro-text {
    width: 65%;
    margin-bottom: 2rem;
  }

  .intro-layout {
    display: flex;
    align-items: flex-start;
    gap: 60px;
  }

  .intro-image {
    flex: 1;
    max-width: 50%;
  }

  .intro-text-right {
    flex: 1;
    max-width: 50%;
    display: flex;
    align-items: center;
    min-height: 300px;
  }

  /* Results Section - Bilder auf 120% skaliert */
  .results-section .section-content .right-column :global(.image-block),
  .results-section .section-content .left-column :global(.image-block) {
    transform: scale(1.2);
    transform-origin: center;
    margin: 2rem 0;
  }

  /* Analysis Section - Größeres Bild */
  .analysis-section .section-content .centered-column :global(.image-block) {
    transform: scale(1.4);
    transform-origin: center;
    margin: 3rem 0;
  }

  @media (max-width: 1024px) {
    .project-meta {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 32px 24px;
    }

    .section-content {
      gap: 120px;
    }

    .steps-grid {
      gap: 1.5rem;
      max-width: 900px;
    }

    .step-item {
      max-width: 250px;
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
    }

    .section-content {
      gap: 100px;
    }

    .process-images {
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .process-image {
      width: 100%;
    }

    .steps-grid {
      flex-direction: column;
      align-items: center;
      gap: 3rem;
    }

    .step-item {
      width: 100%;
      max-width: 300px;
    }

    .centered-column {
      width: 90%;
    }

    .intro-layout {
      flex-direction: column;
      gap: 2rem;
    }

    .intro-image,
    .intro-text-right {
      max-width: 100%;
    }

    .intro-text-right {
      min-height: auto;
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

    .centered-column {
      width: 100%;
    }

    .steps-description {
      margin-bottom: 2rem;
    }

    .steps-description p {
      font-size: 1rem;
    }
  }
</style>
