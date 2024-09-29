import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'node:path';

export default function ({ dev }) {
  /** 入口 */
  const entry = {
    background: {
      import: './src/background/index.ts',
      filename: 'background.js',
    },
    popup: {
      import: './src/popup/root.tsx',
      filename: 'popup/[id].[contenthash].js',
    },
    newtab: {
      import: './src/newtab/root.tsx',
      filename: 'popup/[id].[contenthash].js',
    },
    reload: {
      import: './src/content/development.ts',
      filename: 'reload.js',
    },
  };

  /** 出口 */
  const output = {
    path: path.join(import.meta.dirname, 'dist'),
    charset: true,
    compareBeforeEmit: true,
    clean: true,
  };

  /** 模块解析方式 */
  const resolve = {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.join(import.meta.dirname, 'src/'),
    },
  };

  /** 模块配置 */
  const module = {
    rules: [
      // 配置 ts loader
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      // 配置 scss
      {
        test: /\.scss$/,
        // 加载是至下而上，也就是说 webpack 使用数组是 pop
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      // 配置 文件
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[hash:8][ext]',
          outputPath: 'asset/images',
          publicPath: '../asset/images/',
        },
      },
    ],
  };

  /** 插件 */
  const plugins = [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'popup/index.html',
      chunks: ['popup'],
      inject: 'body',
      templateParameters: {
        title: '弹窗',
      },
    }),
    /// new tab 页面 html 配置
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'newtab/index.html',
      chunks: ['newtab'],
      inject: 'body',
      templateParameters: {
        title: '新标签页',
      },
    }),
    /// 文件复制
    new CopyPlugin({
      patterns: [
        {
          from: `manifest.json`,
          to: 'manifest.json',
        },
        { from: 'src/icons', to: 'icons' },

        { from: 'src/_locales', to: '_locales' },
      ],
    }),
  ];

  /** 优化配置 */
  const optimization = {
    mangleExports: 'size',
    mangleWasmImports: false,
    // runtimeChunk: 'single',
  };

  /** 开发服务
   *
   */
  const devServer = {
    static: './dist',
    hot: true,
    host: '0.0.0.0',
    open: true,
  };
  const config = {
    entry,
    output,
    resolve,
    module,
    plugins,
    optimization,
    devServer,
    mode: (dev && 'development') || 'production',
    devtool: 'source-map',
  };
  //// 生产环境
  if (!dev) {
    delete entry.reload;
    delete config.devServer;
    delete config.devtool;
  }
  return config;
}
