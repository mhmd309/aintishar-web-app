import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
  server: {
    watch: {
      // على Windows: مراقبة public (خصوصاً الصور) تسبب EBUSY وتوقف السيرفر
      ignored: ['**/public/**', '**/node_modules/**', '**/.git/**', '**/dist/**'],
      usePolling: true,
      interval: 1000,
      awaitWriteFinish: {
        stabilityThreshold: 500,
        pollInterval: 100,
      },
    },
  },
});
