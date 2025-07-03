// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import UnoCSS from 'unocss/vite';

// export default defineConfig({
//   plugins: [
//     react(),
//     UnoCSS()
//   ],
//   css: {
//     devSourcemap: true, // For better CSS debugging in dev
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.jsx',
      name: 'ChatSupportWidget',
      fileName: 'chat-widget',
      formats: ['iife'],
    },
    cssCodeSplit: false,
  },
});
