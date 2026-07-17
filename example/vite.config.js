import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // gh-pages serves the site from /nested-selects-react/, and the app's
  // BrowserRouter basename (src/url.js) expects the same path in dev
  base: '/nested-selects-react/',
  plugins: [react()],
  resolve: {
    // the library is symlinked (link:..), so its 'react' import would resolve
    // to the root's node_modules and load a second React copy without this
    dedupe: ['react', 'react-dom']
  }
});
