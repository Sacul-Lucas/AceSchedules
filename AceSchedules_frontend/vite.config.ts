import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    server: {
      proxy: {
        '/api': {
          target: isProduction
            ? 'https://aceschedules.onrender.com'
            : 'http://localhost:5001',
          changeOrigin: true,
        },
      },
      host: 'localhost',
    },
    plugins: [react()],
    base: '/AceSchedules/',
  };
});
