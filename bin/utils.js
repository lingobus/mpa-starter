var path = require('path')
var glob = require('glob')
var config = require('./config.js')
var settings = require('../common/settings.js')

function getEntries(extensions) {
  extensions = extensions || ['.js']
  const srcPath = config.paths.src
  const pagesPath = srcPath + '/pages'
  const res = []
  extensions.forEach(ext => {
    let files = glob.sync(pagesPath + "/*/index" + ext) // for example: page/home/index.js
    settings.SUPPORTED_LANGS.forEach(lang => {
      files = files.concat(glob.sync(pagesPath + "/*/" + lang + "/index" + ext)) // for example: page/home/en-us/index.js
    })

    files.forEach(function(filepath) {
      const outputName = path.relative(srcPath, filepath.substring(0, filepath.lastIndexOf('.')))
      const entry = {
        name: outputName.split('/')[1],
        entryPath: filepath,
        outputName,
      }
      res.push(entry)
    })
  })
  return res
}

function printEntries(entries) {
  console.log('Entries'.cyan.bold)
  entries.forEach(entry => {
    console.log(entry.entryPath.yellow)
  })
}

exports.getEntries = getEntries
exports.printEntries = printEntries