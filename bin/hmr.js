const webpack = require('webpack')
const getConfig = require('./webpack.dev.conf')
const config = require('./config.js')
const utils = require('./utils.js')
const merge = require('webpack-merge')
const PugWebpackPlugin = require('pug-webpack-plugin')

let hotMiddleware

module.exports = function apply (app) {
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

  // https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations
  // but maybe we should not use multi-compiler, just use multiple entries: https://webpack.js.org/concepts/entry-points/#multi-page-application
  const compiler = webpack(configs)
  app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: config.paths.assetsPublicPath,
    log: console.log,
    stats: {
      colors: true,
      chunks: false,
    }
  }))

  hotMiddleware = require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartBeat: 5 * 1000
  })

  app.use(hotMiddleware)

  function pugHotReload () {
    PugWebpackPlugin.hooks.afterEmit.tapAsync('PugHotReload', (data, cb) => {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    });
  }
}