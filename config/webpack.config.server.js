const path = require('path');
const htmlPlugin = require('./html.config');
const CSSPlugin = require('./css.config');
const devServer = require('./devServer.config');
const environment = require('./environment.config');
const mainModule = require('./module.config');
const { DefinePlugin } = require('webpack');

module.exports = env => {
  return {
    mode: 'development',
    devtool: 'source-map',
    target: 'node',
    entry: {
      server: './src/server/index.tsx',
    },
    output: {
      path: path.resolve('./dist/'),
      filename: '[name].js',
      publicPath: '/',
    },
    devServer: devServer.config,
    module: mainModule.module,
    resolve: mainModule.resolve,
    plugins: [
      CSSPlugin.plugin,
      htmlPlugin.plugin,
      environment.pluginServer,
      new DefinePlugin({
        window: {}, // Fixes OIDC client needing window to be imported.
      }),
    ]
  }
}
