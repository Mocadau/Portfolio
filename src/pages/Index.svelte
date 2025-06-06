<script lang="ts">
  import Navigation from "../components/Navigation.svelte";
  import PortfolioViewport from "../components/PortfolioViewport.svelte";
  import type { ProjectData } from "../types/portfolio";
  import { onMount } from "svelte";

  let currentSection = "hello";

  // Project data
  const projects: ProjectData[] = [
    {
      title: "PerForm",
      description: "A VR/AR based fitness app that helps you achieve your best results through virtual training environments",
      field: "Invention Design",
      category: "App"
    },
    {
      title: "Global Migrants",
      description: "An interactive data visualization exploring global migration patterns and stories",
      field: "Data Visualization",
      category: "Web"
    },
    {
      title: "Alignspace",
      description: "A revolutionary workspace booking platform that transforms how we collaborate",
      field: "UX Design",
      category: "Concept"
    }
  ];

  // Scroll to section
  function scrollToSection(section: string) {
    const container = document.querySelector(".scroll-container");
    if (!container) return;
    
    const containerWidth = window.innerWidth;
    const maxScroll = container.scrollWidth - containerWidth;
    let targetPosition = 0;
    
    switch (section) {
      case "hello":
        targetPosition = 0;
        break;
      case "works":
        // Scroll to first project
        targetPosition = containerWidth;
        break;
      case "more":
        // Calculate position of More section (after all projects)
        targetPosition = containerWidth * (projects.length + 1);
        // Ensure we don't scroll past the maximum
        targetPosition = Math.min(targetPosition, maxScroll);
        break;
      default:
        targetPosition = 0;
    }

    // Smooth scroll to target position
    container.scrollTo({
      left: targetPosition,
      behavior: "smooth"
    });

    // Update current section
    currentSection = section;
  }

  // Handle section change
  function handleSectionChange(section: string) {
    currentSection = section;
  }

  // Mouse position tracking
  let mouseY = 0;

  function handleMouseMove(event: MouseEvent) {
    mouseY = event.clientY;
    if (window.portfolioState) {
      window.portfolioState.mousePosition.y = mouseY;
    }
  }

  onMount(() => {
    window.addEventListener('mousemove', handleMouseMove);

    // Check if we should scroll to works section
    if (sessionStorage.getItem('scrollToWorks')) {
      sessionStorage.removeItem('scrollToWorks');
      scrollToSection('works');
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });
</script>

<svelte:window on:mousemove={handleMouseMove} />

<div class="flex flex-col w-full h-screen">
  <Navigation 
    {scrollToSection} 
    {currentSection}
  />
  
  <PortfolioViewport
    {projects}
    onSectionChange={handleSectionChange}
  />
</div>

<style>
  :global(.hand-drawn-bg) {
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
</style>
