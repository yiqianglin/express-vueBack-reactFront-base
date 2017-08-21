var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('../config/config');
var utils = require('./utils');
var baseWebpackConfig = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'mobx',
      'mobx-react',
      'axios'
    ],
    [config.appName]: ['./build/dev-client', config.entry]
  },
  output: {
    publicPath: config.dev.assetsPublicPath,
    chunkFilename: utils.assetsPath('js', '[name].js'),
    filename: utils.assetsPath('js', '[name].js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include: [path.join(__dirname, '..', 'src')],
        use: [
          {
            loader: 'eslint',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url',
            options: {
              name: utils.assetsPath('images', '[name].[hash].[ext]'),
              publicPath: config.dev.assetsPublicPath,
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      appName: JSON.stringify(config.appName),
      'process.env': config.dev.env,
      _ENV_: JSON.stringify('DEV'),
      _PATH_: JSON.stringify(config.dev.urlPath),
      pt: +new Date(),
      _gamesource_: JSON.stringify(config.appName)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: false,
      chunks: ['manifest', 'vendor', config.appName],
      template: config.dev.template,
      title: config.title
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
