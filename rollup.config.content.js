import rollup from './rollup.config.js';

/** 生成  npm 文件的打包配置文件 */
export default {
  ...rollup,
  input: './src/content/index.ts',
  output: {
    ...rollup.output,
    entryFileNames: 'contents.js',
    dir: 'dist/',
  },
};
