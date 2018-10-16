var webpack = require('webpack')
var merge = require('webpack-merge')
var getBaseConf = require('./webpack.base.conf')

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const cssLoader = {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
  ]
}

const stylusLoader = {
  test: /\.styl(us)?$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'stylus-loader',
  ]
}

var prodConf = {
  mode: 'production',
  module: {
    rules: [
      stylusLoader,
      cssLoader,
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  optimization: {
    // https://github.com/webpack-contrib/mini-css-extract-plugin/tree/v0.4.4#minimizing-for-production
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
}

if (process.env.HOSTALIAS) {
  console.log('HOSTALIAS=', process.env.HOSTALIAS)
  prodConf.devtool = '#eval-source-map'
}

function getProdConf (params) {
  return merge(getBaseConf(params), prodConf)
}

module.exports = getProdConf
