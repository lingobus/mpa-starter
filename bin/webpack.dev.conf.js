// const webpack = require('webpack')
const merge = require('webpack-merge')
const getBaseConf = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

// Use mini-css-extract-plugin will drop support for hmr, so use style-loader loader in development
// https://github.com/webpack-contrib/mini-css-extract-plugin/tree/v0.4.4#advanced-configuration-example
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
  mode: 'development',
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
    // new HtmlWebpackHarddiskPlugin(),
    new FriendlyErrorsPlugin(),
  ]
}

function getDevConf (params) {
  return merge(getBaseConf(params), devConf)
}

module.exports = getDevConf
