import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

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
  plugins: [react()]
})
