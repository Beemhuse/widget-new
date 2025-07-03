import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.jsx'],
  format: ['iife'],
  globalName: 'ChatSupportWidget',
  sourcemap: false,
  minify: true,
  dts: false,
  clean: true,
  injectStyle: false,
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'), // ← this is key!
  },
  loader: {
    '.css': 'text'
  },
  noExternal: ['react', 'react-dom'], // ← this tells tsup to bundle them
  esbuildOptions(options) {
    options.jsx = 'automatic'; // Important!
  },

});
