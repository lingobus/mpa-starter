var webpack = require('webpack')
var path = require('path')
var utils = require('./utils.js')
var merge = require('webpack-merge')
var config = require('./config.js')
var baseWebpackConfigs = require('./webpack.base.conf')
var ManifestPlugin = require('webpack-manifest-plugin')
var assetsPublicPath = config.prod.assetsPublicPath
var manifest = new ManifestPlugin({
  fileName: 'js/manifest-js.json',
  basePath: assetsPublicPath,
   /**
    给js 文件加上 ?v= 哈希值,
    解决cdn 匹配到旧文件的问题
  */
  reduce: function (manifest, file) {
    const basename = path.basename(file.path)
    const match = basename.match(/-([0-9a-f]+).js$/)
    var url = file.path
    if (match) {
      const hash = match[1]
      if (hash) {
        url = file.path + '?v=' + hash
      }
    }
    manifest[file.name] = url
    return manifest;
  }
})
baseWebpackConfigs.jsConfig.plugins = (baseWebpackConfigs.jsConfig.plugins || []).concat(utils.getWebpackProdHelpPlugins().concat(manifest))

if (process.env.HOSTALIAS) {
  console.log('HOSTALIAS=', process.env.HOSTALIAS)
  baseWebpackConfigs.jsConfig = merge(baseWebpackConfigs.jsConfig, {
    devtool: '#inline-source-map'
  })
}

manifest = new ManifestPlugin({
  fileName: 'css/manifest-stylus.json',
  basePath: assetsPublicPath,
  /**
    给css 文件加上 ?v= 哈希值,
    解决cdn 匹配到旧文件的问题
  */
  reduce: function (manifest, file) {
    const basename = path.basename(file.path)
    const match = basename.match(/-([0-9a-f]+).css$/)
    var url = file.path
    if (match) {
      const hash = match[1]
      if (hash) {
        url = file.path + '?v=' + hash
      }
    }
    manifest[file.name] = url
    return manifest;
  }
})
baseWebpackConfigs.stylusConfig.plugins =  (baseWebpackConfigs.stylusConfig.plugins || []).concat(manifest)

var wpconfig = {
  externals: config.externals
}
baseWebpackConfigs.jsConfig = merge(baseWebpackConfigs.jsConfig, wpconfig)

module.exports = baseWebpackConfigs
