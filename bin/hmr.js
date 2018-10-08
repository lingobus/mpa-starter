var webpack = require('webpack')
const getConfig = require('./webpack.dev.conf')
var config = require('./config.js')
var utils = require('./utils.js')

module.exports = function (app) {
  let entrys = utils.getEntries() // compile all entries by default

  if (process.env.PAGE) {
    entrys = utils.getEntries().filter(entry => {
      const pages = process.env.PAGE.split(',')
      const entryName = entry.outputName.split('/')[1]
      return !!pages.find(p => entryName === p)
    })
    if (!entrys.length) {
      console.log(('Entry ' + process.env.PAGE + ' not found').red.inverse)
      return
    }
  }

  entrys.forEach(entry => {
    const compiler = webpack(getConfig(entry))
    app.use(require("webpack-dev-middleware")(compiler, {
      // noInfo: false,
      publicPath: config.paths.assetsPublicPath,
      log: console.log,
      stats: {
        colors: true,
        chunks: false,
      }
    }))
  })
}