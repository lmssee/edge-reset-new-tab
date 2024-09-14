import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
// import terser from '@rollup/plugin-terser';

/** 生成  npm 文件的打包配置文件 */
export default {
  input: './src/popup/index.ts',
  output: [
    {
      format: 'es',
      entryFileNames: 'index.js',
      preserveModules: false,
      sourcemap: false,
      exports: 'named',
      dir: 'dist/popup/',
    },
  ],
  // external: id =>
  //   /^(node:)|^(tslib)|^(a-js-tools)|^(a-edge-extends-types)/.test(id),
  plugins: [
    resolve(),
    commonjs(),
    // 打包压缩，自动去注释
    // terser(),
    // 可打包 json 内容
    json(),
    typescript({}),
    // 去除无用代码
    cleanup({ compactComments: true }),
  ],
};
