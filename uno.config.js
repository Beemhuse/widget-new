// uno.config.ts
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  content: {
    pipeline: {
      include: [
        './src/**/*.{js,jsx,ts,tsx}',
        './index.html',
      ],
    },
  },
});
