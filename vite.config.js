import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@ui', replacement: '/src/components/ui' },
      { find: '@features', replacement: '/src/components/features' },
      { find: '@layouts', replacement: '/src/components/layouts' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@hooks', replacement: '/src/lib/hooks' },
      { find: '@api', replacement: '/src/lib/apis' },
      { find: '@utils', replacement: '/src/lib/utils' }
    ]
  }
});
