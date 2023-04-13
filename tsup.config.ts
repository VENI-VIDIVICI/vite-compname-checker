import { defineConfig } from 'tsup'
import { devDependencies } from './package.json'
export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  bundle: true,
  format: ['esm', 'cjs'],
  external: Object.keys(devDependencies),
})