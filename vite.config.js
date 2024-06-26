import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    minify: true,
    manifest: true,
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});
