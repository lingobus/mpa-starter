const webpack = require('webpack')
const merge = require('webpack-merge')
const getBaseConf = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

// Use extract-text-webpack-plugin will drop support for hmr, so use plain loader in development
// https://github.com/webpack-contrib/extract-text-webpack-plugin#usage
const cssLoader = {
  test: /\.css$/,
  use: [
    'vue-style-loader',
    'css-loader',
  ]
},

const stylusLoader = {
  test: /\.styl(us)?$/,
  use: [
    'vue-style-loader',
    'css-loader',
    'stylus-loader',
  ]
},

var devConf = {
  devtool: '#eval-source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      cssLoader,
      stylusLoader,
    ]
  },
  plugins: [
    new HtmlWebpackHarddiskPlugin(),
    new FriendlyErrorsPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

function getDevConf (params) {
  const bc = getBaseConf(params)
  // Multi-compiler mode need a name for webpack-hot-middleware to make sure bundles don't process each other's updates.
  // https://github.com/webpack-contrib/webpack-hot-middleware/tree/v2.24.3#multi-compiler-mode
  bc.entry[params.outputName] = [`./bin/hot-client.js?name=${params.name}&path=/__webpack_hmr&timeout=20000&reload=true`, bc.entry[params.outputName]]
  return merge(bc, devConf)
}

module.exports = getDevConf
