import rollup from './rollup.config.js';

/** 生成 popup 文件的打包配置文件 */
export default {
  ...rollup,
  input: './src/popup/index.ts',
};
