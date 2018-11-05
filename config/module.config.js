const path = require('path');
const CSSPlugin = require('./css.config');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: CSSPlugin.loaders,
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        loader: 'url-loader?limit=5000',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?[a-z0-9=&.]+)?$/,
        loader: 'url-loader?limit=5000',
      },
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "../src"), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
}