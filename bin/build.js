var ora = require('ora')
var webpack = require('webpack')
var webpackConfigs = require('./webpack.prod.conf')

var js = webpackConfigs.jsConfig
var stylus = webpackConfigs.stylusConfig
var jade = webpackConfigs.jadeConfig
var spinner1 = ora('Building ' + js.name + ' and ' + stylus.name)
var spinner2 = ora('Building ' + jade.name)
spinner1.start()
webpack([js, stylus], function (err, stats) {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
  } else {
    spinner1.stop()
    process.stdout.write(stats.toString('normal') + '\n\n')

    spinner2.start()
    webpack(jade, function (err, stats) {
      if (err) {
        console.error(err.stack || err)
        if (err.details) {
          console.error(err.details)
        }
      } else {
        spinner2.stop()
        process.stdout.write(stats.toString('normal') + '\n\n')
      }
    })
  }
})


function webpackCallback (err, stats) {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
  } else {
    process.stdout.write(stats.toString('normal') + '\n\n')
  }
}
