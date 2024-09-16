import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { keepChrome } from 'a-edge-extends-types';

/** 打包配置文件 */
export default {
  output: {
    format: 'es',
    entryFileNames: 'index.js',
    preserveModules: false,
    sourcemap: false,
    exports: 'named',
    dir: 'dist/popup/',
  },
  // external: id =>
  //   /^(node:)|^(tslib)|^(a-js-tools)|^(a-edge-extends-types)/.test(id),
  plugins: [
    resolve(),
    commonjs(),
    // 打包压缩，自动去注释
    json(),
    typescript({}),
    // 可打包 json 内容 [配置](https://github.com/terser/terser#minify-options)
    terser(),
    keepChrome(),
  ],
};
