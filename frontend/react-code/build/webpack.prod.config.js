var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('../config/config');
var utils = require('./utils');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var WebpackChunkHash = require("webpack-chunk-hash");
var argv = require('yargs').argv;

var imgLoader = [
  {
    loader: 'url',
    options: {
      name: utils.assetsPath('images', '[name].[hash].[ext]'),
      publicPath: config.build.assetsPublicPath,
      limit: 8192
    }
  }
];
if (argv.minify) {
  imgLoader.push({
    loader: 'image-webpack',
    query: {
      progressive: true,
      optipng: {
        optimizationLevel: 7
      },
      pngquant: {
        quality: '65-90',
        speed: 4
      },
      gifsicle: {
        interlaced: false
      },
      mozjpeg: {
        quality: 65
      }
    }
  });
}
var webpackConfig = merge(baseWebpackConfig, {
  devtool: '#cheap-module-source-map',
  entry: {
    [config.appName]: ['es6-promise/auto', config.entry],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'mobx',
      'mobx-react',
      'axios',
      'protobufjs'
    ]
  },
  output: {
    publicPath: config.build.assetsPublicPath,
    chunkFilename: utils.assetsPath('js', '[name].[chunkhash:8].js'),
    filename: utils.assetsPath('js', '[name].[chunkhash:8].js')
  },
  module: {
    rules: [
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: imgLoader
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env,
      _ENV_: JSON.stringify(argv.testenv ? 'TEST' : 'PROD'),
      pt: +new Date(),
      _gamesource_: JSON.stringify(config.appName)
    }),
    new HtmlWebpackPlugin({
      filename: `WEB-INF/${config.htmlPath}.shtml`,
      inject: false,
      // chunks: ['vendor', config.appName],
      template: config.build.template,
      title: config.title
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false, // remove all comments
      compress: {
        warnings: false,
        // drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest",
      inlineManifest: true
    })
  ]
});

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
