var webpack = require('webpack')
var webpackConfigs = require('./webpack.dev.conf.js')
var config = require('./config.js')
module.exports = function (app) {
    var compiler = webpack(webpackConfigs.jsConfig)
    app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: false,
      publicPath: config.dev.assetsPublicPath,
      log: console.log,
      stats: {
        colors: true,
        chunks: false
      }
    }));

    console.log(`WEBPACK=${String(process.env.WEBPACK)}`)
    if (String(process.env.WEBPACK) === 'js') {
      console.log('Only compile js'.red.bold)
    } else {
      webpack([webpackConfigs.stylusConfig, webpackConfigs.jadeConfig], function (err, stats) {
        if (err) {
          console.error(err.stack || err)
          if (err.details) {
            console.error(err.details)
          }
        } else {
          process.stdout.write(stats.toString('normal') + '\n\n')
        }
      })
    }
}
