import { defineConfig } from 'tsup';

export default defineConfig({
  target: 'esnext',
  format: 'cjs',
  dts: true,
  outDir: 'bin'
});
