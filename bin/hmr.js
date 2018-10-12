const webpack = require('webpack')
const getConfig = require('./webpack.dev.conf')
const config = require('./config.js')
const utils = require('./utils.js')

module.exports = function (app) {
  let entrys = utils.getEntries() // compile all entries by default

  if (process.env.PAGE) {
    entrys = utils.getEntries().filter(entry => {
      const pages = process.env.PAGE.split(',')
      return !!pages.find(p => p === entry.name)
    })
    if (!entrys.length) {
      console.log(('Entry ' + process.env.PAGE + ' not found').red.inverse)
      return
    }
  }

  const compiler = webpack(entrys.map(getConfig))
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
}