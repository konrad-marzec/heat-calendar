import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    '.': 'src/index.tsx',
  },
  banner: {
    js: "'use client'",
  },
  format: ['cjs', 'esm'],
  external: ['react'],
  dts: true,
});
// "build": "tsup src/index.tsx --format esm,cjs --dts --external react",
// "dev": "tsup src/index.tsx --format esm,cjs --watch --dts --external react",
