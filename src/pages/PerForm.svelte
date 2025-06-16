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
  import SpeechIcon from '../assets/PerForm/SpeechIcon.png';
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
      <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
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
      </div>
    </section>

    <!-- Process Section -->
    <section class="content-section">
      <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
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
      </div>
    </section>

    <!-- Steps Section -->
    <section class="content-section">
      <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div class="section-titles">
          <h2>Steps</h2>
        </div>
        <div class="section-divider"></div>
        <div class="section-content">
        <div class="steps-description">
          <p>The training system follows a three-step process that corrects user posture through VR technology and real-time feedback.</p>
        </div>
        <div class="steps-grid">
          <div class="step-item">
            <h3>Step 1: Detection</h3>
            <StepImageBlock
              src={Bild4}
              alt="Step 1: Detection"
              caption="The user attempts the exercise. When the system detects incorrect posture, visual cues appear and the video pauses."
            />
          </div>
          
          <div class="step-item">
            <h3>Step 2: Correction</h3>
            <StepImageBlock
              src={Bild5}
              alt="Step 2: Correction"
              caption="The user adjusts their posture using the visual guidance provided by the system."
            />
          </div>
          
          <div class="step-item">
            <h3>Step 3: Confirmation</h3>
            <StepImageBlock
              src={Bild6}
              alt="Step 3: Confirmation"
              caption="Once the user achieves correct form, the video resumes and progresses to the next movement."
            />
          </div>
        </div>
        </div>
      </div>
    </section>

    <!-- First interviews Section -->
    <section class="content-section">
      <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div class="section-titles">
          <h2>User Research Insights</h2>
          <div class="subtitle-text">9 people interviewed between the ages of 19 and 55.</div>
        </div>
        <div class="section-divider"></div>
        <div class="section-content">
          <!-- User Research Statistics -->
          <div class="research-stats">
            <div class="stat-item">
              <div class="stat-number">78%</div>
              <div class="stat-description">have used videos as exercise guides</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-number">67%</div>
              <div class="stat-description">had positive experiences with personal trainers</div>
            </div>
            
            <div class="stat-item">
              <div class="stat-number">22%</div>
              <div class="stat-description">had no prior trainer experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trainer Interviews Section -->
    <section class="content-section">
      <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div class="section-titles">
          <h2>Key Findings</h2>
          <div class="subtitle-text">3 interviewed trainers between the ages of 25 and 40.</div>
        </div>
        <div class="section-divider"></div>
        <div class="section-content">
          <!-- Key Findings Text Content -->
          <div class="key-findings">
            <div class="finding-item">
              <div class="finding-icon">
                <img src={SpeechIcon} alt="Speech Icon" />
              </div>
              <div class="finding-text">
                Visual demonstration proves most effective - verbal instructions alone often fall short.
              </div>
            </div>
            
            <div class="finding-item">
              <div class="finding-icon">
                <img src={SpeechIcon} alt="Speech Icon" />
              </div>
              <div class="finding-text">
                Most users lack initial body awareness, making targeted corrections essential.
              </div>
            </div>
            
            <div class="finding-item">
              <div class="finding-icon">
                <img src={SpeechIcon} alt="Speech Icon" />
              </div>
              <div class="finding-text">
                Slow, controlled executions at the beginning improve the later performance.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section class="content-section">
      <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
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
      </div>
    </section>

    <!-- Analysis Section -->
    <section class="content-section">
      <div class="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
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

  .subtitle-text {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.5rem;
    font-weight: normal;
  }

  @media (max-width: 768px) {
    .subtitle-text {
      font-size: 1rem;
    }
  }

  .section-divider {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin: 0 auto 3rem auto;
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

  /* Results Section - Vergrößerter Bereich ohne Abschneiden */
  .content-section:nth-child(6) {
    overflow: visible;
  }
  
  .content-section:nth-child(6) .container {
    max-width: none;
    padding: 0 2rem;
  }
  
  .content-section:nth-child(6) .section-content {
    transform: scale(1);
    transform-origin: center;
    margin: 4rem 0;
    overflow: visible;
  }
  
  .content-section:nth-child(6) .section-content .right-column :global(.image-block),
  .content-section:nth-child(6) .section-content .left-column :global(.image-block) {
    overflow: visible;
  }

  @media (max-width: 1024px) {
    .content-section:nth-child(6) .section-content {
      transform: scale(1.2);
      margin: 3rem 0;
    }
    
    .content-section:nth-child(6) .container {
      padding: 0 1rem;
    }
  }

  @media (max-width: 768px) {
    .content-section:nth-child(6) .section-content {
      transform: scale(1.1);
      margin: 2rem 0;
    }
  }

  @media (max-width: 480px) {
    .content-section:nth-child(6) .section-content {
      transform: scale(1.0);
      margin: 1rem 0;
    }
    
    .content-section:nth-child(6) .container {
      padding: 0 0.5rem;
    }
  }

  /* Analysis Section - Container in voller Breite wie video-section */
  .content-section:nth-child(9) .section-content .centered-column :global(.image-block) {
    width: 100%;
    max-width: 100%;
    transform: none;
    transform-origin: center;
    margin: 3rem 0;
  }
  
  .content-section:nth-child(9) .section-content .centered-column {
    width: 100%;
    max-width: 100%;
  }

  /* User Research Statistics */
  .research-stats {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 10rem;
    margin-top: 3rem;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 2rem;
  }

  .stat-item {
    text-align: center;
    flex: 1;
    max-width: 350px;
  }

  .stat-number {
    font-size: 3rem;
    font-weight: bold;
    color: #000;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .stat-description {
    font-size: 1rem;
    line-height: 1.5;
    color: #333;
    font-weight: 400;
  }

  /* Key Findings */
  /* Key Findings - begrenzt auf Trennlinien-Breite */
  .key-findings {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    margin-top: 3rem;
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
  }

  .finding-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
    max-width: 280px;
  }

  .finding-icon {
    margin-bottom: 1.5rem;
  }

  .finding-icon img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  .finding-text {
    font-size: 1rem;
    line-height: 1.5;
    color: #333;
    font-weight: 400;
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
      font-size: 2rem;
    }

    .section-titles h2 {
      font-size: 2rem;
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

    .title {
      font-size: 2rem; /* Weitere Reduzierung für sehr kleine Bildschirme */
    }

    .section-titles h2 {
      font-size: 2rem; /* Konsistent mit anderen Projekten */
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

    .research-stats {
      flex-direction: column;
      align-items: center;
      gap: 2.5rem;
      margin-top: 2rem;
      padding: 0 1rem;
      max-width: 400px;
    }

    .stat-item {
      max-width: 100%;
      width: 100%;
    }

    .stat-number {
      font-size: 2.5rem;
    }

    .stat-description {
      font-size: 1rem; 
    }

    .key-findings {
      flex-direction: column;
      gap: 3rem;
      margin-top: 2rem;
      padding: 0 1rem;
    }

    .finding-item {
      max-width: 100%;
    }

    .finding-icon img {
      width: 50px;
      height: 50px;
    }

    .finding-text {
      font-size: 1rem; 
    }
  }

  /* Container System für einheitliche Margins */
  .container {
    max-width: 1280px;
    margin: 0 auto;
  }

  /* Content Section Basis-Styling */
  .content-section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 4rem 0;
  }

  @media (max-width: 1024px) {
    .content-section:nth-child(7) .section-content {
      font-size: 1rem;
      line-height: 1.5;
    }
    
    .content-section:nth-child(7) .stat-description {
      font-size: 1rem;
      line-height: 1.5;
    }
    
    .content-section:nth-child(7) .stat-number {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    .content-section:nth-child(7) .section-content {
      font-size: 1rem;
      line-height: 1.5;
    }
    
    .content-section:nth-child(7) .stat-description {
      font-size: 1rem;
      line-height: 1.5;
    }
    
    .content-section:nth-child(7) .stat-number {
      font-size: 2rem;
    }
    
    .content-section:nth-child(8),
    .content-section:nth-child(9) {
      min-height: auto;
      padding: 0;
      margin: 0;
    }
  }

  @media (max-width: 480px) {
    .content-section:nth-child(7) .stat-number {
      font-size: 1.8rem;
    }
    
    .content-section:nth-child(7) .stat-description {
      font-size: 1rem; 
    }
  }

  /* Key Findings Section - entferne min-height */
  .content-section:nth-child(6) {
    min-height: auto;
    padding: 0;
  }
  
  /* Results Section - entferne padding und min-height */
  .content-section:nth-child(8) {
    min-height: auto;
    padding: 0;
  }
  .content-section:nth-child(9) {
    min-height: auto;
    padding: 0;
  }

  /* User Research Insights Section - mit Abstand */
  .content-section:nth-child(7) {
    min-height: auto;
    padding-top: 3rem;
    padding-bottom: 3rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .content-section:nth-child(7) .section-titles {
    margin-bottom: 1rem;
  }

  .content-section:nth-child(7) .section-divider {
    margin-bottom: 1.5rem;
  }

  /* Result Section - Bilder in normaler Größe */
  .content-section:nth-child(8) :global(.image-block img) {
    transform: scale(1.0);
    transform-origin: center;
  }

  /* Analysis Section - Bild in voller Container-Breite wie video-section */
  .content-section:nth-child(9) :global(.image-block img) {
    width: 100%;
    max-width: 100%;
    height: auto;
    transform: none;
    transform-origin: center;
  }

  @media (max-width: 768px) {
    .content-section:nth-child(8) .section-content .left-column,
    .content-section:nth-child(8) .section-content .right-column {
      width: 100%;
      margin: 0;
    }
    
    .content-section:nth-child(8) .section-content {
      flex-direction: column;
      gap: 60px;
    }
    
    .content-section:nth-child(8) .section-content .left-column :global(.image-block),
    .content-section:nth-child(8) .section-content .right-column :global(.image-block) {
      width: 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    .content-section:nth-child(8) .section-content {
      gap: 40px;
    }
  }

  /* Results Section - Bilder in normaler Größe */
  .content-section:nth-child(8) :global(.image-block img) {
    transform: scale(1.0);
    transform-origin: center;
  }

  /* Results Section - letztes Bild bekommt Abstand zur Analysis Section */
  .content-section:nth-child(8) .section-content .right-column:last-child :global(.image-block) {
    margin-bottom: 4rem;
  }
  
  .content-section:nth-child(8) .section-content .right-column:last-child :global(.image-block img) {
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    .content-section:nth-child(8) .section-content .right-column:last-child :global(.image-block) {
      margin-bottom: 3rem;
    }
  }

  @media (max-width: 480px) {
    .content-section:nth-child(8) .section-content .right-column:last-child :global(.image-block) {
      margin-bottom: 2rem;
    }
  }

  /* Analysis Section - Container in voller Breite wie video-section */
  .content-section:nth-child(9) .section-content .centered-column :global(.image-block) {
    width: 100%;
    max-width: 100%;
    transform: none;
    transform-origin: center;
    margin: 3rem 0;
  }
  
  .content-section:nth-child(9) .section-content .centered-column {
    width: 100%;
    max-width: 100%;
  }
</style>
