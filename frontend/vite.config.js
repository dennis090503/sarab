import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000, // Running on port 3000 for standard frontend dev matching
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Points to our upcoming Express backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});