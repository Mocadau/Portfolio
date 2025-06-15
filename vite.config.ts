import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    // Custom plugin to fix the HTML output for GitHub Pages
    {
      name: 'github-pages-fix',
      closeBundle() {
        const indexPath = path.join(__dirname, 'dist', 'index.html')
        if (fs.existsSync(indexPath)) {
          let html = fs.readFileSync(indexPath, 'utf-8')
          // Remove type="module" from script tags for GitHub Pages compatibility
          html = html.replace(/type="module"\s+crossorigin/g, 'crossorigin')
          fs.writeFileSync(indexPath, html)
          console.log('Fixed index.html for GitHub Pages compatibility')
        }
      }
    }
  ],
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
    target: 'es2015', // Use es2015 instead of es5 for better compatibility
    minify: 'terser', // Use terser instead of esbuild for es2015
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        format: 'iife',
        name: 'SvelteApp'
      }
    }
  },
  // Ensure proper module handling
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  server: {
    fs: {
      strict: false
    }
  }
})
