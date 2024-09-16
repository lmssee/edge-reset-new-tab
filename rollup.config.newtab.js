import rollup from './rollup.config.js';

/** 生成 newtab 文件的打包配置文件 */
export default {
  ...rollup,
  input: './src/newtab/index.ts',
  output: {
    ...rollup.output,
    dir: 'dist/newtab/',
  },
};
