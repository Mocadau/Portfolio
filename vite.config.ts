import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // This ensures that assets in src/assets are properly handled
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg']
})
