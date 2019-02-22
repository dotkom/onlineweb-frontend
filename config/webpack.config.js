const path = require('path');
var AssetsPlugin = require('assets-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const htmlPlugin = require('./html.config');
const CSSPlugin = require('./css.config');
const devServer = require('./devServer.config');
const environment = require('./environment.config');
const mainModule = require('./module.config');

const __SSR__ = process.env.OWF_SSR;

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      app: './src/index.tsx',
      serviceworker: './src/serviceworker/index.js'
    },
    output: {
      path: path.resolve('./dist/'),
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      publicPath: __SSR__ ? '/public/' : '/',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true,
          },
        },
      },
    },
    devServer: devServer.config,
    module: mainModule.module,
    resolve: mainModule.resolve,
    plugins: [
      CSSPlugin.plugin,
      htmlPlugin.plugin,
      environment.pluginBrowser,
      new AssetsPlugin({path: path.join(__dirname, '../dist')}),
      new ForkTsCheckerWebpackPlugin(),
    ]
  }
}
