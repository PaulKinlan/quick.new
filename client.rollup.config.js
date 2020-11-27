import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';


export default {
  input: 'client/client.mjs',
  output: {
    file: 'build/client/client.mjs',
    format: 'esm',
    sourcemap: true
  },
  plugins: [nodeResolve(), terser({})]
};