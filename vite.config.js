import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `VITE_BASE` lets GitHub Pages builds use a sub-path (e.g. /intermaptic/)
// while Vercel builds keep the root path. See README.md.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'es2019',
    chunkSizeWarningLimit: 1600,
  },
})
