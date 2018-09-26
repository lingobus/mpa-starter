var webpack = require('webpack')
var utils = require('./utils.js')
var merge = require('webpack-merge')
var config = require('./config.js')
var baseWebpackConfigs = require('./webpack.base.conf')

var wpconfig = {
  devtool: '#eval-source-map',
  externals: config.externals,
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
}

Object.keys(baseWebpackConfigs).forEach(function (k) {
  const c = baseWebpackConfigs[k]
  var plugins = utils.getWebpackDevHelperPlugins(c.name)
  if (typeof c.plugins == 'undefined') {
    c.plugins = plugins
  } else {
    c.plugins = c.plugins.concat(plugins)
  }
})

baseWebpackConfigs.jsConfig = merge(baseWebpackConfigs.jsConfig, wpconfig)
baseWebpackConfigs.stylusConfig.watch = true
baseWebpackConfigs.jadeConfig.watch = true
module.exports = baseWebpackConfigs
