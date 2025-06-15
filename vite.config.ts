import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// Plugin to fix module script MIME type issue for GitHub Pages
function fixModuleScript() {
  return {
    name: 'fix-module-script',
    generateBundle(_options: any, bundle: any) {
      // Find the index.html file
      const htmlFile = bundle['index.html'];
      if (htmlFile && htmlFile.type === 'asset' && typeof htmlFile.source === 'string') {
        // Remove type="module" from script tags
        htmlFile.source = htmlFile.source.replace(
          /(<script[^>]*)\s+type="module"([^>]*>)/g,
          '$1$2'
        );
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), fixModuleScript()],
  base: '/', // Root-Pfad für Custom Domain
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // This ensures that assets in src/assets are properly handled
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2015',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        format: 'iife'
      }
    }
  },
  server: {
    fs: {
      strict: false
    }
  }
})
