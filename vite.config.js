import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: ['es2022', 'chrome89', 'edge89', 'firefox79', 'safari14.1'],
  },
})
