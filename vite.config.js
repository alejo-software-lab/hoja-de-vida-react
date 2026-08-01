import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // El API de contacto ahora es el servicio Node (api/server.js) en :3001
      "/api": "http://localhost:3001",
    },
  },
})
