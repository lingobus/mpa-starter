var utils = require('./utils.js')
var merge = require('webpack-merge')
var config = require('./config.js')
var baseWebpackConfigs = require('./webpack.base.conf')
var ManifestPlugin = require('webpack-manifest-plugin')
var assetsPublicPath = config.prod.assetsPublicPath

var jsManifest = new ManifestPlugin({
  fileName: 'js/manifest-js.json',
  basePath: assetsPublicPath,
  filter: (file) => /\.js(\?.*)?$/.test(file.name),
  /**
    给js 文件加上 ?v= 哈希值,
    解决cdn 匹配到旧文件的问题
  */
  map: (file) => {
    file.name = file.name.replace(/-([0-9a-z]*)\.js/, '-$1.js?v=$1');
    return file;
  }
})

var imgManifest = new ManifestPlugin({
  fileName: 'img/manifest-img.json',
  basePath: assetsPublicPath,
  filter: (file) => config.imgReg.test(file.name),
  map: (file) => {
    file.name = file.name.replace(new RegExp('-[0-9a-z]{'+config.imgHashLength +'}\\.'), '.');
    return file;
  }
})

var wpconfig = {
  externals: config.externals
}

baseWebpackConfigs.jsConfig.plugins = baseWebpackConfigs.jsConfig.plugins.concat(utils.getWebpackProdHelpPlugins()).concat(jsManifest).concat(imgManifest)
baseWebpackConfigs.jsConfig = merge(baseWebpackConfigs.jsConfig, wpconfig)
if (process.env.HOSTALIAS) {
  console.log('HOSTALIAS=', process.env.HOSTALIAS)
  baseWebpackConfigs.jsConfig = merge(baseWebpackConfigs.jsConfig, {
    devtool: '#inline-source-map'
  })
}

var cssManifest = new ManifestPlugin({
  fileName: 'css/manifest-stylus.json',
  basePath: assetsPublicPath,
  filter: (file) => /\.css(\?.*)?$/.test(file.name),
  /**
    给css 文件加上 ?v= 哈希值,
    解决cdn 匹配到旧文件的问题
  */
  map: (file) => {
    file.name = file.name.replace(/-([0-9a-z]*)\.css/, '-$1.css?v=$1');
    return file;
  }
})
baseWebpackConfigs.stylusConfig.plugins =  (baseWebpackConfigs.stylusConfig.plugins || []).concat(cssManifest)

module.exports = baseWebpackConfigs
