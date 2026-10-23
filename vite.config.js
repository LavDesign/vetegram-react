/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    // Each test sets VITE_FORMSPREE_ID explicitly; this keeps a developer's .env.local from leaking in
    unstubEnvs: true,
    unstubGlobals: true,
  },
})
