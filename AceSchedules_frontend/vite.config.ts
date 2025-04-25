import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isProduction = process.env.NODE_ENV === 'production';

console.log(isProduction)

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: isProduction
          ? 'https://aceschedules-production.up.railway.app'
          : 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
    host: 'localhost',
  },
  plugins: [react()],
  base: isProduction ? '/AceSchedules/' : '/',
});
