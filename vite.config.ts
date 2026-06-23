import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // على Windows: ملفات public (خصوصاً الصور) تسبب EBUSY وتوقف السيرفر
      // الصور ثابتة ولا تحتاج HMR — حدّث المتصفح يدوياً بعد تغييرها
      ignored: ['**/public/**'],
      usePolling: true,
      interval: 1000,
    },
  },
});
