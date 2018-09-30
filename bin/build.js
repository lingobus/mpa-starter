var ora = require('ora')
var webpack = require('webpack')
var webpackConfigs = require('./webpack.prod.conf')
// console.log('================webpack.prod.conf=====================')
// console.log(JSON.stringify(webpackConfigs, null, 2))
// console.log('=============================================')

var js = webpackConfigs.jsConfig
var stylus = webpackConfigs.stylusConfig
var jade = webpackConfigs.jadeConfig

var spinner = ora('Building ' + js.name + ' and ' + stylus.name)
spinner.start()
webpack([js, stylus], function (err, stats) {
  spinner.stop()
  if (err) {
    errorHandler(err)
    return
  }
  process.stdout.write(stats.toString('normal') + '\n\n')

  spinner = ora('Building ' + jade.name)
  spinner.start()
  webpack(jade, function (err, stats) {
    spinner.stop()
    if (err) {
      errorHandler(err)
      return
    }
    process.stdout.write(stats.toString('normal') + '\n\n')
  })
})

function errorHandler (err) {
  console.error(err.stack || err)
  if (err.details) {
    console.error(err.details)
  }
}
