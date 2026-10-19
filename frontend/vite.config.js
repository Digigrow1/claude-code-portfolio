import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Polling is needed when the source is bind-mounted from Windows into the
// dev container (docker-compose.dev.yml) because file events don't propagate.
const usePolling = process.env.VITE_USE_POLLING === 'true'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    watch: usePolling ? { usePolling: true, interval: 300 } : undefined,
  },
  preview: {
    port: 4173,
  },
})
