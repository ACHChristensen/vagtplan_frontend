import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://vagtplanlaegning.onrender.com', // TODO: replace with deployed backend port
    },
  },
});
