<script lang="ts">
  import GridSection from "../projects/migrants/Layout/GridSection.svelte";
  import ContentGrid from "../projects/migrants/Layout/ContentGrid.svelte";
  import TextBlock from "../projects/migrants/Shared/TextBlock.svelte";
  import ProjectVideo from "../projects/shared/ProjectVideo.svelte";
  import RightContent from "../projects/migrants/Shared/RightContent.svelte";
  import ColorNames from "../../assets/Migrants/ColorNames.png";
  import FilterOptions from "../../assets/Migrants/FilterOptions.png";
  import TimeSlider from "../../assets/Migrants/TimeSlider.png";
  import ColorMappingExample1 from "../../assets/Migrants/ColorMappingExample1.png";
  import ColorMappingExample2 from "../../assets/Migrants/ColorMappingExample2.png";
</script>

<section class="project-migrants">
  <ContentGrid>
    <GridSection leftColumnWidth="45%" rightColumnWidth="45%">
      <div slot="left-image" style="max-width: 500px; margin: 0 auto;">
        <ProjectVideo
          src="9C-4w9QFXig"
          alt="Global Missing Migrants - Datenvisualisierung"
          isYouTube={true}
          aspectRatioPercent={56.25}
        />
      </div>
      <div slot="right-content">
        <TextBlock
          title="Global Missing Migrants"
          description="Ein datengesteuertes Projekt zur Visualisierung von Migrationsbewegungen und deren tragischen Konsequenzen. Die Anwendung bietet eine interaktive Weltkarte, die verschiedene Datenpunkte und Muster aufzeigt."
        />
        <RightContent />
      </div>
    </GridSection>
  </ContentGrid>
</section>

<style>
  .project-migrants {
    width: 100%;
  }

  :global(.project-migrants h3) {
    margin: 0;
  }
</style>
