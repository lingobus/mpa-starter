const webpack = require('webpack')
const merge = require('webpack-merge')
const getBaseConf = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

var devConf = {
  devtool: '#eval-source-map',
  watchOptions: {
    ignored: /node_modules/
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
  bc.entry[params.outputName] = [`webpack-hot-middleware/client?name=${params.name}&path=/__webpack_hmr&timeout=20000&reload=true`, bc.entry[params.outputName]]
  return merge(bc, devConf)
}

module.exports = getDevConf
