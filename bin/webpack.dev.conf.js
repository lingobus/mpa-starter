// const webpack = require('webpack')
const merge = require('webpack-merge')
const getBaseConf = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

// Use extract-text-webpack-plugin will drop support for hmr, so use plain loader in development
// https://github.com/webpack-contrib/extract-text-webpack-plugin#usage
const cssLoader = {
  test: /\.css$/,
  use: [
    'vue-style-loader',
    'css-loader',
  ]
}

const stylusLoader = {
  test: /\.styl(us)?$/,
  use: [
    'vue-style-loader',
    'css-loader',
    'stylus-loader',
  ]
}

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
  ]
}

function getDevConf (params) {
  return merge(getBaseConf(params), devConf)
}

module.exports = getDevConf
