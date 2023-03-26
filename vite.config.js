import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // your desired port
    open: true, // opens the browser automatically when running the dev server
    hmr: {
      protocol: 'ws', // use WebSocket protocol instead of the default EventSource
    },
  },
  build: {
    outDir: 'dist', // your desired output directory
    assetsDir: 'assets', // your desired assets directory
    sourcemap: true, // generate sourcemaps for debugging
  },
});
