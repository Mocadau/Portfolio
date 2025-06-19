<script lang="ts">
  import { navigate } from "svelte-routing";
  import performBanner from '../assets/PerformBanner.png';
  import migrantsImage from '../assets/Migrants/GlobeOverview.png';
  import alignspaceImage from '../assets/Alignspace/Ubersicht.png';
  import aboutMeImage from '../assets/AboutMe.png';

  export let currentProject: 'PerForm' | 'GlobalMigrants' | 'Alignspace';

  // Project data with images and routes
  const projects = [
    {
      name: 'PerForm',
      title: 'PerForm',
      image: performBanner,
      route: '/PerForm',
      description: 'VR/AR Fitness App'
    },
    {
      name: 'GlobalMigrants',
      title: 'Global Migrants',
      image: migrantsImage,
      route: '/GlobalMigrants',
      description: 'Data Visualization'
    },
    {
      name: 'Alignspace',
      title: 'Alignspace',
      image: alignspaceImage,
      route: '/Alignspace',
      description: 'Workspace Platform'
    }
  ];

  // About Me data
  const aboutMe = {
    title: 'More',
    image: aboutMeImage,
    route: '/#more',
    description: 'Learn more about me'
  };

  // Get current project index
  const currentIndex = projects.findIndex(p => p.name === currentProject);
  
  // Get previous and next projects
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Show About Me button if current project is Alignspace
  const showAboutMeButton = currentProject === 'Alignspace';

  function navigateToProject(route: string) {
    if (route.startsWith('/#')) {
      // Navigate to home page and scroll to specific section
      const section = route.split('#')[1];
      sessionStorage.setItem(`scrollTo${section.charAt(0).toUpperCase() + section.slice(1)}`, 'true');
      window.location.href = '/';
    } else {
      navigate(route);
    }
  }
</script>

<section class="next-project-navigation">
  <div class="navigation-container">
    <div class="section-divider"></div>
    <div class="navigation-content">
      <!-- Previous Project -->
      {#if prevProject}
        <div class="project-nav-item prev-project">
          <button 
            class="nav-button"
            on:click={() => navigateToProject(prevProject.route)}
          >
            <div class="project-thumbnail">
              <img src={prevProject.image} alt={prevProject.title} />
            </div>
            <div class="project-info">
              <h4 class="project-title hand-drawn-text">{prevProject.title}</h4>
              <p class="project-desc hand-drawn-text">{prevProject.description}</p>
            </div>
          </button>
        </div>
      {/if}

      <!-- Next Project -->
      {#if nextProject}
        <div class="project-nav-item next-project">
          <button 
            class="nav-button"
            on:click={() => navigateToProject(nextProject.route)}
          >
            <div class="project-thumbnail">
              <img src={nextProject.image} alt={nextProject.title} />
            </div>
            <div class="project-info">
              <h4 class="project-title hand-drawn-text">{nextProject.title}</h4>
              <p class="project-desc hand-drawn-text">{nextProject.description}</p>
            </div>
          </button>
        </div>
      {/if}

      <!-- About Me Button (only shown when current project is Global Migrants) -->
      {#if showAboutMeButton}
        <div class="project-nav-item about-me-project">
          <button 
            class="nav-button"
            on:click={() => navigateToProject(aboutMe.route)}
          >
            <div class="project-thumbnail">
              <img src={aboutMe.image} alt={aboutMe.title} />
            </div>
            <div class="project-info">
              <h4 class="project-title hand-drawn-text">{aboutMe.title}</h4>
              <p class="project-desc hand-drawn-text">{aboutMe.description}</p>
            </div>
          </button>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .next-project-navigation {
    width: 100%;
    padding: 4rem 2rem;
    background: white;
  }

  .navigation-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-divider {
    width: 100%;
    height: 1px;
    background-color: #000;
    opacity: 0.1;
    margin-bottom: 60px;
  }

  .navigation-content {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .project-nav-item {
    flex: 0 1 400px;
    max-width: 400px;
    background: white;
  }

  .project-nav-item:hover {
    background: white;
  }

  .project-nav-item:active {
    background: white !important;
  }

  .project-nav-item:focus {
    background: white !important;
  }

  .nav-button {
    width: 100%;
    background: white;
    border: none;
    border-radius: 12px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .nav-button:hover {
    transform: scale(1.01);
    background: #f5f5f5;
  }

  .nav-button:active {
    background: white !important;
    transform: scale(1.01);
  }

  .nav-button:focus {
    background: white !important;
    outline: none;
  }

  .nav-button:focus:not(:hover) {
    background: white !important;
  }

  .project-thumbnail {
    width: 100%;
    height: 180px;
    border-radius: 8px;
    overflow: hidden;
  }

  .project-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .project-info {
    text-align: center;
  }

  .project-title {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  .project-desc {
    font-size: 1rem;
    margin: 0;
    color: #666;
  }

  /* Explicit white background for prev/next project items */
  .prev-project {
    background: white !important;
  }

  .next-project {
    background: white !important;
  }

  .about-me-project {
    background: white !important;
  }

  .prev-project:hover,
  .next-project:hover,
  .about-me-project:hover {
    background: white !important;
  }

  .prev-project:active,
  .next-project:active,
  .about-me-project:active {
    background: white !important;
  }

  .prev-project:focus,
  .next-project:focus,
  .about-me-project:focus {
    background: white !important;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .next-project-navigation {
      padding: 2rem 1rem;
    }

    .navigation-content {
      flex-direction: column;
      align-items: center;
    }

    .project-nav-item {
      flex: none;
      width: 100%;
      max-width: 350px;
    }

    .project-thumbnail {
      height: 150px;
    }
  }

  /* Ensure only one button per row when both prev/next exist */
  @media (min-width: 769px) {
    .navigation-content:has(.prev-project):has(.next-project) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }
  }
</style>
