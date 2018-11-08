const path = require('path');

const htmlPlugin = require('./html.config');
const CSSPlugin = require('./css.config');
const devServer = require('./devServer.config');
const environment = require('./environment.config');
const mainModule = require('./module.config');

module.exports = (env) => {
  return {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      app: './src/index.tsx',
    },
    output: {
      path: path.resolve('./dist/'),
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/',
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
      environment.plugin,
    ]
  }
}
