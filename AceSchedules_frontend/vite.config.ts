import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001/',
        changeOrigin: true,
        secure: false,
        protocolRewrite: 'http',
      },
    },
		host: 'localhost'
  },
  build: {
    outDir: '../dist/client',
    emptyOutDir: true
  },
  plugins: [react()],
  base: '/AceSchedules/'
})
