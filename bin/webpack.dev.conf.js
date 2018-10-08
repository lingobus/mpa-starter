const merge = require('webpack-merge')
const getBaseConf = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

var devConf = {
  devtool: '#eval-source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    new HtmlWebpackHarddiskPlugin(),
    new FriendlyErrorsPlugin(),
    new WebpackNotifierPlugin()
  ]
}

function getDevConf (params) {
  return merge(getBaseConf(params), devConf)
}

module.exports = getDevConf
