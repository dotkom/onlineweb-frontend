const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugin: new HtmlWebpackPlugin({
    template: './static/index.html',
    filename: 'index.html'
  }),
}
