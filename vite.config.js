import { copyFileSync } from 'node:fs';
import { defineConfig } from 'vite';

// hand-written types live in types/index.d.ts; ship them as .d.ts (ESM) and .d.cts (CJS)
const copyTypes = () => ({
  name: 'copy-types',
  closeBundle() {
    copyFileSync('types/index.d.ts', 'dist/index.d.ts');
    copyFileSync('types/index.d.ts', 'dist/index.d.cts');
  }
});

export default defineConfig({
  esbuild: {
    // Classic JSX transform => React.createElement, no react/jsx-runtime import.
    // react/jsx-runtime only exists in React >=16.14, and this library supports 16.2+.
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  },
  build: {
    target: 'es2018',
    minify: false,
    sourcemap: true,
    lib: {
      entry: 'src/index.js',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs')
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/client']
    }
  },
  plugins: [copyTypes()]
});
