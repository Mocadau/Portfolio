<script lang="ts">
  import { handleViewProject, handleVisitWebsite } from "./ProjectThreeInteractions";
  import ProjectInsights from "./shared/ProjectInsights.svelte";
  import ColorPaletteSection from "./shared/ColorPaletteSection.svelte";
  import ProjectIntroduction from "./shared/ProjectIntroduction.svelte";
  import TextWithImages from "./shared/TextWithImages.svelte";

  import ColorMappingExample1 from "../../assets/Migrants/ColorMappingExample1.png";
  import ColorMappingExample2 from "../../assets/Migrants/ColorMappingExample2.png";
  import FilterOptions from "../../assets/Migrants/FilterOptions.png";
  import TimeSlider from "../../assets/Migrants/TimeSlider.png";
  import ColorNames from "../../assets/Migrants/ColorNames.png";
</script>

<div class="project-bottom">
  <ProjectIntroduction
    title="Global Missing Migrants"
    summary="Eine interaktive Datenvisualisierung zur globalen Migration"
    description="Eine interaktive Datenvisualisierung der Missing Migrants Database. Das Projekt zeigt auf einer interaktiven Weltkarte, wo Migranten auf ihren Routen ums Leben gekommen sind."
  />

  <ProjectInsights
    paragraphs={[
      "Komplexe Geodaten-Visualisierung mit D3.js",
      "Performante Verarbeitung großer Datensätze",
      "Interaktive Filterung und Timeline",
      "Responsive Design für verschiedene Bildschirmgrößen"
    ]}
  />

  <TextWithImages
    title="Features"
    description="Die Anwendung ermöglicht es Benutzern, durch verschiedene Filter und eine Timeline die Daten zu explorieren. Farbkodierung und intuitive Kontrollelemente machen die Navigation einfach."
    images={[
      { src: FilterOptions, alt: "Filter Options UI" },
      { src: TimeSlider, alt: "Interactive Time Slider" }
    ]}
  />

  <ColorPaletteSection
    mainImage={ColorMappingExample1}
    colorPaletteImage={ColorNames}
    colorExampleImage={ColorMappingExample2}
    colors={[
      { hex: "1f77b4", color: "1f77b4" },
      { hex: "ff7f0e", color: "ff7f0e" },
      { hex: "2ca02c", color: "2ca02c" },
      { hex: "f8f9fa", color: "f8f9fa" }
    ]}
    description="Die Farbpalette wurde sorgfältig ausgewählt, um verschiedene Datenkategorien klar voneinander zu unterscheiden und eine intuitive visuelle Hierarchie zu schaffen."
    bulletPoints={[
      "Kontrastreiche Farben für bessere Lesbarkeit",
      "Konsistente Farbkodierung für Datenkategorien",
      "Harmonische Abstufungen für verwandte Informationen"
    ]}
  />
</div>

<style>
  .project-bottom {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 120px;
  }

  @media (max-width: 768px) {
    .project-bottom {
      gap: 80px;
    }
  }
</style>
