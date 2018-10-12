var ora = require('ora')
var webpack = require('webpack')
var utils = require('./utils.js')
const getConfig = require('./webpack.prod.conf')

const allConfigs = utils.getEntries().map(entry => getConfig(entry))

var spinner = ora('Building')
spinner.start()
webpack(allConfigs, function (err, stats) {
  spinner.stop()
  if (err) {
    errorHandler(err)
    return
  }
  process.stdout.write(stats.toString('normal') + '\n\n')
})

function errorHandler (err) {
  console.error(err.stack || err)
  if (err.details) {
    console.error(err.details)
  }
}
