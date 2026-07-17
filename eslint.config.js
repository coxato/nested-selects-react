import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'example/dist/', 'node_modules/'] },
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}', 'example/src/**/*.{js,jsx}', 'scripts/**/*.mjs', '*.config.js', 'example/*.config.js'],
    plugins: { react },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node }
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.flat.recommended.rules,
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      // makevisible is the DOM attribute the library stores child metadata in
      'react/no-unknown-property': ['error', { ignore: ['makevisible'] }],
      'no-unused-vars': ['warn', { args: 'none' }]
    }
  },
  // the example uses the automatic JSX runtime; the library (src/) keeps the
  // classic transform for React 16 support, so React-in-scope stays enforced there
  {
    files: ['example/src/**/*.{js,jsx}'],
    rules: { 'react/react-in-jsx-scope': 'off' }
  }
];
