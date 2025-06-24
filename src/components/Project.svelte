<script lang="ts">
  import { navigate } from "svelte-routing";
  import performBanner from '../assets/PerformBanner.png';
  import migrantsImage from '../assets/Migrants/GlobeOverview.png';
  import alignspaceImage from '../assets/Alignspace/Ubersicht.png';

  export let title: string;
  export let description: string;
  export let field: string;
  export let category: string;
  export let index: number;
  export let className = ''; // Default to empty string

  // Get route based on project index
  function getProjectRoute(projectIndex: number): string {
    switch(projectIndex) {
      case 1:
        return '/PerForm';
      case 2:
        return '/GlobalMigrants';
      case 3:
        return '/Alignspace';
      default:
        return '/';
    }
  }

  // Save current scroll position before navigating to project
  function navigateToProject() {
    // Save current scroll position
    const container = document.querySelector(".scroll-container");
    if (container) {
      const currentScrollPosition = container.scrollLeft;
      const containerWidth = window.innerWidth;
      
      // Only save if we're currently in the projects area (not at hello or more sections)
      if (currentScrollPosition >= containerWidth && currentScrollPosition < containerWidth * 4) {
        sessionStorage.setItem('projectsScrollPosition', currentScrollPosition.toString());
      }
    }
    
    // Navigate to the project page
    navigate(getProjectRoute(index));
  }
</script>

<section class="section-container bg-white flex items-center justify-center overflow-y-auto {className}">
  <div class="project-container w-full max-w-5xl mx-auto">
    <div class="flex justify-center">
      <div class="w-full max-w-[1000px] relative flex flex-col">
        <div class="flex flex-col md:flex-row justify-start md:gap-12 px-4 md:px-0">
          <div class="flex flex-col w-full md:w-auto items-start">
            <!-- Title -->
            <h2 class="text-3xl md:text-5xl mb-4 md:mb-8 hand-drawn-title text-left">{title}</h2>
            
            <!-- Image -->
            <div class="project-image relative w-full md:w-[584px] ml-0">
              <div class="project-border absolute border-4 border-black border-solid"></div>
              <div 
                class="relative w-full h-full overflow-visible z-10"
                role="button"
                tabindex="0"
                on:click={navigateToProject}
                on:keydown={(e) => e.key === 'Enter' && navigateToProject()}
              >
                <div class="w-full h-full bg-white cursor-pointer">
                  <img
                    src={index === 1 ? performBanner : index === 2 ? migrantsImage : alignspaceImage}
                    alt={index === 1 ? "PerForm Banner" : index === 2 ? "Global Migrants" : "Alignspace"}
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Tags and description -->
          <div class="flex flex-col items-start mt-12 md:mt-[5rem] w-full md:w-auto">
            <div class="flex flex-wrap justify-start gap-4 md:gap-6 mb-6 md:mb-8">
              <span class="project-tag hand-drawn-text text-lg md:text-xl">{field}</span>
              <span class="project-tag hand-drawn-text text-lg md:text-xl">{category}</span>
            </div>
            <p class="hand-drawn-text text-xl md:text-2xl max-w-full md:max-w-md text-left">{description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .project-image {
    position: relative;
    width: 584px; /* Feste Breite für alle Projekte */
    height: 334px; /* Feste Höhe für alle Projekte */
    margin: 0;
    /* Entferne padding für direkten Kontakt zwischen Bild und Border */
    padding: 0;
    overflow: visible;
    /* Sicherstellen, dass das Container seine Größe beibehält */
    flex-shrink: 0;
  }

  .section-container {
    height: auto;
    min-height: 100vh;
  }

  /* Spezifische Styles für die Border */
  .project-border {
    /* Einzelner solider Border ohne Rotation */
    border-style: solid;
    border-width: 4px;
    border-color: #000;
    /* Border außerhalb des Bildes positionieren */
    inset: -4px;
    border-radius: 0; /* Eckige Ecken */
  }

  /* Für Global Migrants - Border komplett schwarz ausfüllen */
  .project-item:nth-child(2) .project-border {
    background-color: black;
    border-color: black;
    /* Border bis zum äußersten Rand erweitern */
    inset: -8px;
    z-index: 0;
  }

  /* Tag-Styles - exakt gleiche Border wie Projekt-Border */
  .project-tag {
    border-style: solid;
    border-width: 4px;
    border-color: #000;
    border-radius: 0; /* Eckige Ecken */
    padding: 0.25rem 0.75rem; /* px-3 py-1 equivalent für Desktop */
    display: inline-block;
  }

  /* Responsive Padding für Tags */
  @media (min-width: 768px) {
    .project-tag {
      padding: 0.25rem 1rem; /* px-4 py-1 equivalent für Desktop */
    }
  }

  /* Mobile Anpassungen für Projekt-Bilder */
  @media (max-width: 768px) {
    .project-image {
      width: 350px; /* Feste Breite für Mobile */
      height: 200px; /* Feste Höhe für Mobile */
    }
  }

  /* Sicherstellen, dass alle Bilder die gleiche Größe haben und den Border-Container ausfüllen */
  .project-image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Bilder füllen den Container vollständig aus */
    border-radius: 0; /* Eckige Ecken */
  }

  /* Sicherstellen, dass der innere Container den Border-Bereich vollständig ausfüllt */
  .project-image > div > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0; /* Entferne das padding damit das Bild den Border ausfüllt */
  }

  /* Projektinformationen für alle Projekte 1px nach unten verschieben */
  .flex.flex-col.items-start.mt-12 {
    transform: translateY(-4px);
  }

  /* Global Migrants (zweites Projekt) - seitliche Ränder entfernen */
  .project-item:nth-child(2) .project-image {
    background-color: black;
  }

  .project-item:nth-child(2) .project-image img {
    object-fit: cover;
    object-position: center;
    transform: scale(1.05);
  }

  /* Alle Container-Elemente im Global Migrants Projekt schwarz machen */
  .project-item:nth-child(2) .project-image .bg-white,
  .project-item:nth-child(2) .project-image .w-full.h-full,
  .project-item:nth-child(2) .project-image > div,
  .project-item:nth-child(2) .project-image > div > div {
    background-color: black !important;
  }

  /* Border-Bereich ebenfalls schwarz mit vollständiger Füllung */
  .project-item:nth-child(2) .project-image {
    background-color: black !important;
    /* Entferne jeglichen Abstand */
    margin: 0;
    padding: 0;
    /* Border-Box für präzise Kontrolle */
    box-sizing: border-box;
  }

  /* Relativer Container ebenfalls schwarz */
  .project-item:nth-child(2) .project-image .relative {
    background-color: black !important;
    /* Komplett bis zum Rand füllen */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Alignspace (drittes Projekt) - weiße Flächen entfernen */
  .project-item:nth-child(3) .project-image img {
    object-fit: cover;
    object-position: center;
  }
</style>^
