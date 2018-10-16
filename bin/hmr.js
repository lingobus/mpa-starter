const webpack = require('webpack')
const getConfig = require('./webpack.dev.conf')
const config = require('./config.js')
const utils = require('./utils.js')
const merge = require('webpack-merge')

module.exports = function (app) {
  let entrys = utils.getEntries() // compile all entries by default

  if (process.env.PAGE) {
    entrys = entrys.filter(entry => {
      const pages = process.env.PAGE.split(',')
      return !!pages.find(p => p === entry.name)
    })
    if (!entrys.length) {
      console.log(('Entry ' + process.env.PAGE + ' not found').red.inverse)
      return
    }
  }

  utils.printEntries(entrys)

  const configs = entrys.map(params => {
    const entry = {}
    // Multi-compiler mode need a name for webpack-hot-middleware to make sure bundles don't process each other's updates.
    // https://github.com/webpack-contrib/webpack-hot-middleware/tree/v2.24.3#multi-compiler-mode
    entry[params.outputName] = [`./bin/hot-client.js?name=${params.name}&path=/__webpack_hmr&timeout=20000&reload=true`]
    const hmrConfig = {
      entry,
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        pugHotReload,
      ]
    }
    return merge(getConfig(params), hmrConfig)
  })

  // console.log("=====================================")
  // console.log(configs)
  // console.log("=====================================")

  const compiler = webpack(configs)
  app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: config.paths.assetsPublicPath,
    log: console.log,
    stats: {
      colors: true,
      chunks: false,
    }
  }))

  const hotMiddleware = require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartBeat: 5 * 1000
  })

  app.use(hotMiddleware)

  function pugHotReload () {
    const name = 'pug-hot-reload-plugin'
    if (this.hooks) {  // for webpack 4
      this.hooks.compilation.tap(name, function (compilation) {
        compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync(name, (data, cb) => {
          hotMiddleware.publish({ action: 'reload' })
          cb()
        });
      });
    } else { // for webpack 3
      this.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
          hotMiddleware.publish({ action: 'reload' })
          cb()
        })
      })
    }
  }
}