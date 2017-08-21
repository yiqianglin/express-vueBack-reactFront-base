var path = require('path');
var config = require('../config/config');
var utils = require('./utils');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '..'),
  output: {
    path: config.build.assetsRoot
  },
  resolve: {
    alias: config.npmAlias,
    modules: [path.join(__dirname, '../src'), 'node_modules'],
    extensions: ['.web.js', '.js', '.json']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel?cacheDirectory']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: utils.postcssOption()
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: utils.postcssOption()
              }
            }
          ]
        })
      },
      {
        test: /\.(woff|eot|ttf)$/i,
        use: [
          {
            loader: 'url',
            options: {
              name: utils.assetsPath('fonts', '[name].[hash].[ext]'),
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "manifest"], // vendor libs + extracted manifest
      minChunks: Infinity,
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css', '[name].[chunkhash:8].css')
    }),
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/proto',
        to: 'proto'
      }
    ])
  ]
};
