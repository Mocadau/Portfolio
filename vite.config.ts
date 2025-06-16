// vite.config.js - EINFACHE LÖSUNG für den $$ Fehler
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        // KRITISCH: Dev-Modus auch für Production
        dev: false,
        // Bessere Browser-Kompatibilität
        legacy: true
      }
    })
  ],
  
  // GitHub Pages base path - entfernt da es Asset-Pfade bricht
  // base: './',
  
  build: {
    // WICHTIG: Älterer JavaScript-Standard
    target: 'es2018',
    
    rollupOptions: {
      output: {
        // LÖSUNG: Alles in eine einzige Datei packen
        inlineDynamicImports: true,
        
        // Keine Module, nur klassisches JavaScript
        format: 'iife',
        name: 'app'
      }
    },
    
    // CSS zusammenfassen
    cssCodeSplit: false
  }
})