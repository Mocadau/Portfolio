<script lang="ts">
  import { navigate } from "svelte-routing";
  import performBanner from '../assets/PerformBanner.png';
  import migrantsImage from '../assets/Migrants/GlobeOverview.png';
  import alignspaceImage from '../assets/Alignspace/Ubersicht.jpg';

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
            <div class="project-image relative w-full md:w-[500px] ml-0">
              <div class="absolute inset-0 border-4 border-black border-dashed rounded-lg -rotate-1"></div>
              <div class="absolute inset-0 border-4 border-black border-dashed rounded-lg rotate-1"></div>
              <div 
                class="relative w-full h-full"
                role="button"
                tabindex="0"
                on:click={navigateToProject}
                on:keydown={(e) => e.key === 'Enter' && navigateToProject()}
              >
                <div class="w-full h-full bg-white p-[10px] cursor-pointer overflow-hidden rounded-lg">
                  <img
                    src={index === 1 ? performBanner : index === 2 ? migrantsImage : alignspaceImage}
                    alt={index === 1 ? "PerForm Banner" : index === 2 ? "Global Migrants" : "Alignspace"}
                    class="w-full h-full object-cover rounded"
                  />
                  <div class="absolute inset-[10px] border-[3px] border-black border-dashed rounded" style="pointer-events: none"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tags and description -->
          <div class="flex flex-col items-start mt-8 md:mt-[4.5rem] w-full md:w-auto">
            <div class="flex flex-wrap justify-start gap-4 md:gap-6 mb-6 md:mb-8">
              <span class="hand-drawn-text text-lg md:text-xl px-3 md:px-4 py-1 border-2 border-dashed border-black rounded-lg">{field}</span>
              <span class="hand-drawn-text text-lg md:text-xl px-3 md:px-4 py-1 border-2 border-dashed border-black rounded-lg">{category}</span>
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
    width: 100%;
    max-width: 500px;
    aspect-ratio: 16/9;
    margin: 0;
  }

  .section-container {
    height: auto;
    min-height: 100vh;
  }
</style>
