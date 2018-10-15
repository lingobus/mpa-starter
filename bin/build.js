var ora = require('ora')
var webpack = require('webpack')
var utils = require('./utils.js')
const getConfig = require('./webpack.prod.conf')

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

const configs = entrys.map(entry => getConfig(entry))

var spinner = ora('Building')
spinner.start()
webpack(configs, function (err, stats) {
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
