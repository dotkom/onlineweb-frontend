const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = env => {
  return {
    mode: 'development',
    devtool: "source-map",
    entry: {
      app: './src/index.tsx',
    },
    output: {
      path: path.resolve('./dist/'),
      filename: '[name].[hash].js',
      publicPath: '/',
    },
    devServer: {
      contentBase: './dist',
      inline: true,
      host: 'localhost',
      port: 8080,
      historyApiFallback: true,
    },
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
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: "[local]___[hash:base64:5]"
              }
            },
            {
              loader: "less-loader"
            }
          ]
        },
        {
          // webpack can import images from both javascript and css
          // By using url-loader we can inline small images (<10kB) in css
          test: /\.(png|gif|jpe?g)$/,
          loader: 'url-loader?limit=10000',
        },
        {
          /*
            Importing fonts.
            The `(\?[a-z0-9=&.]+)?` part is because font-awesome adds a query-string
            with the version number to the font url which is completely useless for us
          */
          test: /\.(eot|svg|ttf|woff|woff2)(\?[a-z0-9=&.]+)?$/,
          loader: 'url-loader?limit=10000',
        },
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          OW4_ADDRESS: JSON.stringify(process.env.OW4_ADDRESS),
        },
      }),
    ]
  }
}
