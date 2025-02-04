import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    target: 'esnext',  // Supports top-level await
  },
  build: {
    rollupOptions: {
      external: ['react-toastify'],  // Ignore react-toastify if causing issues
    },
  },
});
