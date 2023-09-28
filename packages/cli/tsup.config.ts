import { defineConfig } from 'tsup';

export default defineConfig({
  target: 'esnext',
  format: 'esm',
  dts: true,
  outDir: 'bin'
});
