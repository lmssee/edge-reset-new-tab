import copy from 'rollup-plugin-copy';
import rollup from './rollup.config.js';

/** 生成  npm 文件的打包配置文件 */
export default {
  ...rollup,
  input: './src/background/index.ts',
  output: {
    ...rollup.output,
    entryFileNames: 'background.js',
    dir: 'dist/',
  },
  plugins: [
    ...rollup.plugins,
    copy({
      targets: [
        { src: 'src/css', dest: 'dist/' }, // 样式文件
        { src: 'src/icons', dest: 'dist/' }, // icons 图标
        { src: 'src/images', dest: 'dist/' }, // 图片静态资源
        { src: 'src/_locales', dest: 'dist/' }, // 本地化文件
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
