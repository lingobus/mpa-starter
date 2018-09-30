var webpack = require('webpack')
var webpackConfigs = require('./webpack.dev.conf.js')
var config = require('./config.js')
module.exports = function (app) {
  [webpackConfigs.jsConfig, webpackConfigs.stylusConfig, webpackConfigs.jadeConfig].forEach(c => {
    var compiler = webpack(c)
    app.use(require("webpack-dev-middleware")(compiler, {
      // noInfo: false,
      publicPath: config.dev.assetsPublicPath,
      log: console.log,
      stats: {
        colors: true,
        chunks: false,
      }
    }));
  })
}
