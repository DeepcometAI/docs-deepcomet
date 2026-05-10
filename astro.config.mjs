import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://docs.deepcomet.space',
  base: '/',
  
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  },
  
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
