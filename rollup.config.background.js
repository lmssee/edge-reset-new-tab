import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
// import terser from '@rollup/plugin-terser';

/** 生成  npm 文件的打包配置文件 */
export default {
  input: './src/background/index.ts',
  output: {
    format: 'es',
    entryFileNames: 'background.js',
    preserveModules: false,
    sourcemap: false,
    exports: 'named',
    dir: 'dist/',
  },
  plugins: [
    resolve(),
    commonjs(),
    // 打包压缩，自动去注释
    // terser(),
    // 可打包 json 内容
    json(),
    typescript({}),
    // 去除无用代码
    cleanup(),
    copy({
      targets: [
        { src: 'src/css', dest: 'dist/' },
        { src: 'src/icons', dest: 'dist/' },
        { src: 'src/images', dest: 'dist/' },
        { src: 'src/newtab/index.css', dest: 'dist/newtab' },
        { src: 'src/newtab/index.html', dest: 'dist/newtab' },
        { src: 'src/popup/index.html', dest: 'dist/popup' },
        { src: 'src/popup/index.css', dest: 'dist/popup' },
        { src: 'manifest.json', dest: 'dist' },
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
  ],
};
