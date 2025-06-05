<script lang="ts">
  let isInflated = false;

  function handleInflateBalloons() {
    if (!isInflated) {
      isInflated = true;
    }
  }
</script>

<div 
  class="interaction-area-top flex justify-center cursor-pointer"
  on:click={handleInflateBalloons}
>
  <svg class="w-full h-full" viewBox="0 0 300 200">
    <g 
      class="transition-transform duration-1000"
      class:translate-y-[-100px]={isInflated}
      transform="translate(150, 80)"
    >
      <circle cx="-20" cy="0" r="20" fill="#f87171" stroke="#000" stroke-width="2" stroke-dasharray="2,1" stroke-linejoin="round" />
      <circle cx="20" cy="0" r="20" fill="#60a5fa" stroke="#000" stroke-width="2" stroke-dasharray="2,1" stroke-linejoin="round" />
      <circle cx="0" cy="-10" r="20" fill="#fbbf24" stroke="#000" stroke-width="2" stroke-dasharray="2,1" stroke-linejoin="round" />
      <line x1="-20" y1="20" x2="-20" y2="70" stroke="#000" stroke-width="1" stroke-dasharray="2,2" />
      <line x1="20" y1="20" x2="20" y2="70" stroke="#000" stroke-width="1" stroke-dasharray="2,2" />
      <line x1="0" y1="10" x2="0" y2="70" stroke="#000" stroke-width="1" stroke-dasharray="2,2" />
      <rect x="-30" y="30" width="60" height="40" fill="#fff" stroke="#000" stroke-width="2" />
      <text x="0" y="55" text-anchor="middle" font-size="12" font-family="Arial">Project 2</text>
    </g>
  </svg>
</div>
