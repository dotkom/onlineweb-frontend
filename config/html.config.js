const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugin: new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html'
  }),
}
