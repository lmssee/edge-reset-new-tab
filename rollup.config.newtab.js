import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
// import terser from '@rollup/plugin-terser';

/** 生成  npm 文件的打包配置文件 */
export default {
  input: './src/newtab/index.ts',
  output: {
    format: 'es',
    entryFileNames: 'index.js',
    preserveModules: false,
    sourcemap: false,
    exports: 'named',
    dir: 'dist/newtab/',
  },

  plugins: [
    resolve(),
    commonjs(),
    json(),
    // terser(),
    typescript({}),
    // 去除无用代码
    cleanup(),
  ],
};
