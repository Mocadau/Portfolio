export function optimizeImageSize(src: string, width: number): string {
  // Check if the image is from public/lovable-uploads
  if (src.includes('lovable-uploads')) {
    // These are already optimized, return as is
    return src;
  }

  // For local images (from assets), add size parameters
  const basePath = src.split('?')[0]; // Remove any existing query params
  return `${basePath}?w=${width}&q=75`; // Add width and quality parameters
}
