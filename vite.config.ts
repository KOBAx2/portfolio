import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteYaml from "@modyfi/vite-plugin-yaml"

// https://vite.dev/config/
export default defineConfig({
  base: "/portfolio/",
  build: {
    outDir: "docs",
  },
  plugins: [
    vue(),
    ViteYaml(),
  ],
})
