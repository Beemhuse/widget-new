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


// Second working one

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     lib: {
//       entry: 'src/index.jsx',
//       name: 'ChatSupportWidget',
//       fileName: 'chat-widget',
//       formats: ['iife'],
//     },
//     cssCodeSplit: false,
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'), // ⬅️ fix
  },
  build: {
    lib: {
      entry: 'src/index.jsx',
      name: 'ChatSupportWidget',
      fileName: 'chat-widget',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
